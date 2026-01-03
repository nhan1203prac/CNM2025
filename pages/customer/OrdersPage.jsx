import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import baseAPI from '../api/baseApi';
import { 
  Loader2, Package, ChevronRight, Info, 
  X, CheckCircle2, Clock, Truck, XCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  
  // State dành cho Popup Chi tiết
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const tabs = [
    { key: 'ALL', label: 'Tất cả' },
    { key: 'PENDING', label: 'Chờ xử lý' },
    { key: 'SHIPPING', label: 'Đang giao' },
    { key: 'DELIVERED', label: 'Hoàn thành' },
    { key: 'CANCELLED', label: 'Đã hủy' }
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await baseAPI.get('/orders');
      setOrders(res.data);
    } catch (error) {
      toast.error("Không thể tải lịch sử đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const formatCurrency = (amount) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const filteredOrders = orders.filter(o => activeTab === 'ALL' || o.shipping_status === activeTab);

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-primary mb-4" size={40} />
      <p className="text-sm font-semibold text-slate-500">Đang đồng bộ đơn hàng...</p>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Đơn hàng của tôi</h1>

        {/* Tabs điều hướng */}
        <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button 
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-4 text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.key 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-20 text-center border border-slate-100 shadow-sm">
              <Package size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-500 font-medium">Bạn chưa có đơn hàng nào ở trạng thái này.</p>
            </div>
          ) : filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
              {/* Header đơn hàng */}
              <div className="flex justify-between items-start md:items-center mb-6 pb-6 border-b border-slate-50">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="font-bold text-lg text-slate-900">Mã đơn: #{order.id}</span>
                  <span className={`w-fit px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    order.shipping_status === 'DELIVERED' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-blue-50 text-blue-600'
                  }`}>
                    {order.shipping_status === 'PENDING' ? 'Chờ xử lý' : 
                     order.shipping_status === 'SHIPPING' ? 'Đang giao hàng' :
                     order.shipping_status === 'DELIVERED' ? 'Đã hoàn thành' : 'Đã hủy'}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-400">
                  {new Date(order.created_at).toLocaleDateString('vi-VN')}
                </span>
              </div>

              {/* Danh sách sản phẩm rút gọn */}
              <div className="space-y-4">
                {order.items?.slice(0, 1).map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="size-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                        <img src={item.product?.main_image} className="w-full h-full object-cover" alt={item.product?.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.product?.name}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-medium text-slate-400">Số lượng: x{item.quantity}</span>
                        <span className="font-bold text-slate-900">{formatCurrency(item.price_at_purchase)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {order.items?.length > 1 && (
                  <p className="text-xs font-semibold text-slate-400 pl-24">
                    Xem thêm {order.items.length - 1} sản phẩm khác...
                  </p>
                )}
              </div>

              {/* Footer đơn hàng */}
              <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tổng thanh toán</p>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(order.total_amount)}</span>
                </div>
                <button 
                  onClick={() => handleOpenDetail(order)}
                  className="w-full md:w-auto px-8 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
                >
                  <Info size={16} /> Chi tiết đơn hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- POPUP CHI TIẾT --- */}
      {showDetail && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowDetail(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header Popup */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Chi tiết đơn hàng</h2>
                <p className="text-xs font-medium text-slate-400 mt-1">Mã số: #{selectedOrder.id}</p>
              </div>
              <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>

            {/* Content Popup */}
            <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
              <div className="space-y-4">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <img src={item.product?.main_image} className="size-16 rounded-xl object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.product?.name}</h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-1">
                        Phân loại: {item.selected_size || 'Mặc định'} / {item.selected_color || 'Mặc định'}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-primary text-sm">{formatCurrency(item.price_at_purchase)}</span>
                        <span className="text-xs font-bold text-slate-400">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-5 bg-slate-900 rounded-2xl text-white space-y-3">
                <div className="flex justify-between text-xs font-medium opacity-70">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(selectedOrder.total_amount)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium opacity-70">
                  <span>Vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold">Tổng thanh toán</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(selectedOrder.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Footer Popup */}
            <div className="p-6 bg-slate-50">
              <button 
                onClick={() => setShowDetail(false)}
                className="w-full py-4 rounded-xl bg-white border border-slate-200 font-bold text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;