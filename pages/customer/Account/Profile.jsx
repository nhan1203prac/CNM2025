import React, { useState, useRef, useEffect } from 'react';
import AccountLayout from '../components/account/AccountLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, profile, login } = useAuth(); 
  
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('');
  
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    gender: 'Nam',
    dob: '',
    avatarFile: null
  });

  useEffect(() => {
    if (user || profile) {
      setFormData({
        fullname: user?.profile?.full_name || '',
        email: user?.email || '',
        phone: user?.profile?.phone || '', 
        gender: user?.profile?.gender || 'Nam',
        dob: user?.profile?.dob || '',
        avatarFile: null
      });
      setPreviewImage(user?.profile?.avatar || '');
    }
  }, [user, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File quá lớn! Vui lòng chọn ảnh dưới 1MB.");
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, avatarFile: file }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const API_URL = 'http://localhost:8000/api/v1/auth/users/profile';

  const updateData = {
    full_name: formData.fullname,
    phone: formData.phone,
    gender: formData.gender,
    dob: formData.dob,
    avatar: previewImage 
  };

  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(API_URL, updateData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      alert("Cập nhật thông tin thành công!");
    }
  } catch (error) {
    console.error("Lỗi cập nhật profile:", error.response);
    alert("Lỗi: " + (error.response?.data?.detail || "Không tìm thấy đường dẫn API"));
  }
};
  return (
    <AccountLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-[#f4f2f0]">
          <h2 className="text-[#181411] text-3xl font-bold mb-2">Thông Tin Tài Khoản</h2>
          <p className="text-[#897261] text-base">Quản lý thông tin hồ sơ để bảo mật tài khoản.</p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group cursor-pointer" onClick={handleUploadClick}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <img
                src={previewImage || "https://www.gravatar.com/avatar/0?d=mp"}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#f8f7f6] shadow-inner"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">SỬA</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <h3 className="text-[#181411] text-lg font-bold">Ảnh đại diện</h3>
              <button type="button" onClick={handleUploadClick} className="px-6 py-2 rounded-lg bg-[#f4f2f0] hover:bg-[#e6e0db] text-sm font-bold transition-colors">
                Chọn ảnh
              </button>
            </div>
          </div>

          <hr className="border-[#f4f2f0]"/>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Tên đăng nhập</label>
              <input className="w-full h-12 px-4 rounded-lg bg-[#f8f7f6] border border-[#e6e0db] text-gray-500" disabled value={user?.username || ''} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Họ và tên</label>
              <input name="fullname" onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#e6e0db]" type="text" value={formData.fullname} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Email</label>
              <input className="w-full h-12 px-4 rounded-lg border border-[#e6e0db] bg-gray-50" disabled value={formData.email} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Số điện thoại</label>
              <input name="phone" onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#e6e0db]" type="text" value={formData.phone} />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold">Giới tính</label>
              <div className="flex gap-6 h-12 items-center">
                {['Nam', 'Nữ', 'Khác'].map(g => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value={g} 
                      checked={formData.gender === g} 
                      onChange={handleChange} 
                      className="w-5 h-5 accent-orange-600" 
                    />
                    <span className="text-sm">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Ngày sinh</label>
              <input name="dob" onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#e6e0db]" type="date" value={formData.dob} />
            </div>

            <div className="md:col-span-2 pt-4 flex justify-end">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all" type="submit">
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Profile;