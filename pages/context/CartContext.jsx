import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import baseAPI from "../api/baseApi";
import { toast } from "react-hot-toast";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await baseAPI.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Lỗi tải giỏ hàng:", err);
      if (err.response?.status === 401) setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product, quantity = 1) => {
    try {
      await baseAPI.post(`/cart/add?product_id=${product.id}&quantity=${quantity}`);
      
      toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ`);
      fetchCart(); 
    } catch (err) {
      const msg = err.response?.data?.detail || "Vui lòng đăng nhập để mua hàng";
      toast.error(msg);
    }
  };


  const removeFromCart = async (cartItemId) => {
    try {
      await baseAPI.delete(`/cart/${cartItemId}`);
      fetchCart();
    } catch (err) {
      toast.error("Không thể cập nhật giỏ hàng");
    }
  };

  const clearCart = () => {
    setCart([]); 
};

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        loading,
        addToCart, 
        removeFromCart, 
        fetchCart, 
        clearCart,
        subtotal, 
        totalItems 
      }}
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