export type RootStackParamList = {
  Home: undefined;
  Favoritos: undefined;
  Pedidos: undefined;
  Ajuda: undefined;
  Perfil: undefined;
  Sacola: undefined;
  Detalhes: { product: any; index?: number };
  QRCode: undefined;
  Checkout: { orderId: string };
  StatusPedido: { draft: boolean; status: boolean };
};
