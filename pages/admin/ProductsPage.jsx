import React, { useState, useEffect } from 'react';
import baseAPI from '../api/baseApi';
import { Edit3, Trash2, Search, Plus, X, Camera, Loader2, ImagePlus } from 'lucide-react'; 
import toast from 'react-hot-toast';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [editMode, setEditMode] = useState('create');
  
  const [selectedProduct, setSelectedProduct] = useState({
    name: '', price: 0, original_price: 0, stock: 0,
    category_id: '', main_image: '', images: [],
    is_new: false, description: ''
  });

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const initData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search;
      if (filterCategory) params.category_id = filterCategory;

      const [prodRes, catRes] = await Promise.all([
        baseAPI.get('/admin/products', { params }),
        baseAPI.get('/admin/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (error) {
      toast.error("Lỗi đồng bộ dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { initData(); }, [filterCategory]);

  const handleOpenDrawer = (mode, product = null) => {
    console.log("product", product)
    setEditMode(mode);
    if (product) {
      setSelectedProduct({
        ...product,
        category_id: product.category_id ? String(product.category_id) : '',
        main_image: product.imageUrl || product.main_image || '',
        images: product.sub_images || product.images || []
      });
    } else {
      setSelectedProduct({ 
        name: '', price: 0, original_price: 0, stock: 0, 
        category_id: '', main_image: '', images: [], 
        is_new: false, description: '' 
      });
    }
    setShowDrawer(true);
  };

  const handleSave = async () => {
    if (!selectedProduct.name || !selectedProduct.category_id) {
      return toast.error("Vui lòng nhập tên và chọn danh mục");
    }

    const loadToast = toast.loading("Đang lưu...");
    try {
      const payload = { ...selectedProduct };
      if (editMode === 'create') {
        await baseAPI.post('/admin/products', payload);
        toast.success("Đã thêm sản phẩm", { id: loadToast });
      } else {
        await baseAPI.patch(`/admin/products/${selectedProduct.id}`, payload);
        toast.success("Đã cập nhật", { id: loadToast });
      }
      setShowDrawer(false);
      initData();
    } catch (error) {
      toast.error("Lỗi lưu trữ", { id: loadToast });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa sản phẩm này?")) return;
    try {
      await baseAPI.delete(`/admin/products/${id}`);
      toast.success("Đã xóa");
      initData();
    } catch (error) {
      toast.error("Không thể xóa");
    }
  };
  console.log("Selected product ", selectedProduct)
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-slate-900 uppercase italic">Quản lý kho</h2>
        <button onClick={() => handleOpenDrawer('create')} className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/30">
          <Plus size={20}/> Thêm sản phẩm
        </button>
      </div>

      <div className="bg-white border rounded-3xl p-5 flex gap-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="w-full h-12 pl-12 pr-4 bg-slate-50 border rounded-2xl outline-none" placeholder="Tìm kiếm sản phẩm..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && initData()} />
        </div>
        <select className="h-12 bg-slate-50 border px-6 rounded-2xl font-bold" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Tất cả danh mục</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              <th className="py-5 px-8 text-center">Ảnh</th>
              <th className="py-5 px-6">Thông tin</th>
              <th className="py-5 px-6">Danh mục</th>
              <th className="py-5 px-6">Giá</th>
              <th className="py-5 px-6 text-center">Kho</th>
              <th className="py-5 px-8 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan="6" className="py-20 text-center"><Loader2 className="animate-spin m-auto text-primary"/></td></tr>
            ) : products.map((prod) => (
              <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-8 flex justify-center">
                  <div className="size-14 rounded-2xl border overflow-hidden bg-white"><img src={prod.imageUrl || '/placeholder.png'} className="w-full h-full object-cover" /></div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-900">{prod.name}</div>
                  {prod.is_new && <span className="text-[9px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-black uppercase">Mới</span>}
                </td>
                <td className="py-4 px-6 text-slate-500 text-xs font-bold">{prod.category}</td>
                <td className="py-4 px-6 font-black text-primary">{Number(prod.price).toLocaleString()} ₫</td>
                <td className="py-4 px-6 text-center font-bold">{prod.stock}</td>
                <td className="py-4 px-8 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenDrawer('edit', prod)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-primary"><Edit3 size={18} /></button>
                    <button onClick={() => handleDelete(prod.id)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={() => setShowDrawer(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white shadow-2xl z-[70] flex flex-col border-l animate-in slide-in-from-right">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-xl font-black uppercase italic">{editMode === 'create' ? 'Tạo mới' : 'Cập nhật'}</h2>
              <X className="cursor-pointer" onClick={() => setShowDrawer(false)} />
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed flex gap-4 items-center">
                <div className="size-24 rounded-2xl bg-white border flex-shrink-0">
                  {selectedProduct.main_image ? <img src={selectedProduct.main_image} className="w-full h-full object-cover rounded-2xl" /> : <Camera className="m-auto mt-8 text-slate-300"/>}
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">URL Ảnh chính</label>
                  <input className="w-full p-3 rounded-xl border text-sm" value={selectedProduct.main_image} onChange={(e) => setSelectedProduct({...selectedProduct, main_image: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-slate-400">Ảnh phụ</label>
                <div className="grid grid-cols-4 gap-4">
                  {selectedProduct.images?.map((img, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl border overflow-hidden">
                      <img src={img} className="w-full h-full object-cover" />
                      <button onClick={() => setSelectedProduct({...selectedProduct, images: selectedProduct.images.filter((_, i) => i !== idx)})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"><X size={10}/></button>
                    </div>
                  ))}
                  <button onClick={() => {const u = prompt("URL?"); if(u) setSelectedProduct({...selectedProduct, images: [...selectedProduct.images, u]})}} className="aspect-square border-2 border-dashed rounded-xl flex items-center justify-center text-slate-300 hover:text-primary"><Plus/></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Tên</label>
                  <input className="w-full p-4 rounded-xl border font-bold" value={selectedProduct.name} onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Danh mục</label>
                  <select className="w-full p-4 rounded-xl border font-bold" value={selectedProduct.category_id} onChange={(e) => setSelectedProduct({...selectedProduct, category_id: e.target.value})}>
                    <option value="">Chọn</option>
                    {categories.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Tồn kho</label>
                  <input type="number" className="w-full p-4 rounded-xl border font-bold" value={selectedProduct.stock} onChange={(e) => setSelectedProduct({...selectedProduct, stock: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Giá</label>
                  <input type="number" className="w-full p-4 rounded-xl border font-bold" value={selectedProduct.price} onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})} />
                </div>
                <div className="col-span-2 flex items-center gap-2 p-4 bg-slate-50 rounded-xl">
                  <input type="checkbox" checked={selectedProduct.is_new} onChange={(e) => setSelectedProduct({...selectedProduct, is_new: e.target.checked})} />
                  <span className="text-sm font-bold">Hàng mới về</span>
                </div>
              </div>
            </div>
            <div className="p-8 border-t flex gap-4 bg-slate-50">
              <button onClick={() => setShowDrawer(false)} className="flex-1 py-4 bg-white border rounded-2xl font-black text-xs uppercase">Hủy</button>
              <button onClick={handleSave} className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase shadow-lg">Lưu lại</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};