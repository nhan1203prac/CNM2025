import React, { useState } from 'react';
import AccountLayout from '../components/account/AccountLayout';

interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'order' | 'promo' | 'system';
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Đơn hàng #ORD-2024-001 đang được giao',
    content: 'Sản phẩm "Giày Thể Thao Nike Air Max 2024" của bạn đã rời kho và đang trên đường đến tay bạn.',
    date: '20/05/2024 10:30',
    type: 'order',
    isRead: false
  },
  {
    id: '2',
    title: 'Voucher 100k dành riêng cho bạn',
    content: 'Chúc mừng! Bạn nhận được mã giảm giá 100k cho đơn hàng từ 1 triệu đồng. Hạn dùng đến hết tháng này.',
    date: '18/05/2024 09:00',
    type: 'promo',
    isRead: true
  },
  {
    id: '3',
    title: 'Cập nhật chính sách thành viên',
    content: 'ShopMới vừa cập nhật quyền lợi cho hạng thẻ Vàng. Hãy kiểm tra ngay trong phần thông tin tài khoản.',
    date: '15/05/2024 15:45',
    type: 'system',
    isRead: true
  }
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return 'local_shipping';
      case 'promo': return 'sell';
      default: return 'notifications';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-blue-500 bg-blue-50';
      case 'promo': return 'text-orange-500 bg-orange-50';
      default: return 'text-purple-500 bg-purple-50';
    }
  };

  return (
    <AccountLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#181411]">Thông báo của tôi</h2>
            <p className="text-sm text-gray-500">Bạn có {notifications.filter(n => !n.isRead).length} thông báo chưa xem</p>
          </div>
          <button 
            onClick={markAllAsRead}
            className="text-sm text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">done_all</span>
            Đánh dấu tất cả đã đọc
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-6 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${!notif.isRead ? 'bg-orange-50/30' : ''}`}
              >
                <div className={`size-12 rounded-full shrink-0 flex items-center justify-center ${getIconColor(notif.type)}`}>
                  <span className="material-symbols-outlined">{getIcon(notif.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-bold truncate ${!notif.isRead ? 'text-[#181411]' : 'text-gray-600'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">{notif.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {notif.content}
                  </p>
                  {!notif.isRead && (
                    <div className="mt-2 w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center">
              <span className="material-symbols-outlined text-5xl text-gray-200 mb-4">notifications_off</span>
              <p className="text-gray-500">Bạn chưa có thông báo nào</p>
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
            <button className="text-sm text-gray-500 font-medium hover:text-primary transition-colors">
              Xem các thông báo cũ hơn
            </button>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Notifications;