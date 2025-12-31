import React from 'react';
import { StatCard } from './StatCard';
import { RevenueChart } from './RevenueChart';
import { TopCategories } from './TopCategories';
import { RecentOrders } from './RecentOrders';
import { STATS } from '../../constants'; 

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tổng quan</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Theo dõi hiệu suất kinh doanh của cửa hàng.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Xuất báo cáo
          </button>
          <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-black hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Tạo mới
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat, i) => (
          <StatCard key={i} data={stat} />
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <TopCategories />
        </div>
      </div>

      {/* Recent Orders Section */}
      <RecentOrders />
    </div>
  );
};

export default AdminDashboard;