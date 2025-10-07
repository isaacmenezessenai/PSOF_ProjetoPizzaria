import prismaClient from '../../prisma';
import { validarCartao } from '../../utils/validation';
import { SumOrderService } from '../order/SumOrderService'; 

type PaymentType = '1' | '2' | '3' | '4';

interface PaymentRequest {
    orderId: string;
    paymentType: PaymentType;
    cardNumber?: string;
    cardPassword?: string;
    cardName?: string;
    installments?: number;
}


class PaymentService {

    async processPayment(data: PaymentRequest) {
        const { orderId, paymentType, cardNumber, cardPassword, installments } = data;

        const order = await prismaClient.order.findUnique({ where: { id: orderId } });
        if (!order) throw new Error('Pedido não encontrado.');

        console.log('Order Status lido do DB:', order.status); 
        
        if (order.draft === false) throw new Error('Este pedido já foi pago.'); 

        const sumOrderService = new SumOrderService();
        const { sum: amount } = await sumOrderService.execute({ order_id: orderId });
        
        if (amount <= 0) throw new Error('O valor do pedido deve ser maior que zero.')
        
        // Variáveis de Status
        let transactionId = `transacao_simulada_${Date.now()}`;
        let pixCode = '';
        
        let paymentSuccess = false; 
        let paymentMessage = '';
        
        let shouldFinalizeOrder = false; 

        // --- VALIDAÇÕES DE CARTÃO ---
        if (paymentType === '1' || paymentType === '3') {
            if (!cardNumber) { 
                throw new Error('O número do cartão é obrigatório para este tipo de pagamento.');
            }
            if (validarCartao(cardNumber) === false) { 
                throw new Error('Número do cartão inválido.');
            }
            if (!cardPassword) { 
                throw new Error('A senha do cartão é obrigatória para este tipo de pagamento.');
            }
            const pinRegex = /^\d{3,4}$/; 
            if (!pinRegex.test(cardPassword)) {
                throw new Error('O código de verificação do cartão (CVC) deve conter 3 ou 4 dígitos numéricos.');
            }
            
            shouldFinalizeOrder = true; 
            paymentSuccess = true;
        }

        // --- LÓGICA DO PAGAMENTO ---
        switch (paymentType) {
            case '1': // Débito
                paymentMessage = 'Pagamento via Débito aprovado.';
                break;

            case '3': // Crédito
                paymentMessage = `Pagamento via Crédito aprovado em ${installments || 1}x.`;
                break;
            
            case '2': // PIX
                // A simulação aprova imediatamente
                paymentMessage = 'Código Pix gerado com sucesso. Pagamento aprovado imediatamente (Simulação).';
                shouldFinalizeOrder = true; 
                paymentSuccess = true; 
                pixCode = `PIX_QR_${transactionId}`;
                break;

            case '4': // Dinheiro Físico
                paymentMessage = 'Pagamento em Dinheiro recebido.';
                shouldFinalizeOrder = true; 
                paymentSuccess = true;
                break;
            
            default:
                throw new Error('Tipo de pagamento inválido.');
        }


        // 1. Cria o registro de Payment no banco de dados
        await prismaClient.payment.create({
            data: {
                orderId,
                paymentType: parseInt(paymentType),
                amount: amount,
                transactionId: transactionId,
                pixCode: pixCode || null,
                status: paymentSuccess, 
            },
        });

        // 2. Finaliza o Pedido (apenas se o pagamento for bem-sucedido)
        if (shouldFinalizeOrder && paymentSuccess) {
            await prismaClient.order.update({
                where: { id: orderId },
                data: { 
                    draft: false, 
                    status: false,
                },
            });
        }
        
        return { message: paymentMessage, transactionId, pixCode: pixCode || undefined };
    }
}

export { PaymentService };