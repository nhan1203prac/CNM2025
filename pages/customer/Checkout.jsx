
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const formatCurrency = (amount) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const handleOrder = () => {
    alert('Đặt hàng thành công! Mã đơn hàng của bạn là ORD-2024-X123');
    clearCart();
    navigate('/account/orders');
  };

  return (
    <div className="bg-background-light min-h-screen">
      <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-40 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link className="hover:text-primary" to="/">Trang chủ</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-primary" to="/cart">Giỏ hàng</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-[#181411] font-medium">Thanh toán</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#181411] flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                  Thông tin giao hàng
                </h2>
                <button className="text-sm text-primary font-medium hover:underline">Thay đổi</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" placeholder="Nhập họ tên đầy đủ" type="text" defaultValue="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" placeholder="Nhập số điện thoại" type="tel" defaultValue="0912345678" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" placeholder="Nhập địa chỉ email" type="email" defaultValue="nguyenvana@example.com" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng</label>
                  <input className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" type="text" defaultValue="123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (Tùy chọn)</label>
                  <textarea className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" placeholder="Lưu ý cho người bán hoặc shipper" rows={2}></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#181411] flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', desc: 'Thanh toán tiền mặt khi giao hàng', icon: 'payments' },
                  { id: 'bank', label: 'Chuyển khoản ngân hàng', desc: 'Quét mã QR qua ứng dụng ngân hàng', icon: 'account_balance' },
                  { id: 'card', label: 'Thẻ tín dụng / Ghi nợ', desc: 'Visa, Mastercard, JCB', icon: 'credit_card' },
                ].map((method) => (
                  <label key={method.id} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-primary bg-primary/5' : 'hover:border-primary'}`}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === method.id} 
                      onChange={() => setPaymentMethod(method.id)}
                      className="text-primary focus:ring-primary border-gray-300" 
                    />
                    <div className="ml-4 flex items-center gap-3 flex-1">
                      <span className="material-symbols-outlined text-gray-600">{method.icon}</span>
                      <div>
                        <p className="font-medium text-[#181411]">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-lg font-bold text-[#181411] mb-4">Đơn hàng của bạn</h2>
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                      <img alt={item.main_image} className="w-full h-full object-cover" src={item.main_image} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#181411] line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize} | Màu: {item.selectedColor}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs font-medium text-gray-500">x{item.quantity}</p>
                        <p className="text-sm font-bold text-primary">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                  
                ))}
              </div>
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex gap-2">
                  <input className="flex-1 rounded-lg border-gray-300 text-sm focus:border-primary focus:ring-primary uppercase" placeholder="Mã giảm giá" type="text" />
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Áp dụng</button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="font-medium text-[#181411]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium text-[#181411]">30.000₫</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span className="font-medium">-0₫</span>
                </div>
                <div className="border-t border-gray-100 mt-2 pt-4 flex justify-between items-center">
                  <span className="text-base font-bold text-[#181411]">Tổng cộng</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(subtotal + 30000)}</span>
                </div>
              </div>
              <button 
                onClick={handleOrder}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Đặt hàng ngay</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <p className="text-xs text-gray-400 text-center mt-4">
                Bằng việc đặt hàng, bạn đồng ý với <a className="underline hover:text-gray-600" href="#">Điều khoản dịch vụ</a> của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
