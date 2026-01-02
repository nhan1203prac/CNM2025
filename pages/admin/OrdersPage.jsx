import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Edit3, 
  X, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  PackageSearch
} from 'lucide-react';
import baseAPI from '../api/baseApi';

const PaymentBadge = ({ status }) => {
  if (!status) return null;
  const config = {
    'PAID': { 
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', 
      icon: <CheckCircle2 size={12} />, 
      text: 'Đã thanh toán' 
    },
    'PENDING': { 
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', 
      icon: <Clock size={12} />, 
      text: 'Chờ thanh toán' 
    },
    'REFUNDED': { 
      color: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300', 
      icon: <RefreshCcw size={12} />, 
      text: 'Hoàn tiền' 
    },
  };
  const { color, icon, text } = config[status] || config['PENDING'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${color}`}>
      {icon} {text}
    </span>
  );
};

const ShippingBadge = ({ status }) => {
  if (!status) return null;
  const config = {
    'PENDING': { 
      color: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300', 
      icon: <Clock size={12} />, 
      text: 'Chờ xử lý' 
    },
    'SHIPPING': { 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', 
      icon: <Truck size={12} />, 
      text: 'Đang giao' 
    },
    'DELIVERED': { 
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', 
      icon: <CheckCircle2 size={12} />, 
      text: 'Đã giao' 
    },
    'CANCELLED': { 
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', 
      icon: <XCircle size={12} />, 
      text: 'Đã hủy' 
    },
  };
  const { color, icon, text } = config[status] || config['PENDING'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${color}`}>
      {icon} {text}
    </span>
  );
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await baseAPI.get('/admin/orders', {
        params: { page, size: 10, search, status: statusFilter }
      });
      setOrders(response.data.items);
      setTotalPages(response.data.pages);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error("Fetch orders failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [page, statusFilter]);

  const handleUpdateStatus = async () => {
    try {
      await baseAPI.patch(`/admin/orders/${selectedOrder.id}/status`, { 
        shippingStatus: selectedOrder.shippingStatus,
        paymentStatus: selectedOrder.paymentStatus 
      });
      setShowDrawer(false);
      fetchOrders();
    } catch (error) {
      alert("Cập nhật thất bại.");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <PackageSearch size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Quản Lý Đơn Hàng</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Hệ thống ghi nhận {totalItems} đơn hàng.</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c2127] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              className="w-full pl-12 pr-4 h-12 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none dark:text-white focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder="Mã đơn, tên khách hàng... (Nhấn Enter)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                className="h-12 pl-10 pr-6 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black uppercase dark:text-white outline-none appearance-none"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="PENDING">Chờ xử lý</option>
                <option value="SHIPPING">Đang giao</option>
                <option value="DELIVERED">Đã giao</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>
            </div>
            <button 
              onClick={fetchOrders}
              className="h-12 px-8 bg-primary text-white rounded-2xl font-black text-xs uppercase shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c2127] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111418] border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400 font-black">
                <th className="px-6 py-5">Mã đơn</th>
                <th className="px-6 py-5">Khách hàng</th>
                <th className="px-6 py-5">Ngày đặt</th>
                <th className="px-6 py-5 text-right">Tổng tiền</th>
                <th className="px-6 py-5 text-center">Thanh toán</th>
                <th className="px-6 py-5 text-center">Vận chuyển</th>
                <th className="px-6 py-5 text-center">Tác vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {loading ? (
                <tr><td colSpan="7" className="p-20 text-center font-bold text-slate-400 uppercase tracking-widest italic">Đang đồng bộ dữ liệu...</td></tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50/80 dark:hover:bg-[#252b33] transition-colors">
                  <td className="px-6 py-4 font-black text-primary">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 dark:text-white uppercase text-xs">{order.customerName}</span>
                      <span className="text-[10px] text-slate-500 font-bold">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-bold text-xs">{order.date}</td>
                  <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-white text-base">
                    {order.total.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4 text-center"><PaymentBadge status={order.paymentStatus} /></td>
                  <td className="px-6 py-4 text-center"><ShippingBadge status={order.shippingStatus} /></td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => { setSelectedOrder(order); setShowDrawer(true); }} 
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary hover:bg-primary/10 transition-all active:scale-90"
                    >
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-slate-50 dark:bg-[#111418] px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-black uppercase">Trang {page} / {totalPages}</div>
          <div className="flex gap-2">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(page - 1)} 
              className="p-2 rounded-xl border dark:bg-[#1c2127] dark:text-white disabled:opacity-30 transition-all hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(page + 1)} 
              className="p-2 rounded-xl border dark:bg-[#1c2127] dark:text-white disabled:opacity-30 transition-all hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {showDrawer && selectedOrder && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => setShowDrawer(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-[#1c2127] shadow-2xl z-[70] flex flex-col border-l dark:border-slate-800 animate-slide-in">
            <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-[#111418]/50">
              <h2 className="text-xl font-black dark:text-white uppercase">Cập nhật đơn #{selectedOrder.id}</h2>
              <button onClick={() => setShowDrawer(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                <X size={20} className="dark:text-white" />
              </button>
            </div>
            
            <div className="flex-1 p-8 space-y-10 overflow-y-auto">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Trạng thái thanh toán</label>
                <select 
                  className="w-full h-14 px-5 rounded-2xl border dark:bg-[#111418] dark:text-white font-black text-sm outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none"
                  value={selectedOrder.paymentStatus}
                  onChange={(e) => setSelectedOrder({...selectedOrder, paymentStatus: e.target.value})}
                >
                  <option value="PENDING">CHỜ THANH TOÁN</option>
                  <option value="PAID">ĐÃ THANH TOÁN</option>
                  <option value="REFUNDED">ĐÃ HOÀN TIỀN</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Trạng thái vận chuyển</label>
                <select 
                  className="w-full h-14 px-5 rounded-2xl border dark:bg-[#111418] dark:text-white font-black text-sm outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none"
                  value={selectedOrder.shippingStatus}
                  onChange={(e) => setSelectedOrder({...selectedOrder, shippingStatus: e.target.value})}
                >
                  <option value="PENDING">CHỜ XỬ LÝ</option>
                  <option value="SHIPPING">ĐANG GIAO HÀNG</option>
                  <option value="DELIVERED">ĐÃ GIAO THÀNH CÔNG</option>
                  <option value="CANCELLED">HỦY ĐƠN HÀNG</option>
                </select>
              </div>

              <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex gap-4">
                <ShieldCheck className="text-blue-500 shrink-0" size={24} />
                <p className="text-xs text-blue-600 dark:text-blue-400 font-bold leading-relaxed italic">
                  Hành động này sẽ thay đổi trạng thái vĩnh viễn và thông báo cho khách hàng qua email/hệ thống.
                </p>
              </div>
            </div>

            <div className="p-8 border-t dark:border-slate-800 flex gap-4 bg-slate-50/50 dark:bg-[#111418]/50">
              <button onClick={() => setShowDrawer(false)} className="flex-1 py-4 bg-white dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all">Hủy</button>
              <button onClick={handleUpdateStatus} className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all">Lưu thay đổi</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};