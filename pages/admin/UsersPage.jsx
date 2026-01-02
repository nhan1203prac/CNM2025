import React, { useState, useEffect } from 'react';
import baseAPI from '../api/baseApi';
import toast from 'react-hot-toast';
import { 
  Search, UserPlus, Edit3, Trash2, 
  X, Camera, Shield, Mail, Phone, Loader2,
  UserCheck, UserX, Info
} from 'lucide-react';

// --- COMPONENTS CON ---
const RoleBadge = ({ isAdmin }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
    isAdmin 
    ? 'bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-sm' 
    : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  }`}>
    {isAdmin ? 'Quản trị viên' : 'Khách hàng'}
  </span>
);

const StatusBadge = ({ isActive }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
    isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
  }`}>
    <span className={`size-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
    {isActive ? 'Hoạt động' : 'Đã khóa'}
  </span>
);

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [editMode, setEditMode] = useState('create');

  const [search, setSearch] = useState('');
  const [filterAdmin, setFilterAdmin] = useState('');

  const [selectedUser, setSelectedUser] = useState({
    username: '', email: '', password: '', isAdmin: false, is_active: true,
    profile: { full_name: '', phone: '', gender: 'Nam', dob: '', avatar: '' }
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
        profile: user.profile || { full_name: '', phone: '', gender: 'Nam', avatar: '' }
      });
    } else {
      setSelectedUser({
        username: '', email: '', password: '', isAdmin: false, is_active: true,
        profile: { full_name: '', phone: '', gender: 'Nam', avatar: '' }
      });
    }
    setShowDrawer(true);
  };

  const handleSave = async () => {
    if (!selectedUser.username || !selectedUser.email) {
      return toast.error("Vui lòng điền các thông tin bắt buộc");
    }

    const loadToast = toast.loading("Đang xử lý hồ sơ...");
    try {
      const payload = {
        ...selectedUser,
        full_name: selectedUser.profile?.full_name,
        phone: selectedUser.profile?.phone,
        gender: selectedUser.profile?.gender,
        avatar: selectedUser.profile?.avatar
      };

      if (editMode === 'create') {
        await baseAPI.post('/admin/users', payload);
        toast.success("Thêm thành viên thành công", { id: loadToast });
      } else {
        await baseAPI.patch(`/admin/users/${selectedUser.id}`, payload);
        toast.success("Cập nhật hồ sơ thành công", { id: loadToast });
      }
      setShowDrawer(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Có lỗi xảy ra", { id: loadToast });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa vĩnh viễn tài khoản này?")) return;
    try {
      await baseAPI.delete(`/admin/users/${id}`);
      toast.success("Đã xóa tài khoản");
      fetchUsers();
    } catch (error) {
      toast.error("Không thể xóa người dùng");
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Header - Phông chữ giống Product */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase italic">Người dùng</h1>
          <p className="text-slate-500 text-sm font-bold italic mt-1 tracking-tight">Điều hành và phân quyền hệ thống tài khoản.</p>
        </div>
        <button 
          onClick={() => handleOpenDrawer('create')}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/30 hover:scale-105 transition-all"
        >
          <UserPlus size={18} /> Thêm thành viên
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 flex gap-4 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary" size={18} />
          <input 
            className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 font-bold text-sm" 
            placeholder="Tìm theo tên, email, username... (Nhấn Enter)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
          />
        </div>
        <select 
          className="h-12 bg-slate-50 border px-6 rounded-2xl font-bold cursor-pointer text-sm outline-none text-slate-600"
          value={filterAdmin}
          onChange={(e) => setFilterAdmin(e.target.value)}
        >
          <option value="">Tất cả quyền</option>
          <option value="true">Quản trị viên</option>
          <option value="false">Khách hàng</option>
        </select>
      </div>

      {/* Table - Style bảng giống Product */}
      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-8 py-6">Thành viên</th>
                <th className="px-6 py-6">Vai trò</th>
                <th className="px-6 py-6">Liên hệ</th>
                <th className="px-6 py-6 text-center">Trạng thái</th>
                <th className="px-8 py-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-24 text-center">
                    <Loader2 className="animate-spin text-primary m-auto mb-4" size={32} />
                    <span className="font-black text-slate-400 uppercase text-[10px] tracking-widest italic">Đang tải dữ liệu...</span>
                  </td>
                </tr>
              ) : users.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                        <img src={user.profile?.avatar || `https://ui-avatars.com/api/?name=${user.username}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black uppercase text-slate-900 tracking-tight">{user.profile?.full_name || user.username}</span>
                        <code className="text-[10px] text-primary font-bold italic">@{user.username}</code>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5"><RoleBadge isAdmin={user.isAdmin} /></td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1 font-bold text-xs text-slate-600">
                      <span className="flex items-center gap-2 tracking-tight"><Mail size={12} className="text-slate-400"/> {user.email}</span>
                      {user.profile?.phone && <span className="flex items-center gap-2 text-[10px] text-slate-400 tracking-widest italic"><Phone size={10}/> {user.profile.phone}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center"><StatusBadge isActive={user.is_active} /></td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenDrawer('edit', user)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(user.id)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer - Labels giống hệt Product */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] animate-in fade-in" onClick={() => setShowDrawer(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-[70] flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-xl font-black uppercase italic tracking-widest">{editMode === 'create' ? 'Thành viên mới' : 'Cập nhật hồ sơ'}</h2>
              <X className="cursor-pointer text-slate-400" onClick={() => setShowDrawer(false)} size={24} />
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
              <div className="flex flex-col items-center gap-4">
                <div className="size-28 rounded-[32px] border-4 border-slate-50 shadow-xl relative group overflow-hidden">
                  <img src={selectedUser.profile?.avatar || `https://ui-avatars.com/api/?name=${selectedUser.username}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer" onClick={() => {const u = prompt("Nhập URL ảnh:"); if(u) setSelectedUser({...selectedUser, profile: {...selectedUser.profile, avatar: u}})}} >
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[3px] text-primary italic">Dữ liệu tài khoản</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Username</label>
                      <input className="w-full h-12 px-5 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none" value={selectedUser.username} onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})} disabled={editMode === 'edit'} />
                    </div>
                    {editMode === 'create' && (
                      <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Mật khẩu khởi tạo</label>
                        <input className="w-full h-12 px-5 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none" type="password" onChange={(e) => setSelectedUser({...selectedUser, password: e.target.value})} />
                      </div>
                    )}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[3px] text-primary italic">Hồ sơ cá nhân</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Họ và tên</label>
                      <input className="w-full h-12 px-5 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none" value={selectedUser.profile?.full_name} onChange={(e) => setSelectedUser({...selectedUser, profile: {...selectedUser.profile, full_name: e.target.value}})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email</label>
                      <input className="w-full h-12 px-5 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none" value={selectedUser.email} onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Số điện thoại</label>
                      <input className="w-full h-12 px-5 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none" value={selectedUser.profile?.phone} onChange={(e) => setSelectedUser({...selectedUser, profile: {...selectedUser.profile, phone: e.target.value}})} />
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[3px] text-primary italic">Trạng thái & Quyền</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setSelectedUser({...selectedUser, isAdmin: !selectedUser.isAdmin})}
                      className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${selectedUser.isAdmin ? 'border-purple-500 bg-purple-500/5 text-purple-600' : 'border-slate-100 text-slate-400'}`}
                    >
                      <Shield size={16}/> Quản trị
                    </button>
                    <button 
                      onClick={() => setSelectedUser({...selectedUser, is_active: !selectedUser.is_active})}
                      className={`h-14 rounded-2xl border-2 flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${selectedUser.is_active ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600' : 'border-slate-100 text-slate-400'}`}
                    >
                      {selectedUser.is_active ? <UserCheck size={16}/> : <UserX size={16}/>} {selectedUser.is_active ? 'Hoạt động' : 'Đã khóa'}
                    </button>
                  </div>
                </section>
              </div>
            </div>

            <div className="p-8 border-t bg-slate-50 flex gap-4">
              <button onClick={() => setShowDrawer(false)} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest">Hủy</button>
              <button onClick={handleSave} className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all italic">Lưu hồ sơ</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};