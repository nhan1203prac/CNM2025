
import React from 'react';
import { RECENT_ORDERS } from '../../constants';
import { OrderStatus } from '../../type';

const StatusBadge= ({ status }) => {
  const getColors = () => {
    switch(status) {
      case OrderStatus.PROCESSING: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case OrderStatus.COMPLETED: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case OrderStatus.CANCELLED: return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getColors()}`}>
      {status}
    </span>
  );
};

export const RecentOrders = () => {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-surface-dark">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Đơn hàng gần đây</h3>
        <a href="#" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">Xem tất cả</a>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[11px] uppercase tracking-widest font-black">
              <th className="px-6 py-4">Mã đơn</th>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Ngày đặt</th>
              <th className="px-6 py-4">Tổng tiền</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {RECENT_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white text-sm">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-300 ring-2 ring-primary/5">
                      {order.customerInitials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm text-slate-900 dark:text-white font-bold truncate">{order.customerName}</span>
                      <span className="text-[11px] text-slate-500 font-medium truncate">{order.customerEmail}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm font-medium">{order.productName}</td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-500 text-sm font-medium">{order.date}</td>
                <td className="px-6 py-4 text-slate-900 dark:text-white font-bold text-sm">
                  {order.total.toLocaleString('vi-VN')} ₫
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-all">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
