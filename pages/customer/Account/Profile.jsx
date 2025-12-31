
import React, { useState } from 'react';
import AccountLayout from '../components/account/AccountLayout';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || 'Nam',
    dob: user?.dob || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AccountLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-[#f4f2f0]">
          <h2 className="text-[#181411] text-3xl font-bold leading-tight tracking-tight mb-2">Thông Tin Tài Khoản</h2>
          <p className="text-[#897261] text-base">Quản lý thông tin hồ sơ để bảo mật tài khoản.</p>
        </div>
        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col gap-4 items-center md:items-start shrink-0">
              <div className="relative group cursor-pointer">
                <div 
                  className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 shadow-inner border-4 border-[#f8f7f6]" 
                  style={{ backgroundImage: `url("${user?.avatar}")` }}
                ></div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white">edit</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center flex-1">
              <div className="flex flex-col">
                <h3 className="text-[#181411] text-lg font-bold">Ảnh đại diện</h3>
                <p className="text-[#897261] text-sm mt-1">Dung lượng file tối đa 1MB.</p>
                <p className="text-[#897261] text-sm">Định dạng: .JPEG, .PNG</p>
              </div>
              <div className="mt-2">
                <button className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-[#f4f2f0] hover:bg-[#e6e0db] text-[#181411] text-sm font-bold transition-colors">
                  <span className="material-symbols-outlined text-base mr-2">upload</span>
                  Chọn ảnh
                </button>
              </div>
            </div>
          </div>
          <hr className="border-[#f4f2f0]"/>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#181411] text-sm font-bold">Tên đăng nhập</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#897261]">
                  <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                </span>
                <input className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#e6e0db] bg-[#f8f7f6] text-[#897261] text-sm focus:ring-0 cursor-not-allowed font-medium" disabled type="text" value={user?.username} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#181411] text-sm font-bold">Họ và tên</label>
              <input 
                name="name"
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-[#e6e0db] bg-white text-[#181411] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-[#897261] font-medium transition-all" 
                type="text" 
                value={formData.name} 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#181411] text-sm font-bold">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#897261]">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </span>
                <input 
                  name="email"
                  onChange={handleChange}
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#e6e0db] bg-white text-[#181411] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-medium transition-all" 
                  type="email" 
                  value={formData.email} 
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#181411] text-sm font-bold">Số điện thoại</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#897261]">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </span>
                <input 
                  name="phone"
                  onChange={handleChange}
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#e6e0db] bg-white text-[#181411] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-medium transition-all" 
                  type="tel" 
                  value={formData.phone} 
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#181411] text-sm font-bold">Giới tính</label>
              <div className="flex gap-6 h-12 items-center">
                {['Nam', 'Nữ', 'Khác'].map(g => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="gender" 
                      value={g} 
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="form-radio text-primary focus:ring-primary border-gray-300 w-5 h-5" 
                    />
                    <span className="text-[#181411] text-sm font-medium group-hover:text-primary transition-colors">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#181411] text-sm font-bold">Ngày sinh</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#897261]">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </span>
                <input 
                  name="dob"
                  onChange={handleChange}
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#e6e0db] bg-white text-[#181411] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-medium transition-all" 
                  type="date" 
                  value={formData.dob} 
                />
              </div>
            </div>
            <div className="md:col-span-2 pt-4 flex justify-end">
              <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-[#d66c22] shadow-md shadow-orange-200 text-white text-base font-bold transition-all transform hover:translate-y-[-1px]" type="button">
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
