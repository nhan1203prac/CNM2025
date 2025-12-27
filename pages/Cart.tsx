
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../App';
import { PRODUCTS } from '../data';
import ProductCard from '../components/common/ProductCard';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  if (cart.length === 0) {
    return (
      <div className="px-4 lg:px-40 py-20 flex flex-col items-center justify-center text-center">
        <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <span className="material-symbols-outlined text-4xl">shopping_cart</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Giỏ hàng của bạn đang trống</h1>
        <p className="text-gray-500 mb-8">Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>
        <Link to="/" className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/20">
          Quay lại mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen">
      <div className="px-4 lg:px-40 py-6">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link className="hover:text-primary" to="/">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-[#181411] font-medium">Giỏ hàng</span>
        </div>
        <h1 className="text-3xl font-bold text-[#181411]">Giỏ hàng của bạn <span className="text-lg font-normal text-gray-500 ml-2">({cart.length} sản phẩm)</span></h1>
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

            <div className="flex flex-col gap-4 md:gap-0 mt-4 md:mt-0">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="group flex flex-col md:grid md:grid-cols-12 gap-4 items-center py-6 bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none shadow-sm md:shadow-none border-b border-gray-100 last:border-0 relative">
                  <div className="w-full md:col-span-6 flex gap-4">
                    <div className="size-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                    </div>
                    <div className="flex flex-col justify-between py-1 min-w-0">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-bold text-[#181411] line-clamp-2 hover:text-primary cursor-pointer transition-colors">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1 truncate">Phân loại: Size {item.selectedSize}, {item.selectedColor}</p>
                      </div>
                      <div className="flex gap-4 mt-2">
                        <button className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm group/fav transition-colors">
                          <span className="material-symbols-outlined text-[18px]">favorite</span>
                          <span className="hidden md:inline">Yêu thích</span>
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                          <span className="hidden md:inline">Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-auto md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-gray-500 text-sm">Đơn giá:</span>
                    <span className="font-medium text-[#181411]">{formatCurrency(item.price)}</span>
                  </div>
                  <div className="w-full md:w-auto md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-gray-500 text-sm">Số lượng:</span>
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-medium transition-colors"
                      >-</button>
                      <input 
                        readOnly
                        className="w-10 text-center border-none p-0 text-sm text-[#181411] focus:ring-0" 
                        value={item.quantity} 
                      />
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-medium transition-colors"
                      >+</button>
                    </div>
                  </div>
                  <div className="w-full md:w-auto md:col-span-2 flex justify-between md:justify-end items-center">
                    <span className="md:hidden text-gray-500 text-sm">Thành tiền:</span>
                    <span className="font-bold text-primary text-lg">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="md:hidden absolute top-4 right-4 text-gray-400"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/" className="inline-flex items-center gap-2 text-[#181411] font-medium hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h3 className="text-xl font-bold text-[#181411] mb-6">Cộng giỏ hàng</h3>
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Tạm tính</span>
                  <span className="font-medium text-[#181411]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Giảm giá</span>
                  <span className="font-medium text-green-600">-0₫</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="text-sm text-gray-400">Tính khi thanh toán</span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mã ưu đãi</label>
                <div className="flex gap-2">
                  <input className="flex-1 rounded-lg border-gray-300 text-sm focus:ring-primary focus:border-primary" placeholder="Nhập mã..." type="text" />
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-sm transition-colors">Áp dụng</button>
                </div>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#181411]">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(subtotal)}</span>
                </div>
                <p className="text-right text-xs text-gray-400 mt-1">(Đã bao gồm VAT nếu có)</p>
              </div>
              <Link 
                to="/checkout"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                Tiến hành thanh toán
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 grayscale opacity-70">
                <span className="material-symbols-outlined">credit_card</span>
                <span className="text-xs">Hỗ trợ thanh toán đa dạng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <h2 className="text-[#181411] text-2xl font-bold leading-tight mb-8">Có thể bạn sẽ thích</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
