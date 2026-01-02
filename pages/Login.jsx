
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      
      toast.success("Đăng nhập Google thành công!");
     
      navigate("/"); 
      
      window.location.reload();
    }
  }, [searchParams, navigate]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password); 
      console.log("user login", user)
      toast.success(`Đăng nhập thành công!`);
      
      if (user.isAdmin) {
        navigate('/admin/dashboard');
      } 
      else if(!user.is_active) {
        toast.success("Tài khoản chưa xác thực, đang chuyển hướng...");
        navigate('/verify-email', { state: { email: user.email } });
      }
      else {
        console.log("active", user.is_active)
        toast.success("Đăng nhập thành công!");
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/api/v1/auth/google/login";
  };


  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="size-10 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 10C26.2091 10 28 11.7909 28 14V17H31C32.6569 17 34 18.3431 34 20V34C34 35.6569 32.6569 37 31 37H17C15.3431 37 14 35.6569 14 34V20C14 18.3431 15.3431 17 17 17H20V14C20 11.7909 21.7909 10 24 10ZM24 29C25.6569 29 27 27.6569 27 26C27 24.3431 25.6569 23 24 23C22.3431 23 21 24.3431 21 26C21 27.6569 22.3431 29 24 29Z" fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-[#181411] text-2xl font-bold group-hover:text-primary transition-colors">ShopMới</h2>
          </Link>
          <h1 className="text-3xl font-bold text-[#181411] mb-2">Chào mừng trở lại!</h1>
          <p className="text-gray-500">Vui lòng nhập thông tin để đăng nhập</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com" 
                type="text" 
                required
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Mật khẩu</label>
              <Link className="text-xs font-semibold text-primary hover:underline" to={"/forgot-password"}>Quên mật khẩu?</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm" 
                id="password" 
                placeholder="••••••••" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center">
            <input className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" id="remember-me" type="checkbox"/>
            <label className="ml-2 block text-sm text-gray-500" htmlFor="remember-me">Ghi nhớ đăng nhập</label>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Đăng nhập
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span></div>
        </div>

        <div className="">
          <button className=" flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={handleGoogleLogin}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Google
          </button>
          
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Chưa có tài khoản? <Link className="font-bold text-primary hover:underline" to="/signup">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
