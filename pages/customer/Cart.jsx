import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from './components/common/ProductCard';

import { PRODUCTS } from '../../data'; 

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  const formatCurrency = (amount) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  if (cart.length === 0) {
    return (
      <div className="px-4 lg:px-40 py-20 flex flex-col items-center justify-center text-center">
        <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <span className="material-symbols-outlined text-4xl">shopping_cart</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Giỏ hàng của bạn đang trống</h1>
        <p className="text-gray-500 mb-8">Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>
        <Link to="/" className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg">
          Quay lại mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen">
      <div className="px-4 lg:px-40 py-6">
        <nav className="flex items-center text-sm text-gray-500 mb-4">
          <Link className="hover:text-primary" to="/">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-[#181411] font-medium">Giỏ hàng</span>
        </nav>
        <h1 className="text-3xl font-bold text-[#181411]">
          Giỏ hàng của bạn 
          <span className="text-lg font-normal text-gray-500 ml-2">({cart.length} sản phẩm)</span>
        </h1>
      </div>

      <section className="px-4 lg:px-40 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
          <div className="lg:col-span-8">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-gray-500 text-sm font-medium uppercase">
              <div className="col-span-6">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-right">Thành tiền</div>
            </div>

            <div className="flex flex-col mt-4">
              {cart.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center py-6 border-b border-gray-100 last:border-0 relative bg-white md:bg-transparent p-4 md:p-0 rounded-xl mb-4 md:mb-0"
                >
                
                  <div className="w-full md:col-span-6 flex gap-4">
                    <div className="size-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img alt={item.name} className="w-full h-full object-cover" src={item.main_image || item.image} />
                    </div>
                    <div className="flex flex-col justify-between py-1 min-w-0">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-bold text-[#181411] line-clamp-2 hover:text-primary transition-colors">{item.name}</h3>
                        </Link>
                        
                      
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.selectedColor && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Màu: {item.selectedColor}</span>
                          )}
                          {item.selectedStorage && (
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Dung lượng: {item.selectedStorage}</span>
                          )}
                          {item.selectedSize && (
                            <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded">Size: {item.selectedSize}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mt-3">
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize, item.selectedStorage)}
                          className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>

            
                  <div className="w-full md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-gray-500 text-sm">Đơn giá:</span>
                    <span className="font-medium">{formatCurrency(item.price)}</span>
                  </div>

               
                  <div className="w-full md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-gray-500 text-sm">Số lượng:</span>
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize, item.selectedStorage)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                      >-</button>
                      <input readOnly className="w-8 text-center border-none text-sm font-bold" value={item.quantity} />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize, item.selectedStorage)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                      >+</button>
                    </div>
                  </div>

               
                  <div className="w-full md:col-span-2 flex justify-between md:justify-end items-center">
                    <span className="md:hidden text-gray-500 text-sm">Thành tiền:</span>
                    <span className="font-bold text-primary text-lg">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

       
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h3 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span className="font-bold text-[#181411]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Giao hàng</span>
                  <span className="text-sm">Miễn phí</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
              >
                Tiến hành thanh toán
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;