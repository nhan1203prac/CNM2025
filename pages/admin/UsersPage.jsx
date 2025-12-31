
import React, { useState } from 'react';
import { USERS_LIST } from '../../constants';
import { UserRole, UserStatus } from '../../type';

const RoleBadge = ({ role }) => {
  const styles = {
    [UserRole.ADMIN]: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    [UserRole.EDITOR]: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    [UserRole.CUSTOMER]: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[role]}`}>
      {role}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    [UserStatus.ACTIVE]: 'bg-emerald-500/10 text-emerald-500',
    [UserStatus.INACTIVE]: 'bg-slate-500/10 text-slate-400',
    [UserStatus.BANNED]: 'bg-red-500/10 text-red-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${styles[status]}`}>
      <span className={`size-1.5 rounded-full ${status === UserStatus.ACTIVE ? 'bg-emerald-500' : status === UserStatus.BANNED ? 'bg-red-500' : 'bg-slate-400'}`}></span>
      {status}
    </span>
  );
};

export const UsersPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowDrawer(true);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Người dùng</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium">Quản lý danh sách thành viên và phân quyền hệ thống.</p>
        </div>
        <button 
          onClick={() => { setSelectedUser({}); setShowDrawer(true); }}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Thêm người dùng
        </button>
      </div>

      {/* User Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tổng người dùng', value: '4,285', icon: 'group', color: 'text-blue-500' },
          { label: 'Đang hoạt động', value: '1,120', icon: 'online_prediction', color: 'text-emerald-500' },
          { label: 'Thành viên mới', value: '84', icon: 'new_releases', color: 'text-purple-500' },
          { label: 'Bị khóa', value: '12', icon: 'block', color: 'text-red-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1c2127] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#111418] flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-[#1c2127] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="w-full pl-10 pr-4 h-11 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-400 dark:text-white" 
            placeholder="Tìm kiếm theo tên, email..." 
          />
        </div>
        <div className="flex gap-3">
          <select className="h-11 px-4 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 outline-none">
            <option>Tất cả quyền</option>
            <option>Quản trị viên</option>
            <option>Khách hàng</option>
          </select>
          <button className="h-11 px-6 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">tune</span>
            Lọc
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1c2127] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-dark/50 border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <th className="px-6 py-4">Thành viên</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Ngày tham gia</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {USERS_LIST.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50 dark:hover:bg-surface-dark/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="size-11 rounded-full border-2 border-primary/10 overflow-hidden">
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer">{user.name}</span>
                        <span className="text-[11px] font-medium text-slate-500">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Drawer */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => setShowDrawer(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-[#1c2127] shadow-2xl z-[70] transform translate-x-0 transition-transform duration-300 border-l border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#1c2127]">
              <h2 className="text-xl font-black dark:text-white">{selectedUser.id ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}</h2>
              <button onClick={() => setShowDrawer(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="size-28 rounded-full border-4 border-slate-100 dark:border-[#111418] shadow-lg relative group">
                    <img 
                      src={selectedUser.avatarUrl || 'https://i.pravatar.cc/150?u=default'} 
                      className="w-full h-full rounded-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <span className="material-symbols-outlined text-white">camera_alt</span>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-primary hover:underline">Thay đổi ảnh đại diện</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Họ và tên</label>
                    <input 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20" 
                      defaultValue={selectedUser.name}
                      placeholder="VD: Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                    <input 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20" 
                      defaultValue={selectedUser.email}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Vai trò</label>
                      <select className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-bold outline-none">
                        {Object.values(UserRole).map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Trạng thái</label>
                      <select className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-bold outline-none">
                        {Object.values(UserStatus).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111418]">
              <div className="flex gap-3">
                <button onClick={() => setShowDrawer(false)} className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold shadow-sm">Hủy</button>
                <button className="flex-[2] py-3 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all">Lưu thông tin</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
