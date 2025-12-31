import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-[#111418] h-full flex-shrink-0">
      
      {/* Header */}
      <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-[20px]">
              storefront
            </span>
          </div>
          <span>Admin Store</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-1 px-3 py-6">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
            ${isActive
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white"}`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`material-symbols-outlined ${
                  isActive ? "fill-current" : ""
                }`}
              >
                dashboard
              </span>
              <span className="text-sm font-semibold">Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
            ${isActive
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white"}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? "fill-current" : ""}`}>
                shopping_bag
              </span>
              <span className="text-sm font-semibold">Đơn hàng</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
            ${isActive
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white"}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? "fill-current" : ""}`}>
                category
              </span>
              <span className="text-sm font-semibold">Danh mục</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
            ${isActive
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white"}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? "fill-current" : ""}`}>
                inventory_2
              </span>
              <span className="text-sm font-semibold">Sản phẩm</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
            ${isActive
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white"}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? "fill-current" : ""}`}>
                group
              </span>
              <span className="text-sm font-semibold">Người dùng</span>
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
