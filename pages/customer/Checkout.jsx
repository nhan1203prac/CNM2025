import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// 1. Import
import { untils } from "../../languages/untils";

const Checkout = () => {
  // 2. Kích hoạt hook

  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const formatCurrency = (amount) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const handleOrder = () => {
    // Map thông báo thành công
    alert(`${untils.mess("checkout.success_msg")} ORD-2024-X123`);
    clearCart();
    navigate('/account/orders');
  };

  // Tạo mảng payment methods động để lấy text từ untils
  const paymentMethods = [
    { 
      id: 'cod', 
      label: untils.mess("checkout.payment.cod.label"), 
      desc: untils.mess("checkout.payment.cod.desc"), 
      icon: 'payments' 
    },
    { 
      id: 'bank', 
      label: untils.mess("checkout.payment.bank.label"), 
      desc: untils.mess("checkout.payment.bank.desc"), 
      icon: 'account_balance' 
    },
    { 
      id: 'card', 
      label: untils.mess("checkout.payment.card.label"), 
      desc: untils.mess("checkout.payment.card.desc"), 
      icon: 'credit_card' 
    },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-40 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link className="hover:text-primary" to="/">
            {untils.mess("header.nav.home")}
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-primary" to="/cart">
            {untils.mess("cart.breadcrumb")}
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-[#181411] font-medium">
            {untils.mess("checkout.breadcrumb")}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Section 1: Thông tin giao hàng */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#181411] flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                  {untils.mess("checkout.shipping.title")}
                </h2>
                <button className="text-sm text-primary font-medium hover:underline">
                  {untils.mess("checkout.shipping.change")}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {untils.mess("checkout.shipping.labels.name")}
                  </label>
                  <input 
                    className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" 
                    placeholder={untils.mess("checkout.shipping.placeholders.name")} 
                    type="text" 
                    defaultValue="Nguyễn Văn A" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {untils.mess("checkout.shipping.labels.phone")}
                  </label>
                  <input 
                    className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" 
                    placeholder={untils.mess("checkout.shipping.placeholders.phone")} 
                    type="tel" 
                    defaultValue="0912345678" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {untils.mess("checkout.shipping.labels.email")}
                  </label>
                  <input 
                    className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" 
                    placeholder={untils.mess("checkout.shipping.placeholders.email")} 
                    type="email" 
                    defaultValue="nguyenvana@example.com" 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {untils.mess("checkout.shipping.labels.address")}
                  </label>
                  <input 
                    className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" 
                    placeholder={untils.mess("checkout.shipping.placeholders.address")} 
                    type="text" 
                    defaultValue="123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh" 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {untils.mess("checkout.shipping.labels.note")}
                  </label>
                  <textarea 
                    className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary text-sm" 
                    placeholder={untils.mess("checkout.shipping.placeholders.note")} 
                    rows={2}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 2: Phương thức thanh toán */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#181411] flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                {untils.mess("checkout.payment.title")}
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
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

          {/* Section 3: Order Summary */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-lg font-bold text-[#181411] mb-4">
                {untils.mess("checkout.order_summary.title")}
              </h2>
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                      <img alt={item.main_image} className="w-full h-full object-cover" src={item.main_image} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#181411] line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {untils.mess("checkout.order_summary.item.size")}: {item.selectedSize} | {untils.mess("checkout.order_summary.item.color")}: {item.selectedColor}
                      </p>
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
                  <input 
                    className="flex-1 rounded-lg border-gray-300 text-sm focus:border-primary focus:ring-primary uppercase" 
                    placeholder={untils.mess("checkout.order_summary.coupon.placeholder")} 
                    type="text" 
                  />
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    {untils.mess("checkout.order_summary.coupon.btn")}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>{untils.mess("checkout.order_summary.costs.subtotal")}</span>
                  <span className="font-medium text-[#181411]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{untils.mess("checkout.order_summary.costs.shipping")}</span>
                  <span className="font-medium text-[#181411]">30.000₫</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>{untils.mess("checkout.order_summary.costs.discount")}</span>
                  <span className="font-medium">-0₫</span>
                </div>
                <div className="border-t border-gray-100 mt-2 pt-4 flex justify-between items-center">
                  <span className="text-base font-bold text-[#181411]">
                    {untils.mess("checkout.order_summary.costs.total")}
                  </span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(subtotal + 30000)}</span>
                </div>
              </div>
              <button 
                onClick={handleOrder}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>{untils.mess("checkout.order_summary.btn_order")}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <p className="text-xs text-gray-400 text-center mt-4">
                {untils.mess("checkout.order_summary.terms")} <a className="underline hover:text-gray-600" href="#">{untils.mess("checkout.order_summary.terms_link")}</a> {untils.mess("checkout.order_summary.terms_suffix")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;