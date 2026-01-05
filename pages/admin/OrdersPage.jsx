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
  PackageSearch,
  Loader2
} from 'lucide-react';
import baseAPI from '../api/baseApi';
import toast from 'react-hot-toast';

const PaymentBadge = ({ status }) => {
  if (!status) return null;
  const config = {
    'PAID': { color: 'bg-green-100 text-green-700', text: 'Đã thanh toán' },
    'PENDING': { color: 'bg-yellow-100 text-yellow-700', text: 'Chờ thanh toán' },
    'REFUNDED': { color: 'bg-slate-100 text-slate-700', text: 'Hoàn tiền' },
  };
  const { color, text } = config[status] || config['PENDING'];
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>
      {text}
    </span>
  );
};

const ShippingBadge = ({ status }) => {
  if (!status) return null;
  const config = {
    'PENDING': { color: 'bg-slate-100 text-slate-700', text: 'Chờ xử lý' },
    'SHIPPING': { color: 'bg-blue-100 text-blue-700', text: 'Đang giao' },
    'DELIVERED': { color: 'bg-green-100 text-green-700', text: 'Đã giao' },
    'CANCELLED': { color: 'bg-red-100 text-red-700', text: 'Đã hủy' },
  };
  const { color, text } = config[status] || config['PENDING'];
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>
      {text}
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
      toast.error("Lỗi đồng bộ dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [page, statusFilter]);

  const handleUpdateStatus = async () => {
    const loadId = toast.loading("Đang lưu...");
    try {
      await baseAPI.patch(`/admin/orders/${selectedOrder.id}/status`, { 
        shippingStatus: selectedOrder.shippingStatus,
        paymentStatus: selectedOrder.paymentStatus 
      });
      setShowDrawer(false);
      fetchOrders();
      toast.success("Cập nhật thành công", { id: loadId });
    } catch (error) {
      toast.error("Cập nhật thất bại", { id: loadId });
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase">Quản lý đơn hàng</h2>
      </div>

      {/* SEARCH & FILTER - STYLE GIỐNG PAGE PRODUCT */}
      <div className="bg-white border rounded-3xl p-5 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="w-full h-12 pl-12 pr-4 bg-slate-50 border rounded-2xl outline-none focus:border-primary transition-all"
            placeholder="Tìm kiếm mã đơn, khách hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchOrders()}
          />
        </div>
        <select
          className="h-12 bg-slate-50 border px-6 rounded-2xl font-bold outline-none cursor-pointer"
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

      {/* TABLE - STYLE GIỐNG PAGE PRODUCT */}
      <div className="bg-white border rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr className="text-xs font-black uppercase text-slate-500">
              <th className="p-4">Mã đơn</th>
              <th className="p-4">Khách hàng</th>
              <th className="p-4 text-right">Tổng tiền</th>
              <th className="p-4 text-center">Thanh toán</th>
              <th className="p-4 text-center">Vận chuyển</th>
              <th className="p-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <Loader2 className="animate-spin m-auto text-primary" />
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-slate-50">
                  <td className="p-4 font-bold text-primary">#{order.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 uppercase text-sm">{order.customerName}</div>
                    <div className="text-xs text-slate-500">{order.customerEmail}</div>
                  </td>
                  <td className="p-4 text-right font-bold text-slate-900">
                    {Number(order.total).toLocaleString()} ₫
                  </td>
                  <td className="p-4 text-center"><PaymentBadge status={order.paymentStatus} /></td>
                  <td className="p-4 text-center"><ShippingBadge status={order.shippingStatus} /></td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => { setSelectedOrder(order); setShowDrawer(true); }} 
                      className="p-2 text-slate-600 hover:text-primary transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="p-4 bg-slate-50 border-t flex items-center justify-between">
          <div className="text-xs font-bold text-slate-500 uppercase">
            Trang {page} / {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 border rounded-xl bg-white disabled:opacity-30 hover:bg-slate-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 border rounded-xl bg-white disabled:opacity-30 hover:bg-slate-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* DRAWER - STYLE GIỐNG PAGE PRODUCT */}
      {showDrawer && selectedOrder && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowDrawer(false)} />
          <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-50 flex flex-col shadow-xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-black uppercase text-lg">Cập nhật đơn hàng #{selectedOrder.id}</h2>
              <X className="cursor-pointer" onClick={() => setShowDrawer(false)} />
            </div>
            
            <div className="p-6 space-y-8 overflow-y-auto">
              <div className="space-y-4">
                <label className="font-bold text-sm block mb-1 uppercase text-slate-400">Trạng thái thanh toán</label>
                <select 
                  className="w-full border p-3 rounded-xl font-bold outline-none focus:border-primary"
                  value={selectedOrder.paymentStatus}
                  onChange={(e) => setSelectedOrder({...selectedOrder, paymentStatus: e.target.value})}
                >
                  <option value="PENDING">CHỜ THANH TOÁN</option>
                  <option value="PAID">ĐÃ THANH TOÁN</option>
                  <option value="REFUNDED">ĐÃ HOÀN TIỀN</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="font-bold text-sm block mb-1 uppercase text-slate-400">Trạng thái vận chuyển</label>
                <select 
                  className="w-full border p-3 rounded-xl font-bold outline-none focus:border-primary"
                  value={selectedOrder.shippingStatus}
                  onChange={(e) => setSelectedOrder({...selectedOrder, shippingStatus: e.target.value})}
                >
                  <option value="PENDING">CHỜ XỬ LÝ</option>
                  <option value="SHIPPING">ĐANG GIAO HÀNG</option>
                  <option value="DELIVERED">ĐÃ GIAO THÀNH CÔNG</option>
                  <option value="CANCELLED">HỦY ĐƠN HÀNG</option>
                </select>
              </div>

              <div className="p-6 bg-slate-50 border rounded-2xl">
                 <p className="text-xs font-bold text-slate-500 uppercase mb-2">Ghi chú hệ thống</p>
                 <p className="text-xs text-slate-600 leading-relaxed">
                   Hành động này sẽ thay đổi trạng thái hiển thị trên tài khoản khách hàng. Hãy đảm bảo thông tin thanh toán đã chính xác trước khi chuyển sang "Đã thanh toán".
                 </p>
              </div>
            </div>

            <div className="p-6 border-t flex gap-4 bg-slate-50">
              <button 
                onClick={() => setShowDrawer(false)} 
                className="flex-1 bg-white border rounded-xl py-3 font-bold hover:bg-slate-50"
              >
                Hủy
              </button>
              <button 
                onClick={handleUpdateStatus} 
                className="flex-[2] bg-primary text-white rounded-xl py-3 font-bold hover:bg-primary/90 shadow-lg"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};