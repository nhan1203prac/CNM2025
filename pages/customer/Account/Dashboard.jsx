import React, { useEffect, useState } from "react";
import { Loader2, ShoppingBag, CheckCircle, Heart } from "lucide-react";
import baseAPI from "../../api/baseApi";
import ProductCard from "../components/common/ProductCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const response = await baseAPI.get("/profile-dashboard");
        const dt = {
          ...response.data, 
          wishlist: response.data.wishlist.map((item) => ({
            ...item,
            is_favorite: true, 
          })),
        };
        setData(dt);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const onToggleFavorite = (productId, isFav) => {
    if (!isFav) {
      // Nếu người dùng bỏ yêu thích, cập nhật lại state để xóa sản phẩm khỏi UI Dashboard
      setData((prev) => ({
        ...prev,
        wishlist: prev.wishlist.filter((p) => p.id !== productId),
        stats: {
          ...prev.stats,
          wishlist_count: Math.max(0, prev.stats.wishlist_count - 1),
        },
      }));
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 w-full">
        <Loader2 className="animate-spin text-primary mb-2" size={40} />
        <p className="text-sm text-gray-500 font-medium">Đang tải dữ liệu...</p>
      </div>
    );

  if (!data)
    return (
      <div className="p-10 text-center text-gray-500">
        Không có dữ liệu hiển thị.
      </div>
    );

  const { stats, recent_orders, wishlist } = data;
  console.log("wishlist", wishlist);
  return (
    <div className="flex flex-col gap-6">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          count={stats?.processing_orders || 0}
          label="Đơn hàng đang xử lý"
          icon={<ShoppingBag size={24} />}
          color="blue"
        />
        <StatCard
          count={stats?.completed_orders || 0}
          label="Đơn hàng thành công"
          icon={<CheckCircle size={24} />}
          color="green"
        />
        <StatCard
          count={stats?.wishlist_count || 0}
          label="Sản phẩm yêu thích"
          icon={<Heart size={24} />}
          color="red"
        />
      </div>

      {/* RECENT ORDERS */}
      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#181411]">Đơn hàng gần đây</h2>
          <Link to="/orders" className="text-primary text-sm font-bold hover:underline">
            Xem tất cả
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 bg-gray-50 border-b border-gray-100 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Mã đơn hàng</th>
                <th className="px-6 py-4 font-bold">Ngày đặt</th>
                <th className="px-6 py-4 font-bold">Sản phẩm</th>
                <th className="px-6 py-4 font-bold">Tổng tiền</th>
                <th className="px-6 py-4 font-bold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recent_orders && recent_orders.length > 0 ? (
                recent_orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-[#181411]">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
                      {order ? order.first_item_name : "Sản phẩm không tên"}
                      {order.items_count > 1 &&
                        ` và ${order.items_count - 1} khác`}
                    </td>
                    <td className="px-6 py-4 font-black text-primary">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          order.status === "Hoàn thành"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    Bạn chưa có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* WISHLIST SECTION */}
      <section className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#181411]">
            Sản phẩm yêu thích
          </h2>
          <Link to={"/favorites"} className="text-primary text-sm font-bold hover:underline">
            Xem tất cả
          </Link>
        </div>
        {wishlist && wishlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
            Danh sách yêu thích đang trống.
          </div>
        )}
      </section>
    </div>
  );
};

const StatCard = ({ count, label, icon, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-500",
    green: "bg-green-50 text-green-500",
    red: "bg-red-50 text-red-500",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
      <div
        className={`size-14 rounded-full flex items-center justify-center ${
          colors[color] || colors.blue
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-[#181411]">{count}</p>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
