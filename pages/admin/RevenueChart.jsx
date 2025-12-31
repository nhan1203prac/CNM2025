import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { REVENUE_CHART_DATA } from '../../constants';

export const RevenueChart = () => {
  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Doanh thu 6 tháng qua</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white">1.2 Tỷ</span>
            <span className="text-[11px] text-green-600 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">+15% so với kỳ trước</span>
          </div>
        </div>
        <select className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20">
          <option>6 tháng</option>
          <option>1 năm</option>
          <option>Tất cả</option>
        </select>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_CHART_DATA}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#137fec" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              dy={10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e2936', border: 'none', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#137fec' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#137fec" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
