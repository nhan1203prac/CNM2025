// cart/CartContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { Product, CartItem } from "../../types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, qty: number, size: string, color: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, qty: number, size: string, color: string) => {
    setCart(prev => {
      const exist = prev.find(
        i => i.id === product.id && i.selectedSize === size && i.selectedColor === color
      );

      if (exist) {
        return prev.map(i =>
          i === exist ? { ...i, quantity: i.quantity + qty } : i
        );
      }

      return [...prev, { ...product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (id: string) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id: string, qty: number) =>
    setCart(prev =>
      prev.map(i =>
        i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
      )
    );

  const clearCart = () => setCart([]);

  const subtotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
