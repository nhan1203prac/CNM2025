import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import baseAPI from "../api/baseApi";
import toast from "react-hot-toast";
// 1. Import untils và Context
import { untils } from '../../languages/untils';

const VerifyEmail = () => {
  // 2. Kích hoạt hook

  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const email = location.state?.email || "";

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length < 6) {
      // Map text lỗi
      toast.error(untils.mess("verifyEmail.toast.incomplete_code"));
      return;
    }

    setLoading(true);
    try {
      await baseAPI.post("/auth/verify-email", {
        verification_code: verificationCode,
      });
      // Map text thành công
      toast.success(untils.mess("verifyEmail.toast.success"));
      navigate("/login");
    } catch (error) {
       // Xử lý lỗi nếu cần
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      // Map text lỗi
      toast.error(untils.mess("verifyEmail.toast.no_email"));
      return;
    }
    setResendLoading(true);
    try {
      await baseAPI.post("/auth/send-verification", { email });
      // Map text thành công
      toast.success(untils.mess("verifyEmail.toast.resend_success"));
    } catch (error) {
       // Xử lý lỗi nếu cần
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
        <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl">
            mark_email_unread
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#181411] mb-2">
          {untils.mess("verifyEmail.title")}
        </h1>
        <p className="text-gray-500 mb-8">
          {untils.mess("verifyEmail.desc")} <br />
          <span className="font-semibold text-gray-800">
            {email || untils.mess("verifyEmail.default_email")}
          </span>
        </p>

        <form onSubmit={handleVerify}>
          <div className="flex justify-between gap-2 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/20 ${
              loading ? "opacity-70" : "hover:bg-primary/90"
            }`}
          >
            {loading 
                ? untils.mess("verifyEmail.btn_verifying") 
                : untils.mess("verifyEmail.btn_verify")}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            {untils.mess("verifyEmail.footer_text")}{" "}
            <button
              onClick={handleResendCode}
              disabled={resendLoading}
              className="text-primary font-bold hover:underline disabled:opacity-50"
            >
              {resendLoading 
                ? untils.mess("verifyEmail.btn_resending") 
                : untils.mess("verifyEmail.btn_resend")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;