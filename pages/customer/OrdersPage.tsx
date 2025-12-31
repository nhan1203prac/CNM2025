import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ORDERS } from '../../data';

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const tabs = ['Tất cả', 'Chờ xử lý', 'Đang vận chuyển', 'Hoàn thành', 'Đã hủy'];

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="material-symbols-outlined text-sm mx-2">chevron_right</span>
          <span className="text-[#181411] font-medium">Lịch sử đơn hàng</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-[#181411] mb-8">Đơn hàng của tôi</h1>
          
          {/* Tabs bộ lọc trạng thái */}
          <div className="flex overflow-x-auto border-b border-gray-100 mb-8 scrollbar-hide gap-8">
            {tabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 pb-4 border-b-2 transition-all text-base font-medium whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-500 hover:text-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {MOCK_ORDERS.map(order => (
              <div key={order.id} className="rounded-xl border border-gray-100 hover:border-primary/20 transition-all p-6 bg-white shadow-sm">
                <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-gray-50 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">Mã đơn: #{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400 font-medium">Ngày đặt: {order.date}</span>
                </div>
                
                {/* Chi tiết sản phẩm trong đơn */}
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="w-24 h-24 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                        <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#181411] text-lg">{item.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">Phân loại: {item.color}, {item.size}</p>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-gray-600 font-medium">x{item.quantity}</span>
                          <span className="font-bold text-primary text-lg">{formatCurrency(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="text-gray-500 font-medium">Tổng số tiền: <span className="text-2xl font-bold text-primary ml-2">{formatCurrency(order.total)}</span></div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm font-bold hover:bg-gray-50 transition-colors">Chi tiết</button>
                    <button className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">Mua lại</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;