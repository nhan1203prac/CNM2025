
import React, { useState } from 'react';
import { PRODUCTS_LIST } from '../../constants';
import { StockStatus } from '../../type';

const StockBadge = ({ status }) => {
  const styles = {
    [StockStatus.IN_STOCK]: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    [StockStatus.OUT_OF_STOCK]: 'bg-red-500/10 text-red-500 border-red-500/20',
    [StockStatus.LOW_STOCK]: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };
  const dots = {
    [StockStatus.IN_STOCK]: 'bg-emerald-500',
    [StockStatus.OUT_OF_STOCK]: 'bg-red-500',
    [StockStatus.LOW_STOCK]: 'bg-orange-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${styles[status]}`}>
      <span className={`size-1.5 rounded-full ${dots[status]}`}></span>
      {status}
    </span>
  );
};

export const ProductsPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editMode, setEditMode] = useState('create');
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleOpenDrawer = (mode, product) => {
    setEditMode(mode);
    setSelectedProduct(product || { name: '', sku: '', category: '', price: 0, stock: 0, status: StockStatus.IN_STOCK });
    setShowDrawer(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Quản Lý Sản Phẩm</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium">Quản lý danh sách sản phẩm, kho hàng và giá cả.</p>
        </div>
        <button 
          onClick={() => handleOpenDrawer('create')}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tạo mới sản phẩm
        </button>
      </div>

      {/* Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white dark:bg-[#1c2127] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="md:col-span-5 relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="w-full pl-10 pr-4 h-11 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-400 dark:text-white" 
            placeholder="Tìm kiếm sản phẩm theo tên, mã SKU..." 
            type="text"
          />
        </div>
        <div className="md:col-span-3">
          <select className="w-full h-11 px-4 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 outline-none text-slate-600 dark:text-slate-300 font-semibold cursor-pointer">
            <option value="">Tất cả danh mục</option>
            <option value="electronics">Điện thoại</option>
            <option value="laptop">Laptop</option>
            <option value="accessories">Phụ kiện</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <select className="w-full h-11 px-4 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 outline-none text-slate-600 dark:text-slate-300 font-semibold cursor-pointer">
            <option value="">Trạng thái</option>
            <option value="in_stock">Còn hàng</option>
            <option value="out_of_stock">Hết hàng</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button className="w-full h-11 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Lọc
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1c2127] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-dark/50 border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <th className="px-6 py-4 w-16">
                  <input className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111418] text-primary focus:ring-0" type="checkbox"/>
                </th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Danh mục</th>
                <th className="px-6 py-4 text-right">Giá niêm yết</th>
                <th className="px-6 py-4 text-center">Kho</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {PRODUCTS_LIST.map((prod) => (
                <tr key={prod.id} className="group hover:bg-slate-50 dark:hover:bg-surface-dark/40 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <input className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111418] text-primary focus:ring-0" type="checkbox"/>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-slate-100 dark:bg-surface-dark flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                        <img alt={prod.name} className="w-full h-full object-cover" src={prod.imageUrl} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{prod.name}</span>
                        <span className="text-[11px] font-medium text-slate-500">SKU: {prod.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400">{prod.category}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-white">
                    {prod.price.toLocaleString('vi-VN')} ₫
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{prod.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StockBadge status={prod.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenDrawer('edit', prod); }}
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
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-surface-dark/20 text-sm">
          <p className="text-slate-500 dark:text-slate-400 font-medium">Hiển thị <span className="font-bold text-slate-900 dark:text-white">1</span> đến <span className="font-bold text-slate-900 dark:text-white">5</span> trong <span className="font-bold text-slate-900 dark:text-white">48</span> sản phẩm</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 hover:bg-slate-50 font-bold transition-all disabled:opacity-50" disabled>Trước</button>
            <button className="px-4 py-1.5 rounded-xl bg-primary text-white border border-primary font-black shadow-lg shadow-primary/20">1</button>
            <button className="px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 hover:bg-slate-50 font-bold transition-all">Sau</button>
          </div>
        </div>
      </div>

      {/* Form Drawer */}
      {showDrawer && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => setShowDrawer(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full md:w-[540px] bg-white dark:bg-[#1c2127] shadow-2xl z-[70] transform translate-x-0 transition-transform duration-300 border-l border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#1c2127]">
              <h2 className="text-xl font-black dark:text-white">{editMode === 'create' ? 'Tạo mới sản phẩm' : 'Chỉnh sửa sản phẩm'}</h2>
              <button onClick={() => setShowDrawer(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Hình ảnh sản phẩm</label>
                  <div className="size-32 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] flex items-center justify-center group hover:border-primary transition-all cursor-pointer">
                    {selectedProduct.imageUrl ? (
                      <img src={selectedProduct.imageUrl} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className="material-symbols-outlined text-slate-400 text-4xl group-hover:text-primary">add_a_photo</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tên sản phẩm</label>
                    <input name="name" value={selectedProduct.name} onChange={handleInputChange} className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20" placeholder="VD: iPhone 15 Pro Max"/>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Mã SKU</label>
                    <input name="sku" value={selectedProduct.sku} onChange={handleInputChange} className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-primary/20" placeholder="VD: SKU-1234"/>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Danh mục</label>
                    <select name="category" value={selectedProduct.category} onChange={handleInputChange} className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Chọn danh mục</option>
                      <option value="Điện thoại">Điện thoại</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Phụ kiện">Phụ kiện</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Giá bán (₫)</label>
                    <input type="number" name="price" value={selectedProduct.price} onChange={handleInputChange} className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-black outline-none focus:ring-2 focus:ring-primary/20"/>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Số lượng tồn kho</label>
                    <input type="number" name="stock" value={selectedProduct.stock} onChange={handleInputChange} className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Mô tả sản phẩm</label>
                  <textarea className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111418] text-sm dark:text-white font-medium outline-none focus:ring-2 focus:ring-primary/20 h-32 resize-none" placeholder="Nhập thông tin chi tiết về sản phẩm..."></textarea>
                </div>
              </div>
            </div>
            <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111418]">
              <div className="flex gap-3">
                <button onClick={() => setShowDrawer(false)} className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold">Hủy</button>
                <button className="flex-[2] py-3 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/30">Lưu sản phẩm</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
