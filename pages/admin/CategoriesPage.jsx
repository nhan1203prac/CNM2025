import React, { useState, useEffect } from 'react';
import baseAPI from '../api/baseApi';
import { Edit3, Trash2, Search, Plus, X, ImagePlus, Globe } from 'lucide-react'; 
import toast from 'react-hot-toast';
export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [editMode, setEditMode] = useState('create');
  const [selectedCategory, setSelectedCategory] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    status: 'Hiển thị'
  });

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await baseAPI.get('/admin/categories', {
        params: { search, status: filterStatus }
      });
      setCategories(response.data);
      console.log("categories ",response.data)
    } catch (error) {
      toast.error("Không thể tải danh sách danh mục");
      console.error("Lỗi khi tải danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [filterStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setSelectedCategory(prev => ({ 
        ...prev, 
        name: value, 
        slug: generateSlug(value) 
      }));
    } else {
      setSelectedCategory(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    const payload = {
      name: selectedCategory.name,
      slug: selectedCategory.slug,
      description: selectedCategory.description,
      image_url: selectedCategory.image_url,
      is_active: selectedCategory.status === 'Hiển thị'
    };
    const loadToast = toast.loading("Đang xử lý...")

    try {
      if (editMode === 'create') {
        await baseAPI.post('/admin/categories', payload);
        toast.success("Tạo danh mục mới thành công", { id: loadToast });
      } else {
        await baseAPI.patch(`/admin/categories/${selectedCategory.id}`, payload);
        toast.success("Cập nhật danh mục thành công", { id: loadToast });
      }
      setShowDrawer(false);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Có lỗi xảy ra", { id: loadToast });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      const loadToast = toast.loading("Đang xóa...");
      try {
        await baseAPI.delete(`/admin/categories/${id}`);
        toast.success("Đã xóa danh mục", { id: loadToast });
        fetchCategories();
      } catch (error) {
       toast.error(error.response?.data?.detail || "Lỗi khi xóa", { id: loadToast });
      }
    }
  };

  const handleOpenDrawer = (mode, category = null) => {
    setEditMode(mode);
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory({ name: '', slug: '', description: '', image_url: '', status: 'Hiển thị' });
    }
    setShowDrawer(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-slate-900 dark:text-white text-3xl font-black">Danh mục sản phẩm</h2>
          <p className="text-slate-500 dark:text-slate-400">Quản lý kho hàng và danh mục trực tuyến.</p>
        </div>
        <button 
          onClick={() => handleOpenDrawer('create')}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Tạo mới
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex gap-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" 
            placeholder="Tìm kiếm danh mục... (Nhấn Enter)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchCategories()}
          />
        </div>
        <select 
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white px-8 rounded-xl outline-none font-semibold cursor-pointer"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Hiển thị">Đang hiển thị</option>
          <option value="Đang ẩn">Đang ẩn</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <th className="py-5 px-6">Hình ảnh</th>
                <th className="py-5 px-6">Tên danh mục</th>
                <th className="py-5 px-6">Slug</th>
                <th className="py-5 px-6 text-center">Sản phẩm</th>
                <th className="py-5 px-6">Trạng thái</th>
                <th className="py-5 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan="6" className="py-20 text-center text-slate-400 font-bold uppercase italic tracking-widest">Đang đồng bộ dữ liệu...</td></tr>
              ) : categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                      <img src={cat.imageUrl || '/placeholder-cat.png'} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white uppercase text-xs">{cat.name}</td>
                  <td className="py-4 px-6">
                    <code className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-slate-500 dark:text-slate-400 font-mono">/{cat.slug}</code>
                  </td>
                  <td className="py-4 px-6 text-center font-black text-slate-900 dark:text-white">{cat.productCount}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${cat.status === 'Hiển thị' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenDrawer('edit', cat)} className="p-2 text-slate-400 hover:text-primary transition-all"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={() => setShowDrawer(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-slate-900 shadow-2xl z-[70] flex flex-col border-l border-slate-200 dark:border-slate-800">
            <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase">{editMode === 'create' ? 'Tạo mới' : 'Chỉnh sửa'} danh mục</h2>
              <button onClick={() => setShowDrawer(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white dark:bg-slate-900">
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3">Hình ảnh đại diện (URL)</label>
                  <div className="flex gap-4 items-center">
                    <div className="size-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                      {selectedCategory.image_url ? <img src={selectedCategory.image_url} className="w-full h-full object-cover" /> : <ImagePlus className="text-slate-300" />}
                    </div>
                    <input 
                      name="image_url" value={selectedCategory.image_url} onChange={handleInputChange}
                      className="flex-1 h-11 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Nhập link hình ảnh..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Tên danh mục</label>
                    <input name="name" value={selectedCategory.name} onChange={handleInputChange} className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/50" placeholder="VD: Áo Thun Nam" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Slug (Đường dẫn tự động)</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input name="slug" value={selectedCategory.slug} onChange={handleInputChange} className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 font-mono text-sm outline-none" placeholder="ao-thun-nam" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3">Trạng thái hiển thị</label>
                  <div className="flex gap-3">
                    {['Hiển thị', 'Đang ẩn'].map((s) => (
                      <button 
                        key={s} onClick={() => setSelectedCategory({...selectedCategory, status: s})}
                        className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase border transition-all ${selectedCategory.status === s ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex gap-3">
              <button onClick={() => setShowDrawer(false)} className="flex-1 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all hover:bg-slate-50">Hủy</button>
              <button onClick={handleSave} className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all">Lưu thay đổi</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};