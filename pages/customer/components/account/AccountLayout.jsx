import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
// 1. Import untils và Context
import { untils } from "../../../../languages/untils";

const AccountLayout = ({ children }) => {
  // 2. Kích hoạt hook lắng nghe thay đổi ngôn ngữ

  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  // 3. Chuyển menuItems thành dynamic text dùng untils.mess
  const menuItems = [
    { label: untils.mess("account.menu.dashboard"), icon: 'dashboard', path: '/account' },
    { label: untils.mess("account.menu.profile"), icon: 'person', path: '/account/profile' },
    { label: untils.mess("account.menu.addresses"), icon: 'location_on', path: '/account/addresses' },
    { label: untils.mess("account.menu.notifications"), icon: 'notifications', path: '/account/notification', badge: 3 },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-8 w-full">
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        {/* Tái sử dụng key 'Trang chủ' từ header */}
        <Link className="hover:text-primary transition-colors" to="/">
            {untils.mess("header.nav.home")}
        </Link>
        <span className="material-symbols-outlined text-sm mx-2">chevron_right</span>
        <span className="text-[#181411] font-medium">
            {untils.mess("account.breadcrumb")}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
            <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center bg-gradient-to-b from-orange-50/50 to-white">
              <div className="relative size-24 mb-4">
                <div className="size-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                  <img alt="User Avatar" className="w-full h-full object-cover" src={user?.avatar || "https://via.placeholder.com/150"} />
                </div>
                <button className="absolute bottom-0 right-0 size-8 bg-white rounded-full shadow border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <h3 className="font-bold text-[#181411] text-xl mb-1">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <nav className="p-3">
              <ul className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}> {/* Đổi key thành path để tránh trùng lặp nếu label giống nhau */}
                      <Link 
                        to={item.path} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-orange-50 text-primary font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-[#181411] font-medium'}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        <div className="flex-1 flex items-center justify-between">
                          <span>{item.label}</span>
                          {item.badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                        </div>
                      </Link>
                    </li>
                  );
                })}
                <li className="mt-2 pt-2 border-t border-gray-100">
                  <button 
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:text-red-500 font-medium transition-colors w-full"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    <span>{untils.mess("account.menu.logout")}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        
        <div className="col-span-1 lg:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;