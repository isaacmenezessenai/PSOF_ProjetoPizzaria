// Importa a função de validação
import { validarCartao } from '../../utils/validation';

export class CreditPayment {
    async process(cardInfo: { cardNumber?: string; cardName?: string; installments?: number }): Promise<{ success: boolean; message: string }> {
        console.log('Iniciando pagamento com Crédito...');

        if (!cardInfo.cardNumber || !cardInfo.cardName) {
            return { success: false, message: 'Dados do cartão de crédito incompletos.' };
        }

        // --- ADICIONADO: Validação do número do cartão ---
        if (!validarCartao(cardInfo.cardNumber)) {
            console.error('Número de cartão de crédito inválido.');
            return { success: false, message: 'O número do cartão de crédito é inválido.' };
        }
        // --- FIM DA ADIÇÃO ---
        
        if (cardInfo.installments && (cardInfo.installments < 1 || cardInfo.installments > 3)) {
            return { success: false, message: `Número de parcelas (${cardInfo.installments}) inválido.` };
        }

        console.log('Cartão de crédito válido. Processando...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        const isPaymentVerified = Math.random() > 0.2;

        if (isPaymentVerified) {
            const installmentsMessage = cardInfo.installments ? ` em ${cardInfo.installments}x` : '';
            return { success: true, message: `Pagamento via Crédito${installmentsMessage} aprovado.` };
        } else {
            return { success: false, message: 'Limite do cartão excedido ou dados inválidos.' };
        }
    }
}