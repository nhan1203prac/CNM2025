import React, { useState, useRef, useEffect } from 'react';
import AccountLayout from '../components/account/AccountLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast'; 
// 1. Import untils và Context
import { untils } from '../../../languages/untils';

const Profile = () => {
  // 2. Kích hoạt hook

  const { user, checkAuth } = useAuth();
  const fileInputRef = useRef(null);
  
  const [previewImage, setPreviewImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    gender: 'Nam',
    dob: '',
    avatarUrl: '' 
  });

  // Đồng bộ dữ liệu từ Context vào Form
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user?.profile?.full_name || '',
        email: user?.email || '',
        phone: user?.profile?.phone || '', 
        gender: user?.profile?.gender || 'Nam',
        dob: user?.profile?.dob || '', 
        avatarUrl: user?.profile?.avatar || ''
      });
      setPreviewImage(user?.profile?.avatar || '');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý upload ảnh lên Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error(untils.mess("profile.toast.file_too_large"));
      return;
    }

    const toastId = toast.loading(untils.mess("profile.toast.uploading")); 
    setIsUploading(true);
    setPreviewImage(URL.createObjectURL(file));

    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', 'imgload'); 

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dqmlemao7/image/upload`,
        formDataCloud
      );

      const uploadedUrl = res.data.secure_url;
      setFormData(prev => ({ ...prev, avatarUrl: uploadedUrl }));
      setPreviewImage(uploadedUrl);
      
      toast.success(untils.mess("profile.toast.upload_success"), { id: toastId }); 
    } catch (error) {
      console.error("Lỗi upload Cloudinary:", error);
      toast.error(untils.mess("profile.toast.upload_fail"), { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  // Xử lý lưu thông tin về Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return toast.error(untils.mess("profile.toast.wait_upload"));

    const toastId = toast.loading(untils.mess("profile.toast.updating"));
    const API_URL = 'http://localhost:8000/api/v1/auth/users/profile';
    const token = localStorage.getItem('token');

    const updateData = {
      full_name: formData.fullname.trim() || null, 
      phone: formData.phone.trim() || null,
      gender: formData.gender,
      dob: formData.dob === "" ? null : formData.dob, 
      avatar: formData.avatarUrl || null 
    };

    try {
      await axios.put(API_URL, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success(untils.mess("profile.toast.update_success"), { id: toastId });
      
      if (checkAuth) await checkAuth();

    } catch (error) {
      console.error("Lỗi 422 chi tiết:", error.response?.data);
      const errorMsg = error.response?.data?.detail?.[0]?.msg || untils.mess("profile.toast.update_error");
      toast.error(errorMsg, { id: toastId });
    }
  };

  // Cấu hình giới tính để map ngôn ngữ (value giữ nguyên, label thay đổi)
  const genderOptions = [
    { value: 'Nam', labelKey: 'profile.gender_options.male' },
    { value: 'Nữ', labelKey: 'profile.gender_options.female' },
    { value: 'Khác', labelKey: 'profile.gender_options.other' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-[#f4f2f0]">
        <h2 className="text-[#181411] text-3xl font-bold mb-2">
            {untils.mess("profile.title")}
        </h2>
        <p className="text-[#897261] text-base">
            {untils.mess("profile.subtitle")}
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* AVATAR SECTION */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group cursor-pointer" onClick={() => !isUploading && fileInputRef.current.click()}>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <div className="w-32 h-32 relative">
              <img
                src={previewImage || "https://www.gravatar.com/avatar/0?d=mp"}
                alt="avatar"
                className={`w-32 h-32 rounded-full object-cover border-4 border-[#f8f7f6] shadow-inner ${isUploading ? 'opacity-40' : ''}`}
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {!isUploading && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-[10px] font-bold">
                    {untils.mess("profile.avatar.overlay_change")}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <h3 className="text-[#181411] text-lg font-bold">
                {untils.mess("profile.avatar.label")}
            </h3>
            <p className="text-xs text-gray-500 italic">
                {untils.mess("profile.avatar.helper")}
            </p>
            <button 
              type="button" 
              onClick={() => fileInputRef.current.click()} 
              className="px-6 py-2 rounded-lg bg-[#f4f2f0] hover:bg-[#e6e0db] text-sm font-bold transition-colors disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading 
                ? untils.mess("profile.avatar.processing") 
                : untils.mess("profile.avatar.btn_change")}
            </button>
          </div>
        </div>

        <hr className="border-[#f4f2f0]"/>

        {/* FORM SECTION */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">{untils.mess("profile.form.fullname")}</label>
            <input name="fullname" onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#e6e0db] focus:ring-2 focus:ring-orange-500 outline-none" type="text" value={formData.fullname} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-400">{untils.mess("profile.form.email")}</label>
            <input className="w-full h-12 px-4 rounded-lg border border-[#e6e0db] bg-gray-50 text-gray-400 cursor-not-allowed" disabled value={formData.email} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">{untils.mess("profile.form.phone")}</label>
            <input name="phone" onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#e6e0db] focus:ring-2 focus:ring-orange-500 outline-none" type="text" value={formData.phone} />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold">{untils.mess("profile.form.gender")}</label>
            <div className="flex gap-6 h-12 items-center">
              {genderOptions.map(g => (
                <label key={g.value} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    value={g.value} 
                    checked={formData.gender === g.value} 
                    onChange={handleChange} 
                    className="w-5 h-5 accent-orange-600" 
                  />
                  <span className="text-sm">{untils.mess(g.labelKey)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">{untils.mess("profile.form.dob")}</label>
            <input name="dob" onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#e6e0db] focus:ring-2 focus:ring-orange-500 outline-none" type="date" value={formData.dob} />
          </div>

          <div className="md:col-span-2 pt-4 flex justify-end">
            <button 
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-12 rounded-lg shadow-md transition-all disabled:bg-gray-400 active:scale-95" 
              type="submit"
              disabled={isUploading}
            >
              {untils.mess("profile.form.btn_save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;