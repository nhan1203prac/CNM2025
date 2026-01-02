import React from 'react';

export const StatCard = ({ data }) => {
  // 1. Kiểm tra an toàn: Nếu data chưa tới hoặc thiếu trường, không cho crash app
  if (!data) return null;

  // 2. Định nghĩa màu sắc mặc định dựa trên icon hoặc title nếu API chưa trả về màu
  // Hoặc bạn có thể thêm logic kiểm tra isPositive từ chuỗi trend "+12.5%"
  const isPositive = data.trend?.startsWith('+');
  
  // Logic xử lý màu sắc an toàn thay cho data.colorClass.split
  const getColors = (title) => {
    switch (title) {
      case "Tổng doanh thu": return { icon: "text-blue-600", bg: "bg-blue-500/10" };
      case "Đơn hàng": return { icon: "text-purple-600", bg: "bg-purple-500/10" };
      case "Sản phẩm": return { icon: "text-orange-600", bg: "bg-orange-500/10" };
      case "Khách hàng": return { icon: "text-emerald-600", bg: "bg-emerald-500/10" };
      default: return { icon: "text-slate-600", bg: "bg-slate-500/10" };
    }
  };

  const colors = getColors(data.title);

  return (
    <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        {/* API dùng 'title', không phải 'label' */}
        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide uppercase">
          {data.title}
        </p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors.bg}`}>
          <span className={`material-symbols-outlined text-[20px] ${colors.icon}`}>
            {data.icon}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {data.value}
        </p>
        <div className={`flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
          isPositive ? 'text-green-600 bg-green-500/10' : 'text-red-600 bg-red-500/10'
        }`}>
          <span className="material-symbols-outlined text-[14px] mr-0.5">
            {isPositive ? 'trending_up' : 'trending_down'}
          </span>
          {data.trend}
        </div>
      </div>
    </div>
  );
};