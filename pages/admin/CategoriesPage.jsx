
import React, { useState } from 'react';
import { CATEGORIES_LIST } from '../constants';

export const CategoriesPage= () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editMode, setEditMode] = useState('create');
  const [selectedCategory, setSelectedCategory] = useState({});

  const handleOpenDrawer = (mode, category) => {
    setEditMode(mode);
    setSelectedCategory(category || { name: '', slug: '', status: 'Hiển thị', productCount: 0 });
    setShowDrawer(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Heading & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-white text-3xl font-black tracking-tight">Danh mục sản phẩm</h2>
          <p className="text-slate-500 dark:text-slate-400 text-base font-medium">Quản lý, chỉnh sửa và tổ chức các danh mục hàng hóa trên hệ thống.</p>
        </div>
        <button 
          onClick={() => handleOpenDrawer('create')}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/30"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Tạo mới</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-surface-dark/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input 
            className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all" 
            placeholder="Tìm kiếm danh mục..." 
            type="text" 
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select className="block w-full md:w-auto pl-4 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer font-semibold">
            <option>Tất cả trạng thái</option>
            <option>Đang hiển thị</option>
            <option>Đang ẩn</option>
          </select>
          <button className="flex items-center justify-center p-2.5 bg-slate-100 dark:bg-[#111418] text-slate-500 dark:text-slate-400 hover:text-white rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-400 transition-all">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-white dark:bg-[#1c2127] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-dark/50 border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 w-16">
                  <input className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111418] text-primary focus:ring-0" type="checkbox"/>
                </th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Hình ảnh</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Tên danh mục</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Slug</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Sản phẩm</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Trạng thái</th>
                <th className="py-4 px-6 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {CATEGORIES_LIST.map((cat) => (
                <tr key={cat.id} className="group hover:bg-slate-50 dark:hover:bg-surface-dark/40 transition-colors cursor-pointer">
                  <td className="py-4 px-6">
                    <input className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111418] text-primary focus:ring-0" type="checkbox"/>
                  </td>
                  <td className="py-4 px-6">
                    <div className="size-12 rounded-xl bg-slate-100 dark:bg-surface-dark flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                      <img alt={cat.name} className="w-full h-full object-cover" src={cat.imageUrl} />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{cat.name}</span>
                      <span className="text-[11px] font-medium text-slate-500">ID: {cat.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-[11px] bg-slate-100 dark:bg-surface-dark px-2 py-1 rounded-lg text-slate-600 dark:text-slate-400 font-mono font-semibold">
                      {cat.slug}
                    </code>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{cat.productCount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${
                      cat.status === 'Hiển thị' 
                        ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenDrawer('edit', cat); }}
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-surface-dark/20">
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Hiển thị <span className="font-bold text-slate-900 dark:text-white">1</span> đến <span className="font-bold text-slate-900 dark:text-white">{CATEGORIES_LIST.length}</span> trong tổng số <span className="font-bold text-slate-900 dark:text-white">12</span> kết quả
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-sm rounded-xl bg-white dark:bg-surface-dark text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary disabled:opacity-50 transition-all font-bold shadow-sm" disabled>
              Trước
            </button>
            <button className="px-4 py-1.5 text-sm rounded-xl bg-primary text-white border border-primary font-black shadow-lg shadow-primary/20">
              1
            </button>
            <button className="px-4 py-1.5 text-sm rounded-xl bg-white dark:bg-surface-dark text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary transition-all font-bold shadow-sm">
              2
            </button>
            <button className="px-4 py-1.5 text-sm rounded-xl bg-white dark:bg-surface-dark text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary transition-all font-bold shadow-sm">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Form Drawer */}
      {showDrawer && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
            onClick={() => setShowDrawer(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-[#1c2127] shadow-2xl z-[70] transform translate-x-0 transition-transform duration-300 ease-out border-l border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#1c2127]">
              <h2 className="text-xl font-black dark:text-white">
                {editMode === 'create' ? 'Thêm danh mục mới' : 'Chỉnh sửa danh mục'}
              </h2>
              <button 
                onClick={() => setShowDrawer(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div className="space-y-6">
                {/* Image Upload Mockup */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Hình ảnh đại diện</label>
                  <div className="flex items-center gap-6">
                    <div className="size-24 rounded-2xl bg-slate-100 dark:bg-[#111418] border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden group hover:border-primary transition-all cursor-pointer">
                      {selectedCategory.imageUrl ? (
                        <img src={selectedCategory.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-slate-400 text-3xl group-hover:text-primary">add_a_photo</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                        Tải ảnh lên
                      </button>
                      <p className="text-[10px] text-slate-500 font-medium">Định dạng JPG, PNG. Tối đa 2MB.</p>
                    </div>
                  </div>
                </div>

                {/* Name & Slug */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tên danh mục</label>
                    <input 
                      type="text"
                      name="name"
                      value={selectedCategory.name}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-semibold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="VD: Điện thoại di động"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Slug (Đường dẫn)</label>
                    <div className="relative">
                      <input 
                        type="text"
                        name="slug"
                        value={selectedCategory.slug}
                        onChange={handleInputChange}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-mono font-semibold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="dien-thoai-di-dong"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold uppercase">Tự động</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Trạng thái hiển thị</label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedCategory.status === 'Hiển thị' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}>
                      <input 
                        type="radio" 
                        name="status" 
                        value="Hiển thị" 
                        checked={selectedCategory.status === 'Hiển thị'} 
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                      <span className="text-sm font-bold">Hiển thị</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedCategory.status === 'Đang ẩn' 
                        ? 'border-slate-400 bg-slate-500/5 text-slate-700 dark:text-slate-300' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}>
                      <input 
                        type="radio" 
                        name="status" 
                        value="Đang ẩn" 
                        checked={selectedCategory.status === 'Đang ẩn'} 
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                      <span className="text-sm font-bold">Tạm ẩn</span>
                    </label>
                  </div>
                </div>

                {/* Description Mockup */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Mô tả (Không bắt buộc)</label>
                  <textarea 
                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all h-24 resize-none"
                    placeholder="Nhập mô tả cho danh mục này..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111418]">
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDrawer(false)}
                  className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  Hủy
                </button>
                <button 
                  className="flex-[2] py-3 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all"
                >
                  {editMode === 'create' ? 'Tạo danh mục' : 'Cập nhật'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
