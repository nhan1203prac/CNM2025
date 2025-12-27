
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../../App';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#f4f2f0] shadow-sm">
      <div className="px-4 lg:px-40 flex flex-col justify-center py-2">
        <div className="flex items-center justify-between whitespace-nowrap py-3 gap-4">
          <div className="flex items-center gap-4 text-[#181411]">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="size-8 text-primary">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 10C26.2091 10 28 11.7909 28 14V17H31C32.6569 17 34 18.3431 34 20V34C34 35.6569 32.6569 37 31 37H17C15.3431 37 14 35.6569 14 34V20C14 18.3431 15.3431 17 17 17H20V14C20 11.7909 21.7909 10 24 10ZM24 29C25.6569 29 27 27.6569 27 26C27 24.3431 25.6569 23 24 23C22.3431 23 21 24.3431 21 26C21 27.6569 22.3431 29 24 29Z" fill="currentColor" fill-rule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-[#181411] text-xl font-bold leading-tight tracking-[-0.015em] group-hover:text-primary transition-colors">ShopMới</h2>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-10 bg-[#f4f2f0] focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <div className="text-[#897261] flex items-center justify-center pl-4 pr-2">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent border-none text-[#181411] focus:ring-0 placeholder:text-[#897261]/70 px-0 text-sm font-normal" 
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-4">
            <nav className="hidden lg:flex items-center gap-6 mr-2">
              <Link to="/" className="text-primary text-sm font-bold transition-colors">Trang chủ</Link>
              <Link to="/" className="text-[#181411] text-sm font-medium hover:text-primary transition-colors">Sản phẩm</Link>
              <Link to="/account/orders" className="text-[#181411] text-sm font-medium hover:text-primary transition-colors">Đơn hàng</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative flex items-center justify-center rounded-full size-10 bg-transparent hover:bg-[#f4f2f0] text-[#181411] transition-colors">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 size-4 bg-primary text-white text-[10px] flex items-center justify-center font-bold rounded-full ring-2 ring-white">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </Link>
              {user ? (
                <button 
                  onClick={() => setIsDrawerOpen(true)}
                  className="hidden md:flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-[#f4f2f0] transition-colors border border-transparent hover:border-gray-100 group"
                >
                  <div className="size-8 rounded-full overflow-hidden border border-gray-200 group-hover:border-primary transition-colors">
                    <img alt="User Avatar" className="w-full h-full object-cover" src={user.avatar} />
                  </div>
                  <span className="text-sm font-bold text-[#181411] group-hover:text-primary transition-colors">{user.name}</span>
                </button>
              ) : (
                <Link to="/login" className="flex items-center justify-center rounded-full size-10 hover:bg-[#f4f2f0] text-[#181411]">
                  <span className="material-symbols-outlined">account_circle</span>
                </Link>
              )}
              {user && (
                <button onClick={() => setIsDrawerOpen(true)} className="md:hidden flex items-center justify-center rounded-full size-10 text-[#181411]">
                  <span className="material-symbols-outlined">account_circle</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex md:hidden pb-3">
          <div className="flex w-full items-stretch rounded-lg h-10 bg-[#f4f2f0]">
            <div className="text-[#897261] flex items-center justify-center pl-4 pr-2">
              <span className="material-symbols-outlined text-lg">search</span>
            </div>
            <input className="flex w-full min-w-0 flex-1 bg-transparent border-none text-[#181411] focus:ring-0 placeholder:text-[#897261] px-0 text-sm" placeholder="Tìm kiếm..."/>
          </div>
        </div>
      </div>

      {/* Account Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <aside className="relative w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#181411]">Tài khoản</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 bg-background-light/50 flex items-center gap-4">
              <div className="size-12 rounded-full bg-gray-200 overflow-hidden">
                <img alt="User Avatar" className="w-full h-full object-cover" src={user?.avatar} />
              </div>
              <div>
                <p className="font-bold text-[#181411]">{user?.name}</p>
                <p className="text-sm text-gray-500 truncate max-w-[160px]">{user?.email}</p>
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="flex flex-col">
                {[
                  { label: 'Tổng quan', icon: 'dashboard', path: '/account' },
                  { label: 'Thông tin tài khoản', icon: 'person', path: '/account/profile' },
                  { label: 'Lịch sử đơn hàng', icon: 'history', path: '/account/orders' },
                  { label: 'Sản phẩm yêu thích', icon: 'favorite', path: '/account/favorites' },
                  { label: 'Quản lý địa chỉ', icon: 'location_on', path: '#' },
                  { label: 'Thông báo', icon: 'notifications', path: '#', badge: 3 },
                ].map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.path} 
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary"
                    >
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      {item.badge && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-6 border-t border-gray-100">
              <button 
                onClick={() => { logout(); setIsDrawerOpen(false); navigate('/login'); }}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors font-medium"
              >
                <span className="material-symbols-outlined">logout</span>
                Đăng xuất
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Header;
