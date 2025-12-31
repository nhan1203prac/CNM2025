
import React from 'react';

const SidebarLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
      active
        ? 'bg-primary text-white shadow-md shadow-primary/20'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white'
    }`}
  >
    <span className={`material-symbols-outlined ${active ? 'fill-current' : ''}`}>{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

export const Sidebar = ({ currentPage, setPage }) => {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-[#111418] h-full flex-shrink-0">
      <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-[20px]">storefront</span>
          </div>
          <span>Admin Store</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-3 py-6">
        <SidebarLink 
          icon="dashboard" 
          label="Dashboard" 
          active={currentPage === 'dashboard'} 
          onClick={() => setPage('dashboard')} 
        />
        <SidebarLink 
          icon="shopping_bag" 
          label="Đơn hàng" 
          active={currentPage === 'orders'} 
          onClick={() => setPage('orders')} 
        />
        <SidebarLink 
          icon="category" 
          label="Danh mục" 
          active={currentPage === 'categories'} 
          onClick={() => setPage('categories')} 
        />
        <SidebarLink 
          icon="inventory_2" 
          label="Sản phẩm" 
          active={currentPage === 'products'} 
          onClick={() => setPage('products')} 
        />
        <SidebarLink 
          icon="group" 
          label="Người dùng" 
          active={currentPage === 'users'} 
          onClick={() => setPage('users')} 
        />
      </div>

      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border-2 border-primary/10" 
               style={{ backgroundImage: "url('https://picsum.photos/seed/admin/100')" }}>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate">Admin User</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">admin@store.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
