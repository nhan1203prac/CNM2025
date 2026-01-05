import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import baseAPI from '../api/baseApi';
import toast from 'react-hot-toast';
// 1. Import
import { untils } from "../../languages/untils";

const ForgotPassword = () => {
  // 2. Kích hoạt hook
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
      // Map toast
      toast.success(untils.mess("forgotPassword.toast.sent"));
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
      // Map toast
      toast.success(untils.mess("forgotPassword.toast.resent"));
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
      // Map toast error
      return toast.error(untils.mess("forgotPassword.toast.mismatch"));
    }

    setLoading(true);
    try {
      await baseAPI.post("/auth/reset-password", {
        token: otp.join(''),
        new_password: passwordData.password
      });
      // Map toast success
      toast.success(untils.mess("forgotPassword.toast.success"));
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
            {step === 1 && untils.mess("forgotPassword.step1.title")}
            {step === 2 && untils.mess("forgotPassword.step2.title")}
            {step === 3 && untils.mess("forgotPassword.step3.title")}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {step === 1 && untils.mess("forgotPassword.step1.desc")}
            {step === 2 && `${untils.mess("forgotPassword.step2.desc_prefix")} ${email}`}
            {step === 3 && untils.mess("forgotPassword.step3.desc")}
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendEmail} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {untils.mess("forgotPassword.step1.email_label")}
              </label>
              <input 
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
                type="email" required 
                placeholder={untils.mess("forgotPassword.step1.placeholder")}
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              {loading 
                ? untils.mess("forgotPassword.step1.btn_sending") 
                : untils.mess("forgotPassword.step1.btn_continue")}
            </button>
          </form>
        )}

        {/* STEP 2 */}
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
                 {resendLoading 
                    ? untils.mess("forgotPassword.step2.resend.loading") 
                    : canResend 
                        ? untils.mess("forgotPassword.step2.resend.btn") 
                        : `${untils.mess("forgotPassword.step2.resend.wait_prefix")} ${timer}s`}
              </button>
            </div>

            <button onClick={() => setStep(3)} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              {untils.mess("forgotPassword.step2.btn_verify")}
            </button>
            <button onClick={() => setStep(1)} className="w-full text-gray-500 text-sm hover:underline font-medium">
              {untils.mess("forgotPassword.step2.btn_change_email")}
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {untils.mess("forgotPassword.step3.new_pass_label")}
              </label>
              <input 
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                type="password" required placeholder="••••••••"
                value={passwordData.password}
                onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {untils.mess("forgotPassword.step3.confirm_pass_label")}
              </label>
              <input 
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-primary outline-none" 
                type="password" required placeholder="••••••••"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
              />
            </div>
            <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20">
               {loading 
                ? untils.mess("forgotPassword.step3.btn_processing") 
                : untils.mess("forgotPassword.step3.btn_update")}
            </button>
          </form>
        )}

        <div className="mt-8 text-center border-t pt-6 border-gray-100">
          <Link to="/login" className="text-sm text-gray-600 font-medium hover:text-primary transition-colors flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {untils.mess("forgotPassword.back_to_login")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;