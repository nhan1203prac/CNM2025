
import React, { useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { untils } from '../../../../languages/untils';

const AccountLayout = () => {
  const {logout } = useAuth();
  const { pathname } = useLocation();
  // const [labePage, setLabelPage] = useState('Tổng quan');

  const user = JSON.parse(localStorage.getItem("user_info"));

  if(!user){
    return <Navigate to="/login" replace state={{from: pathname}}/>
  }
  const menuItems = [
    { label: (untils.mess("accountLayout.menu.dashboard")), icon: 'dashboard', path: '/account' },
    { label: (untils.mess("accountLayout.menu.profile")), icon: 'person', path: '/account/profile' },
    { label: (untils.mess("accountLayout.menu.addresses")), icon: 'location_on', path: '/account/addresses' },
    { label: (untils.mess("accountLayout.menu.notifications")), icon: 'notifications', path: '/account/notification'},
  ];

  const currentMenu = menuItems.find(item => item.path === pathname);
  const labelPage = currentMenu?.label || (untils.mess("accountLayout.menu.dashboard"));

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-8 w-full">
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link className="hover:text-primary transition-colors" to="/">{untils.mess("accountLayout.home")}</Link>
        <span className="material-symbols-outlined text-sm mx-2">chevron_right</span>
        <span className="text-[#181411] font-medium">{labelPage}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
            <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center bg-gradient-to-b from-orange-50/50 to-white">
              <div className="relative size-24 mb-4">
                <div className="size-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                  <img alt="User Avatar" className="w-full h-full object-cover" src={user?.profile?.avatar || `https://ui-avatars.com/api/?name=${user.username}`} />
                </div>
                
              </div>
              <h3 className="font-bold text-[#181411] text-xl mb-1">{user?.profile?.full_name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <nav className="p-3">
              <ul className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.label}>
                      <Link 
                        to={item.path} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-orange-50 text-primary font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-[#181411] font-medium'}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        <div className="flex-1 flex items-center justify-between">
                          <span>{item.label}</span>
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
                    <span>{untils.mess("accountLayout.menu.logout")}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        
        <div className="col-span-1 lg:col-span-3">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
