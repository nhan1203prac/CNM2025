
import React, { useState } from 'react';
import { RECENT_ORDERS } from '../../constants';
import { PaymentStatus, ShippingStatus } from '../../type';

const PaymentBadge = ({ status }) => {
  if (!status) return null;
  const colors = {
    [PaymentStatus.PAID]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    [PaymentStatus.REFUNDED]: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${colors[status]}`}>
      {status}
    </span>
  );
};

const ShippingBadge = ({ status }) => {
  if (!status) return null;
  const colors = {
    [ShippingStatus.PENDING]: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
    [ShippingStatus.SHIPPING]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    [ShippingStatus.DELIVERED]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    [ShippingStatus.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${colors[status]}`}>
      {status}
    </span>
  );
};

export const OrdersPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Quản Lý Đơn Hàng</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium">Xem và quản lý tất cả đơn đặt hàng của khách hàng.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tạo đơn hàng mới
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-[#1c2127] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              className="w-full pl-10 pr-4 h-11 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-400 dark:text-white" 
              placeholder="Tìm kiếm theo mã đơn, tên khách hàng..." 
              type="text"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
            <select className="h-11 px-4 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 outline-none text-slate-600 dark:text-slate-300 font-semibold min-w-[160px]">
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="shipping">Đang giao</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <input 
              className="h-11 px-4 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 outline-none text-slate-600 dark:text-slate-300" 
              type="date"
            />
            <button className="h-11 px-6 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-bold text-sm whitespace-nowrap">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              Lọc
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#1c2127] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111418] border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-black">
                <th className="px-6 py-4 w-32">Mã đơn</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4 w-32">Ngày đặt</th>
                <th className="px-6 py-4 w-40 text-right">Tổng tiền</th>
                <th className="px-6 py-4 w-48 text-center">Thanh toán</th>
                <th className="px-6 py-4 w-48 text-center">Vận chuyển</th>
                <th className="px-6 py-4 w-20 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-[#252b33] transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">{order.customerName}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{order.date}</td>
                  <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-white">
                    {order.total.toLocaleString('vi-VN')} ₫
                  </td>
                  <td className="px-6 py-4 text-center">
                    <PaymentBadge status={order.paymentStatus} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ShippingBadge status={order.shippingStatus} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowDrawer(true); }}
                      className="p-2 rounded-lg hover:bg-primary/10 text-slate-400 hover:text-primary transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-slate-50 dark:bg-[#111418] px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Hiển thị <span className="font-bold text-slate-900 dark:text-white">1</span> đến <span className="font-bold text-slate-900 dark:text-white">5</span> của <span className="font-bold text-slate-900 dark:text-white">50</span> đơn hàng
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c2127] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 text-sm font-bold transition-all">
              Trước
            </button>
            <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c2127] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold transition-all">
              Tiếp
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Overlay */}
      {showDrawer && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
            onClick={() => setShowDrawer(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-[#1c2127] shadow-2xl z-[70] transform translate-x-0 transition-transform duration-300 ease-out border-l border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#1c2127]">
              <h2 className="text-xl font-black dark:text-white">Cập nhật đơn hàng</h2>
              <button 
                onClick={() => setShowDrawer(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Trạng thái thanh toán</label>
                  <select className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-semibold outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    <option>Đã thanh toán</option>
                    <option>Chờ thanh toán</option>
                    <option>Đã hoàn tiền</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Trạng thái vận chuyển</label>
                  <select className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-semibold outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    <option>Đang giao</option>
                    <option>Đã giao</option>
                    <option>Chờ xử lý</option>
                    <option>Đã hủy</option>
                  </select>
                </div>
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex items-start gap-3 text-primary">
                    <span className="material-symbols-outlined">info</span>
                    <p className="text-xs font-semibold leading-relaxed italic">
                      Lưu ý: Thay đổi trạng thái vận chuyển sẽ tự động thông báo cho khách hàng qua email đã đăng ký.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111418]">
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDrawer(false)}
                  className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  Hủy
                </button>
                <button 
                  className="flex-[2] py-3 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
