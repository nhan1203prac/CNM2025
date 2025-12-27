
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Signup: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[480px] w-full bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="size-10 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 10C26.2091 10 28 11.7909 28 14V17H31C32.6569 17 34 18.3431 34 20V34C34 35.6569 32.6569 37 31 37H17C15.3431 37 14 35.6569 14 34V20C14 18.3431 15.3431 17 17 17H20V14C20 11.7909 21.7909 10 24 10ZM24 29C25.6569 29 27 27.6569 27 26C27 24.3431 25.6569 23 24 23C22.3431 23 21 24.3431 21 26C21 27.6569 22.3431 29 24 29Z" fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-[#181411] text-2xl font-bold group-hover:text-primary transition-colors">ShopMới</h2>
          </Link>
          <h1 className="text-3xl font-bold text-[#181411] mb-2">Đăng Ký</h1>
          <p className="text-gray-500">Tạo tài khoản mới để bắt đầu mua sắm</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Họ và tên</label>
            <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="Nhập họ tên của bạn" required type="text"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="email@example.com" required type="email"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mật khẩu</label>
            <div className="relative">
              <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" placeholder="••••••••" required type="password"/>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1" type="button">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">Mật khẩu phải có ít nhất 8 ký tự</p>
          </div>
          <div className="flex items-start pt-2">
            <div className="flex items-center h-5">
              <input className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary/20 text-primary" id="terms" required type="checkbox"/>
            </div>
            <label className="ml-2 text-sm text-gray-600" htmlFor="terms">Tôi đồng ý với <a className="text-primary font-medium hover:underline" href="#">Điều khoản</a> và <a className="text-primary font-medium hover:underline" href="#">Chính sách bảo mật</a></label>
          </div>
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-primary/20 mt-2" type="submit">
            Đăng ký tài khoản
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-gray-500 font-medium">Hoặc đăng ký với</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-gray-700">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-gray-700">
            <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
            </svg>
            Facebook
          </button>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Bạn đã có tài khoản? <Link className="font-bold text-primary hover:underline" to="/login">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
