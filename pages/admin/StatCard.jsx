
import React from 'react';

export const StatCard = ({ data }) => (
  <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide uppercase">{data.label}</p>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${data.colorClass.split(' ').pop()}`}>
        <span className={`material-symbols-outlined text-[20px] ${data.colorClass.split(' ')[0]}`}>{data.icon}</span>
      </div>
    </div>
    <div className="flex items-end justify-between">
      <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{data.value}</p>
      <div className={`flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${data.isPositive ? 'text-green-600 bg-green-500/10' : 'text-red-600 bg-red-500/10'}`}>
        <span className="material-symbols-outlined text-[14px] mr-0.5">
          {data.isPositive ? 'trending_up' : 'trending_down'}
        </span>
        {data.trend}
      </div>
    </div>
  </div>
);
