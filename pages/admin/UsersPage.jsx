import React, { useState, useEffect, useRef } from 'react';
import baseAPI from '../api/baseApi';
import toast from 'react-hot-toast';
import { 
  Search, UserPlus, Edit3, Trash2, 
  X, Camera, Loader2, ImagePlus 
} from 'lucide-react';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [editMode, setEditMode] = useState('create');
  const imageInputRef = useRef(null);

  const [search, setSearch] = useState('');
  const [filterAdmin, setFilterAdmin] = useState('');

  const [selectedUser, setSelectedUser] = useState({
    username: '', 
    email: '', 
    password: '', 
    isAdmin: false, 
    is_active: true,
    profile: { full_name: '', phone: '', avatar: '' }
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search;
      if (filterAdmin !== '') params.is_admin = filterAdmin;

      const response = await baseAPI.get('/admin/users', { params });
      setUsers(response.data);
    } catch (error) {
      toast.error("Lỗi đồng bộ danh sách thành viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filterAdmin]); 

  const handleOpenDrawer = (mode, user = null) => {
    setEditMode(mode);
    if (user) {
      setSelectedUser({
        ...user,
        profile: user.profile || { full_name: '', phone: '', avatar: '' }
      });
    } else {
      setSelectedUser({
        username: '', email: '', password: '', isAdmin: false, is_active: true,
        profile: { full_name: '', phone: '', avatar: '' }
      });
    }
    setShowDrawer(true);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imgload"); 
    const res = await fetch("https://api.cloudinary.com/v1_1/dqmlemao7/image/upload", { 
      method: "POST", 
      body: formData 
    });
    const data = await res.json();
    return data.secure_url;
  };

  const handleAvatarChange = async (file) => {
    const loadId = toast.loading("Đang tải ảnh...");
    try {
      const url = await uploadToCloudinary(file);
      setSelectedUser(prev => ({
        ...prev,
        profile: { ...prev.profile, avatar: url }
      }));
      toast.success("Upload thành công", { id: loadId });
    } catch (error) {
      toast.error("Upload thất bại", { id: loadId });
    }
  };

  const handleSave = async () => {
    if (!selectedUser.username || !selectedUser.email) {
      return toast.error("Vui lòng nhập Username và Email");
    }
    const loadToast = toast.loading("Đang lưu...");
    try {
      const payload = {
        ...selectedUser,
        full_name: selectedUser.profile?.full_name,
        phone: selectedUser.profile?.phone,
        avatar: selectedUser.profile?.avatar
      };

      if (editMode === 'create') {
        await baseAPI.post('/admin/users', payload);
        toast.success("Đã thêm thành viên", { id: loadToast });
      } else {
        await baseAPI.patch(`/admin/users/${selectedUser.id}`, payload);
        toast.success("Đã cập nhật", { id: loadToast });
      }
      setShowDrawer(false);
      fetchUsers();
    } catch (error) {
      toast.error("Lỗi lưu dữ liệu", { id: loadToast });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa tài khoản này?")) return;
    try {
      await baseAPI.delete(`/admin/users/${id}`);
      toast.success("Đã xóa");
      fetchUsers();
    } catch (error) {
      toast.error("Không thể xóa");
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase">Quản lý người dùng</h2>
        <button 
          onClick={() => handleOpenDrawer('create')}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex gap-2"
        >
          <UserPlus size={20} /> Thêm thành viên
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white border rounded-3xl p-5 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            className="w-full h-12 pl-12 pr-4 bg-slate-50 border rounded-2xl outline-none focus:border-primary transition-all" 
            placeholder="Tìm theo tên, email, username..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
          />
        </div>
        <select 
          className="h-12 bg-slate-50 border px-6 rounded-2xl font-bold outline-none cursor-pointer"
          value={filterAdmin}
          onChange={(e) => setFilterAdmin(e.target.value)}
        >
          <option value="">Tất cả quyền</option>
          <option value="true">Quản trị viên</option>
          <option value="false">Khách hàng</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr className="text-xs font-black uppercase">
              <th className="p-4 text-center">Ảnh</th>
              <th className="p-4 text-left">Thành viên</th>
              <th className="p-4 text-left">Quyền hạn</th>
              <th className="p-4 text-center">Trạng thái</th>
              <th className="p-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-20 text-center">
                  <Loader2 className="animate-spin m-auto" />
                </td>
              </tr>
            ) : users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-slate-50">
                <td className="p-4 text-center">
                  <img 
                    src={user.profile?.avatar || `https://ui-avatars.com/api/?name=${user.username}`} 
                    className="w-12 h-12 object-cover rounded-xl m-auto border" 
                  />
                </td>
                <td className="p-4">
                  <div className="font-bold">{user.profile?.full_name || user.username}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </td>
                <td className="p-4 text-sm font-semibold">
                  {user.isAdmin ? (
                    <span className="text-purple-600">Quản trị viên</span>
                  ) : (
                    <span className="text-blue-600">Khách hàng</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.is_active ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleOpenDrawer('edit', user)} className="p-2 text-slate-600 hover:text-primary">
                    <Edit3 size={20} />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="p-2 text-red-500">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DRAWER */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowDrawer(false)} />
          <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-50 flex flex-col shadow-xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-black uppercase text-lg">
                {editMode === 'create' ? 'Tạo thành viên' : 'Cập nhật hồ sơ'}
              </h2>
              <X className="cursor-pointer" onClick={() => setShowDrawer(false)} />
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* AVATAR UPLOAD */}
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 border rounded-2xl overflow-hidden bg-slate-50 relative group">
                  <img 
                    src={selectedUser.profile?.avatar || `https://ui-avatars.com/api/?name=${selectedUser.username}`} 
                    className="w-full h-full object-cover" 
                  />
                  <div 
                    onClick={() => imageInputRef.current.click()}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <button 
                  onClick={() => imageInputRef.current.click()}
                  className="border px-4 py-2 rounded-xl font-semibold text-sm hover:bg-slate-50"
                >
                  Thay đổi ảnh
                </button>
                <input 
                  type="file" ref={imageInputRef} hidden accept="image/*" 
                  onChange={(e) => e.target.files[0] && handleAvatarChange(e.target.files[0])} 
                />
              </div>

              {/* INPUT FIELDS */}
              <div className="space-y-4">
                <div>
                  <label className="font-bold text-sm block mb-1">Username</label>
                  <input 
                    className="w-full border p-3 rounded-xl font-bold outline-none focus:border-primary disabled:bg-slate-100" 
                    value={selectedUser.username} 
                    onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})} 
                    disabled={editMode === 'edit'} 
                  />
                </div>
                
                {editMode === 'create' && (
                  <div>
                    <label className="font-bold text-sm block mb-1">Mật khẩu</label>
                    <input 
                      type="password"
                      className="w-full border p-3 rounded-xl font-bold outline-none focus:border-primary" 
                      onChange={(e) => setSelectedUser({...selectedUser, password: e.target.value})} 
                    />
                  </div>
                )}

                <div>
                  <label className="font-bold text-sm block mb-1">Họ và tên</label>
                  <input 
                    className="w-full border p-3 rounded-xl font-bold outline-none focus:border-primary" 
                    value={selectedUser.profile?.full_name} 
                    onChange={(e) => setSelectedUser({...selectedUser, profile: {...selectedUser.profile, full_name: e.target.value}})} 
                  />
                </div>

                <div>
                  <label className="font-bold text-sm block mb-1">Email</label>
                  <input 
                    className="w-full border p-3 rounded-xl font-bold outline-none focus:border-primary" 
                    value={selectedUser.email} 
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})} 
                  />
                </div>

                {/* TOGGLES */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" id="isAdmin" className="w-5 h-5"
                      checked={selectedUser.isAdmin}
                      onChange={(e) => setSelectedUser({...selectedUser, isAdmin: e.target.checked})}
                    />
                    <label htmlFor="isAdmin" className="font-bold text-sm cursor-pointer">Quyền Admin</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" id="isActive" className="w-5 h-5"
                      checked={selectedUser.is_active}
                      onChange={(e) => setSelectedUser({...selectedUser, is_active: e.target.checked})}
                    />
                    <label htmlFor="isActive" className="font-bold text-sm cursor-pointer">Đang hoạt động</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex gap-4 bg-slate-50">
              <button 
                onClick={() => setShowDrawer(false)}
                className="flex-1 bg-white border rounded-xl py-3 font-bold hover:bg-slate-100 transition-all"
              >
                Hủy
              </button>
              <button 
                onClick={handleSave}
                className="flex-[2] bg-primary text-white rounded-xl py-3 font-bold hover:bg-primary/90 transition-all shadow-lg"
              >
                Lưu hồ sơ
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};