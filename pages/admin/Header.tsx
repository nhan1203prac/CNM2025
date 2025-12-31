
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark sticky top-0 z-30">
      <div className="flex items-center gap-2 text-sm">
        <a href="#" className="text-slate-500 hover:text-primary transition-colors">Trang chủ</a>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-slate-900 dark:text-white font-semibold">Dashboard</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-[24px]">search</span>
        </button>
        <button className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-background-dark"></span>
        </button>
      </div>
    </header>
  );
};
