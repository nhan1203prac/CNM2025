import React, { createContext, useContext, useMemo, useState } from "react";



const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, options = {}) => {
  setCart(prevCart => {
    
    const isExist = prevCart.find(item => 
      item.id === product.id &&
    
      item.selectedColor === options.color && 
      item.selectedSize === options.size &&
      item.selectedStorage === options.storage
    );

    if (isExist) {
      return prevCart.map(item =>
        (item.id === product.id && 
         item.selectedColor === options.color && 
         item.selectedSize === options.size &&
         item.selectedStorage === options.storage)
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

   
    return [...prevCart, { 
      ...product, 
      quantity, 
      selectedColor: options.color, 
      selectedSize: options.size,
      selectedStorage: options.storage 
    }];
  });
};

  const removeFromCart = (id) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id, qty) =>
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
