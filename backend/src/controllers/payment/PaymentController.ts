import { Request, Response } from 'express';
import { PaymentService } from '../../services/payment/PaymentService';
import { validarCartao } from '../../utils/validation';

class PaymentController {
    handle = async (req: Request, res: Response): Promise<Response> => {
        const {
            orderId,
            paymentType,
            cardNumber,
            cardPassword,
            cardName,
            installments
        } = req.body;

        // 2. Validação básica
        if (!orderId || !paymentType) {
            return res.status(400).json({ error: 'Dados essenciais (ID do pedido e tipo de pagamento) incompletos.' });
        }


        if (paymentType === '1' || paymentType === '3') {
            if (!cardNumber || !cardPassword || !cardName) {
                return res.status(400).json({ error: 'Dados do cartão incompletos (Número, Senha e Nome são obrigatórios).' });
            }
            if (!validarCartao(cardNumber)) {
                return res.status(400).json({ error: 'Número de cartão inválido.' });
            }
        }


        const paymentService = new PaymentService();

        try {

            const result = await paymentService.processPayment({
                orderId,
                paymentType,
                cardNumber,
                cardPassword,
                cardName,
                installments
            });

            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ error: (err as Error).message });
        }
    }
}

export { PaymentController };