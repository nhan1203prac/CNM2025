import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import baseAPI from "../api/baseApi";
import {
  Loader2,
  Package,
  ChevronRight,
  Info,
  X,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { untils } from "../../languages/untils";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/checkout/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const OrdersPage = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");

  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [clientSecret, setClientSecret] = useState(null);
  const [showStripeModal, setShowStripeModal] = useState(false);


  const stripePromise = loadStripe("pk_test_51P5IjLP1PtyodjX47SnvBY3JoM9TeTPxLhuM8gmzWXCT8zGei2uAIg9dj3Jl01FAPtVmGgHNLMAzYv92dmEa7y5O00Icax3DvC");
  const tabs = [
    { key: "ALL", label: untils.mess("ordersPage.tabs.all") },
    { key: "PENDING", label: untils.mess("ordersPage.tabs.pending") },
    { key: "SHIPPING", label: untils.mess("ordersPage.tabs.shipping") },
    { key: "DELIVERED", label: untils.mess("ordersPage.tabs.delivered") },
    { key: "CANCELLED", label: untils.mess("ordersPage.tabs.cancelled") },
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await baseAPI.get("/orders");
      console.log("order", res.data);
      setOrders(res.data);
    } catch (error) {
      toast.error(untils.mess("ordersPage.error_load"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const filteredOrders = orders.filter(
    (o) => activeTab === "ALL" || o.shipping_status === activeTab
  );

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handlePayment = async(orderId) => {
    // console.log("payment");
    try {
      const orderToPay = orders.find(o => o.id === orderId);
      setSelectedOrder(orderToPay);
      toast.loading("Đang kết nối cổng thanh toán...");
      const res = await baseAPI.post(`/payment/intents/${orderId}`);
      setClientSecret(res.data.client_secret);
      setShowStripeModal(true);
      console.log("Secret nhận được:", res.data.client_secret);
      toast.dismiss();

    } catch (error) {
      toast.error("Lỗi: " + error.response?.data?.detail);
    }

  };

  // Helper function để lấy label trạng thái
  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return untils.mess("ordersPage.tabs.pending");
      case "SHIPPING":
        return untils.mess("ordersPage.tabs.shipping");
      case "DELIVERED":
        return untils.mess("ordersPage.tabs.delivered");
      case "CANCELLED":
        return untils.mess("ordersPage.tabs.cancelled");
      default:
        return status;
    }
  };

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-sm font-semibold text-slate-500">
          {untils.mess("ordersPage.loading")}
        </p>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          {untils.mess("ordersPage.title")}
        </h1>

        {/* Tabs điều hướng */}
        <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-4 text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-b-2 border-primary text-primary"
                  : "text-slate-400 hover:text-slate-600"
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
              <p className="text-slate-500 font-medium">
                {untils.mess("ordersPage.empty_state")}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-all"
              >
                {/* Header đơn hàng */}
                <div className="flex justify-between items-start md:items-center mb-6 pb-6 border-b border-slate-50">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="font-bold text-lg text-slate-900">
                      {untils.mess("ordersPage.card.order_id")}: #{order.id}
                    </span>
                    <span
                      className={`w-fit px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        order.shipping_status === "DELIVERED"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {getStatusLabel(order.shipping_status)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.payment_status === "PAID" ? (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold uppercase">
                        <CheckCircle2 size={12} />{" "}
                        {untils.mess("ordersPage.status.paid") ||
                          "Đã thanh toán"}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold uppercase">
                        <Clock size={12} />{" "}
                        {untils.mess("ordersPage.status.unpaid") ||
                          "Chờ thanh toán"}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    {new Date(order.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                {/* Danh sách sản phẩm rút gọn */}
                <div className="space-y-4">
                  {order.items?.slice(0, 1).map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="size-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                        <img
                          src={item.product?.main_image}
                          className="w-full h-full object-cover"
                          alt={item.product?.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm truncate">
                          {item.product?.name}
                        </h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs font-medium text-slate-400">
                            {untils.mess("ordersPage.card.quantity")}: x
                            {item.quantity}
                          </span>
                          <span className="font-bold text-slate-900">
                            {formatCurrency(item.price_at_purchase)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {order.items?.length > 1 && (
                    <p className="text-xs font-semibold text-slate-400 pl-24">
                      {untils.mess("ordersPage.card.view_more")}{" "}
                      {order.items.length - 1}{" "}
                      {untils.mess("ordersPage.card.view_more_suffix")}
                    </p>
                  )}
                </div>

                {/* Footer đơn hàng */}
                <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {untils.mess("ordersPage.card.total_payment")}
                    </p>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(order.total_amount)}
                    </span>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    {order.payment_status !== "PAID" &&
                      order.shipping_status !== "CANCELLED" && (
                        <button
                          onClick={() => handlePayment(order.id)}
                          className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2"
                        >
                          <Truck size={16} />{" "}
                          {untils.mess("ordersPage.btn_pay_now") ||
                            "Thanh toán ngay"}
                        </button>
                      )}

                    <button
                      onClick={() => handleOpenDetail(order)}
                      className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      <Info size={16} />{" "}
                      {untils.mess("ordersPage.card.btn_detail")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showDetail && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowDetail(false)}
          ></div>
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {untils.mess("ordersPage.detail_popup.title")}
                </h2>
                <p className="text-xs font-medium text-slate-400 mt-1">
                  {untils.mess("ordersPage.detail_popup.order_id")}: #
                  {selectedOrder.id}
                </p>
              </div>
              <button
                onClick={() => setShowDetail(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
              <div className="space-y-4">
                {selectedOrder.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-center p-3 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <img
                      src={item.product?.main_image}
                      className="size-16 rounded-xl object-cover"
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">
                        {item.product?.name}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-1">
                        {untils.mess("ordersPage.detail_popup.variant")}:{" "}
                        {item.selected_size ||
                          untils.mess("ordersPage.detail_popup.default")}{" "}
                        /{" "}
                        {item.selected_color ||
                          untils.mess("ordersPage.detail_popup.default")}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-primary text-sm">
                          {formatCurrency(item.price_at_purchase)}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          x{item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-slate-900 rounded-2xl text-white space-y-3">
                <div className="flex justify-between text-xs font-medium opacity-70">
                  <span>{untils.mess("ordersPage.detail_popup.subtotal")}</span>
                  <span>{formatCurrency(selectedOrder.total_amount)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium opacity-70">
                  <span>{untils.mess("ordersPage.detail_popup.shipping")}</span>
                  <span>{untils.mess("ordersPage.detail_popup.free")}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold">
                    {untils.mess("ordersPage.detail_popup.total")}
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(selectedOrder.total_amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Popup */}
            <div className="p-6 bg-slate-50">
              <button
                onClick={() => setShowDetail(false)}
                className="w-full py-4 rounded-xl bg-white border border-slate-200 font-bold text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all"
              >
                {untils.mess("ordersPage.detail_popup.btn_close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showStripeModal && clientSecret && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Thanh toán bằng thẻ</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm 
                clientSecret={clientSecret} 
                orderId={selectedOrder?.id}
                onOrderPaid={() => {
                  setShowStripeModal(false);
                  fetchOrders(); 
                }} 
              />
            </Elements>
            <button onClick={() => setShowStripeModal(false)} className="mt-4 text-slate-400 w-full text-center">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
