import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(formData);
      toast.success("Đăng ký thành công! Hãy kiểm tra email.");
      navigate('/verify-email', { state: { email: formData.email } });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[480px] w-full bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <h2 className="text-[#181411] text-2xl font-bold group-hover:text-primary transition-colors">ShopMới</h2>
          </Link>
          <h1 className="text-3xl font-bold text-[#181411] mb-2">Đăng Ký</h1>
          <p className="text-gray-500">Tạo tài khoản mới để bắt đầu mua sắm</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="full_name">Họ và tên</label>
            <input 
              id="full_name"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-all" 
              placeholder="Nguyễn Văn A" 
              required 
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="username">Tên đăng nhập</label>
            <input 
              id="username"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-all" 
              placeholder="nguyenvana123" 
              required 
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-all" 
              placeholder="example@gmail.com" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">Mật khẩu</label>
            <div className="relative">
              <input 
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:outline-none transition-all" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-start pt-2">
            <input className="w-4 h-4 mt-0.5 border-gray-300 rounded text-primary focus:ring-primary" id="terms" required type="checkbox"/>
            <label className="ml-2 text-sm text-gray-600" htmlFor="terms">
              Tôi đồng ý với <span className="text-primary font-medium">Điều khoản dịch vụ</span>
            </label>
          </div>

          <button 
            className={`w-full bg-primary text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20 mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90 hover:-translate-y-0.5'}`} 
            type="submit"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng ký tài khoản"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Bạn đã có tài khoản? <Link className="font-bold text-primary hover:underline" to="/login">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;