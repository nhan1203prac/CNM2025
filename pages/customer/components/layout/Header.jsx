import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  LogOut,
  Package,
  Heart
} from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'
const Header = () => {
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [openUserMenu, setOpenUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target )
      ) {
        setOpenUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#f4f2f0] shadow-sm">
      <div className="px-4 lg:px-40 py-2">
        {/* TOP */}
        <div className="flex items-center justify-between py-3 gap-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-8 text-primary">
              <svg viewBox="0 0 48 48" fill="currentColor">
                <circle cx="24" cy="24" r="20" />
              </svg>
            </div>
            <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
              ShopMới
            </h2>
          </Link>

          {/* SEARCH DESKTOP */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="flex w-full items-center rounded-lg h-10 bg-[#f4f2f0] focus-within:ring-2 focus-within:ring-primary/50">
              <div className="pl-4 pr-2 text-[#897261]">
                <Search size={18} />
              </div>
              <input
                className="flex-1 bg-transparent border-none text-sm focus:ring-0"
                placeholder="Tìm kiếm sản phẩm..."
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* NAV */}
            <nav className="hidden lg:flex items-center gap-6 mr-2">
              <Link to="/" className="text-primary text-sm font-bold">
                Trang chủ
              </Link>
              <Link to="/products" className="text-sm hover:text-primary">
                Sản phẩm
              </Link>
              <Link to="/favorites" className="text-sm hover:text-primary">
                Yêu thích
              </Link>
              <Link to="/orders" className="text-sm hover:text-primary">
                Đơn hàng
              </Link>
            </nav>

            {/* CART */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center size-10 rounded-full hover:bg-[#f4f2f0]"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 size-4 bg-primary text-white text-[10px] flex items-center justify-center font-bold rounded-full">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </Link>

            {/* USER */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setOpenUserMenu(v => !v)}
                  className="hidden md:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-[#f4f2f0]"
                >
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="size-8 rounded-full object-cover border"
                  />
                  <span className="text-sm font-bold">{user.name}</span>
                  <ChevronDown size={16} />
                </button>

                {/* DROPDOWN */}
                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                    <Link
                      to="/account"
                      onClick={() => setOpenUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <User size={16} />
                      Tài khoản
                    </Link>

                    

                    <div className="border-t">
                      <button
                        onClick={() => {
                          logout()
                          setOpenUserMenu(false)
                          navigate('/login')
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center size-10 rounded-full hover:bg-[#f4f2f0]"
              >
                <User size={20} />
              </Link>
            )}
          </div>
        </div>

        {/* SEARCH MOBILE */}
        <div className="flex md:hidden pb-3">
          <div className="flex w-full items-center rounded-lg h-10 bg-[#f4f2f0]">
            <div className="pl-4 pr-2 text-[#897261]">
              <Search size={16} />
            </div>
            <input
              className="flex-1 bg-transparent border-none text-sm focus:ring-0"
              placeholder="Tìm kiếm..."
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
