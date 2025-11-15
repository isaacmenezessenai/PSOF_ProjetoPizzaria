import React, { createContext, useContext, useState } from "react";
import { SelectedExtra } from '../components/ingredientCard';

export interface CartItem {
  product: any; 
  quantity: number;
  customizations?: any;
  extras?: SelectedExtra[];
}

interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  pendingProduct: CartItem | null;
  setPendingProduct: (item: CartItem | null) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [pendingProduct, setPendingProduct] = useState<CartItem | null>(null);

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, setItems, pendingProduct, setPendingProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}
