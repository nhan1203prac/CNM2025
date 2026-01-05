import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  LogOut,
  Package,
  Heart,
  Globe,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { untils } from "../../../../languages/untils";
const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("user", user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const [lang, setLang] = useState(untils.getLang());

const changeLang = (l) => {
  untils.setLang(l);
  setLang(l);
  localStorage.setItem("lang", l);
  window.location.reload(); 
};

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#f4f2f0] shadow-sm">
      <div className="px-4 lg:px-40 py-2">
        <div className="flex items-center justify-between py-3 gap-4">
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

          <div className="flex items-center gap-3 md:gap-4">
            <nav className="hidden lg:flex items-center gap-6 mr-2">
              <Link
                to="/"
                className={`text-sm font-bold transition-colors ${
                  isActive("/")
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Trang chủ
              </Link>
              <Link
                to="/products"
                className={`text-sm font-bold transition-colors ${
                  isActive("/products")
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Sản phẩm
              </Link>
              <Link
                to="/favorites"
                className={`text-sm font-bold transition-colors ${
                  isActive("/favorites")
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Yêu thích
              </Link>
              <Link
                to="/orders"
                className={`text-sm font-bold transition-colors ${
                  isActive("/orders")
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                Đơn hàng
              </Link>
            </nav>

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

            <div className="relative group">
  <button className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[#f4f2f0]">
    <Globe size={18} />
    <span className="text-xs font-bold">{lang}</span>
  </button>

  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
    <button
      onClick={() => changeLang("vi-VN")}
      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
        lang === "vi-VN" ? "font-bold text-primary" : ""
      }`}
    >
      🇻🇳 Tiếng Việt
    </button>
    <button
      onClick={() => changeLang("en-US")}
      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
        lang === "en-US" ? "font-bold text-primary" : ""
      }`}
    >
      🇺🇸 English
    </button>
  </div>
</div>


            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setOpenUserMenu((v) => !v)}
                  className="hidden md:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-[#f4f2f0]"
                >
                  <img
                    src={
                      user?.profile?.avatar ||
                      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    }
                    alt="avatar"
                    className="size-8 rounded-full object-cover border"
                  />
                  <span className="text-sm font-bold">{user?.username}</span>
                  <ChevronDown size={16} />
                </button>

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
                          logout();
                          setOpenUserMenu(false);
                          navigate("/login");
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
  );
};

export default Header;
