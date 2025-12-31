
import React from 'react';
import { CATEGORIES } from '../../constants';

export const TopCategories = () => {
  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Top Danh Mục</h3>
      
      <div className="flex flex-col gap-6 flex-1">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{cat.name}</span>
              <span className="text-sm font-black text-slate-900 dark:text-white">{cat.percentage}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${cat.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${cat.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
        <a href="#" className="flex items-center justify-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
          Xem chi tiết danh mục
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>
    </div>
  );
};
