import { validarCartao } from '../../utils/validation';

export class DebitPayment {
    async process(cardInfo: { cardNumber?: string; cardName?: string; cardPassword?: string }): Promise<{ success: boolean; message: string }> {
        console.log('Iniciando pagamento com Débito...');

        if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.cardPassword) {
            return { success: false, message: 'Dados do cartão de débito incompletos.' };
        }

        if (!validarCartao(cardInfo.cardNumber)) {
            console.error('Número de cartão de débito inválido.');
            return { success: false, message: 'O número do cartão de débito é inválido.' };
        }

        console.log('Cartão de débito válido. Processando...');
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        const isPaymentVerified = Math.random() > 0.15;

        if (isPaymentVerified) {
            return { success: true, message: 'Pagamento via Débito aprovado.' };
        } else {
            return { success: false, message: 'Saldo insuficiente ou dados inválidos.' };
        }
    }
}