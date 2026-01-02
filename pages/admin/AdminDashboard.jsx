import React, { useEffect, useState } from 'react';
import { StatCard } from './StatCard';
import { RevenueChart } from './RevenueChart';
import { TopCategories } from './TopCategories';
import { RecentOrders } from './RecentOrders';
import baseAPI from '../api/baseApi';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [day , setDay] = useState(7);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await baseAPI.get("/admin/dashboard-data",{ params: { days: day } });
        console.log("admin", response.data)
        setData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [day]);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tổng quan</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Theo dõi hiệu suất kinh doanh của cửa hàng.</p>
        </div>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.stats.map((stat, i) => (
          <StatCard key={i} data={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={data.revenue_chart} setDay = {setDay} />
        </div>
        <div>
          <TopCategories data={data.top_categories}/>
        </div>
      </div>

      <RecentOrders orders={data.recent_orders}/>
    </div>
  );
};

export default AdminDashboard;