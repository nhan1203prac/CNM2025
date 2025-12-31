
import React, { useState } from 'react';
import AccountLayout from '../components/account/AccountLayout';
import { MOCK_ORDERS } from '../../../data';

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const tabs = ['Tất cả', 'Chờ xử lý', 'Đang vận chuyển', 'Hoàn thành', 'Đã hủy'];

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <AccountLayout>
      <div className="bg-white rounded-xl border border-[#e6e0db] shadow-sm p-5">
        <h2 className="text-[#181411] text-2xl font-bold mb-6">Lịch sử đơn hàng</h2>
        <div className="flex overflow-x-auto border-b border-[#f4f2f0] mb-6 scrollbar-hide">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-5 pb-3 border-b-2 transition-colors text-sm font-medium whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary font-bold' : 'border-transparent text-[#6B7280] hover:text-primary hover:border-primary/50'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
          </div>
          <input className="block w-full pl-10 pr-3 py-2.5 border border-[#e6e0db] rounded-lg leading-5 bg-[#f8f7f6] placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm" placeholder="Tìm kiếm theo ID đơn hàng..." type="text" />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="bg-white rounded-xl border border-[#e6e0db] shadow-sm p-5 flex flex-col gap-4">
            <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-[#f4f2f0]">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-[#181411]">Đơn hàng #{order.id}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-[#897261]">Đặt ngày {order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#897261] mb-1">Tổng tiền</p>
                <p className="text-lg font-bold text-primary">{formatCurrency(order.total)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 bg-[#f4f2f0] rounded-lg overflow-hidden border border-[#e6e0db]">
                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                  </div>
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#181411] truncate">{item.name}</h4>
                    <p className="text-xs text-[#897261] mt-1">Size: {item.size} | Màu: {item.color}</p>
                    <p className="text-sm font-medium text-[#181411] mt-2">x{item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-bold text-[#181411]">{formatCurrency(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-[#f4f2f0]">
              <button className="px-4 py-2 bg-white border border-[#e6e0db] rounded-lg text-sm font-bold text-[#181411] hover:bg-[#f4f2f0] transition-colors">Xem chi tiết</button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-opacity-90 transition-colors shadow-sm">Mua lại</button>
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
};

export default Orders;
