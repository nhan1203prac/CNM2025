import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import baseAPI from '../api/baseApi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwordData, setPasswordData] = useState({ password: '', confirm: '' });

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startResendTimer = () => {
    setCanResend(false);
    setTimer(60); 
  };

  const handleSendEmail = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await baseAPI.post("/auth/forgot-password", { email });
      toast.success("Mã xác thực đã được gửi tới email của bạn");
      setStep(2);
      startResendTimer();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      await baseAPI.post("/auth/forgot-password", { email });
      toast.success("Mã mới đã được gửi!");
      startResendTimer();
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } catch (error) {
      console.error(error);
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.confirm) {
      return toast.error("Mật khẩu xác nhận không khớp");
    }

    setLoading(true);
    try {
      await baseAPI.post("/auth/reset-password", {
        token: otp.join(''),
        new_password: passwordData.password
      });
      toast.success("Đặt lại mật khẩu thành công!");
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#181411]">
            {step === 1 && "Quên mật khẩu?"}
            {step === 2 && "Xác thực OTP"}
            {step === 3 && "Đặt lại mật khẩu"}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {step === 1 && "Nhập email của bạn để nhận mã khôi phục"}
            {step === 2 && `Mã đã được gửi tới ${email}`}
            {step === 3 && "Vui lòng nhập mật khẩu mới"}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendEmail} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
                type="email" required placeholder="example@gmail.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              {loading ? "Đang gửi..." : "Tiếp tục"}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index} id={`otp-${index}`} type="text" maxLength="1"
                  value={digit} onChange={(e) => handleOtpChange(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={handleResendEmail}
                disabled={!canResend || resendLoading}
                className={`text-sm font-bold ${canResend ? 'text-primary hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
              >
                {resendLoading ? "Đang gửi..." : canResend ? "Gửi lại mã" : `Gửi lại mã sau ${timer}s`}
              </button>
            </div>

            <button onClick={() => setStep(3)} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Xác nhận mã
            </button>
            <button onClick={() => setStep(1)} className="w-full text-gray-500 text-sm hover:underline font-medium">
              Thay đổi email
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
              <input 
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                type="password" required placeholder="••••••••"
                value={passwordData.password}
                onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
              <input 
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                type="password" required placeholder="••••••••"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
              />
            </div>
            <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20">
              {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center border-t pt-6 border-gray-100">
          <Link to="/login" className="text-sm text-gray-600 font-medium hover:text-primary transition-colors flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;