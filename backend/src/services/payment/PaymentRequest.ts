export interface PaymentRequest {
    orderId: string;
    paymentType: '1' | '2' | '3' | '4'; 
    cpf?: string;
    cardNumber?: string;
    cardPassword?: string;
    cardName?: string;
    installments?: number;
    pixCode?: string;
}