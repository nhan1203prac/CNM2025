import React, { useState, useEffect, useRef } from "react";
import baseAPI from "../api/baseApi";
import { Edit3, Trash2, Search, Plus, X, Camera, Loader2, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [editMode, setEditMode] = useState("create");

  const [inputStrings, setInputStrings] = useState({ colors: "", storages: "", sizes: "" });

  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: "",
    price: 0,
    original_price: 0,
    stock: 0,
    category_id: "",
    main_image: "",
    images: [], // Danh sách ảnh phụ
    description: "",
    colors: [],
    storages: [],
    sizes: [],
    is_active:true,
  });

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const mainImageInputRef = useRef(null);
  const subImageInputRef = useRef(null);

  // --- LOGIC GỌI API ---
  const initData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search;
      if (filterCategory) params.category_id = filterCategory;

      const [prodRes, catRes] = await Promise.all([
        baseAPI.get("/admin/products", { params }),
        baseAPI.get("/admin/categories"),
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      console.log(prodRes.data)
    } catch (err) {
      toast.error("Lỗi đồng bộ dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { initData(); }, [filterCategory]);

  // --- LOGIC UPLOAD ẢNH (CLOUDINARY) ---
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imgload"); 
    const res = await fetch("https://api.cloudinary.com/v1_1/dqmlemao7/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  };

  const uploadMainImage = async (file) => {
    const ld = toast.loading("Đang tải ảnh...");
    try {
      const url = await uploadToCloudinary(file);
      setSelectedProduct((prev) => ({ ...prev, main_image: url }));
      toast.success("Xong", { id: ld });
    } catch { toast.error("Lỗi upload", { id: ld }); }
  };

  const uploadSubImages = async (files) => {
    const ld = toast.loading("Đang tải ảnh chi tiết...");
    try {
      const urls = await Promise.all([...files].map((f) => uploadToCloudinary(f)));
      setSelectedProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
      toast.success("Xong", { id: ld });
    } catch { toast.error("Lỗi upload", { id: ld }); }
  };

  const handleOpenDrawer = (mode, product = null) => {
    setEditMode(mode);
    if (product) {
      const pData = {
        ...product,
        category_id: String(product.category_id ?? ""),
        main_image: product.imageUrl || product.main_image || "",
        images: product.sub_images || product.images || [],
        colors: product.colors || [],
        storages: product.storages || [],
        sizes: product.sizes || [],
        is_active: product.is_active ?? true,
      };
      setSelectedProduct(pData);
      setInputStrings({
        colors: pData.colors.join(", "),
        storages: pData.storages.join(", "),
        sizes: pData.sizes.join(", "),
      });
    } else {
      setSelectedProduct({
        name: "", price: 0, original_price: 0, stock: 0, category_id: "",
        main_image: "", images: [], description: "", colors: [], storages: [], sizes: [], is_active:true
      });
      setInputStrings({ colors: "", storages: "", sizes: "" });
    }
    setShowDrawer(true);
  };

  const handleTyping = (key, text) => {
    setInputStrings((prev) => ({ ...prev, [key]: text }));
    const array = text.split(/[,\s]+/).filter((i) => i.trim() !== "");
    setSelectedProduct((prev) => ({ ...prev, [key]: array }));
  };

  const handleSave = async () => {
    if (!selectedProduct.name || !selectedProduct.category_id) {
      return toast.error("Vui lòng điền đủ Tên và Danh mục");
    }
    const ld = toast.loading("Đang lưu...");
    try {
      if (editMode === "create") {
        await baseAPI.post("/admin/products", selectedProduct);
      } else {
        await baseAPI.patch(`/admin/products/${selectedProduct.id}`, selectedProduct);
      }
      toast.success("Thành công", { id: ld });
      setShowDrawer(false);
      initData();
    } catch (err) { toast.error("Lỗi khi lưu", { id: ld }); }
  };

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Xác nhận xóa sản phẩm?")) return;
  //   try {
  //     await baseAPI.delete(`/admin/products/${id}`);
  //     toast.success("Đã xóa");
  //     initData();
  //   } catch { toast.error("Lỗi xóa"); }
  // };

  return (
    <div className="p-6 bg-white min-h-screen text-black font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8   pb-4">
        <h2 className="text-3xl font-black uppercase">Quản lý kho</h2>
        <button onClick={() => handleOpenDrawer("create")} className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex gap-2">
          + Thêm sản phẩm
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
          <input className="w-full h-12 pl-12 pr-4 bg-gray-50 border rounded-2xl outline-none focus:border-primary transition-all text-base font-medium" placeholder="Tìm tên..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && initData()} />
        </div>
        <select className="h-12 bg-gray-50 border px-6 rounded-2xl font-bold outline-none cursor-pointer text-sm" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Tất cả loại</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* TABLE */}
      <div className="border overflow-hidden rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr className="text-sm font-black uppercase text-black">
              <th className="p-4 border-r text-center w-20">Ảnh</th>
              <th className="p-4 border-r">Tên sản phẩm</th>
              <th className="p-4 border-r text-center w-20">Kho</th>
              <th className="p-4 border-r w-32">Giá niêm yết</th>
              <th className="p-4 border-r text-center w-32">Trạng thái</th>
              <th className="p-4 text-right w-24">Lệnh</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="py-20 text-center"><Loader2 className="animate-spin m-auto" /></td></tr>
            ) : products.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-2 border-r border-gray-100 text-center"><img src={p.imageUrl} className="w-14 h-14 object-cover m-auto border border-gray-200 rounded-lg" /></td>
                <td className="p-4 border-r border-gray-100 text-base font-bold uppercase">{p.name}</td>
                <td className="p-4 border-r border-gray-100 text-center text-base">{p.stock}</td>
                <td className="p-4 border-r border-gray-100 text-base font-bold">{Number(p.price).toLocaleString()}đ</td>
                <td className="p-4 border-r border-gray-100 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.is_active ? 'Hiển thị' : 'Đang ẩn'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => handleOpenDrawer("edit", p)} className="p-2 border border-gray-200 hover:bg-black hover:text-white transition-all rounded-lg"><Edit3 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DRAWER */}
      {showDrawer && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0" onClick={() => setShowDrawer(false)} />
          <div className="relative w-full md:w-[500px] bg-white h-full flex flex-col   animate-in slide-in-from-right duration-200">
            <div className="p-5 border-b-2 border-black flex justify-between items-center bg-gray-50">
              <h2 className="font-bold uppercase">{editMode === "create" ? "Thêm mới sản phẩm" : "Cập nhật sản phẩm"}</h2>
              <X className="cursor-pointer text-black" size={24} onClick={() => setShowDrawer(false)} />
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2">
                <div>
                  <p className="text-sm uppercase font-bold">Kích hoạt hiển thị</p>
                  <p className="text-[10px]  font-bold uppercase">Bật để khách hàng có thể thấy sản phẩm này</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedProduct.is_active}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, is_active: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">Ảnh đại diện (Main Image)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border-2 flex items-center justify-center bg-gray-50 relative group rounded-xl overflow-hidden">
                      {selectedProduct.main_image ? <img src={selectedProduct.main_image} className="w-full h-full object-cover" /> : <Camera className="text-gray-400" size={32} />}
                      <button onClick={() => mainImageInputRef.current.click()} className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 text-xs font-bold uppercase">Sửa</button>
                    </div>
                    <p className="text-xs  font-bold uppercase">Đây là ảnh hiển thị chính của sản phẩm</p>
                  </div>
                </div>

                {/* ẢNH PHỤ */}
                <div className="space-y-2">
                  <label className="text-sm  uppercase text-black">Ảnh chi tiết phụ (Sub Images)</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.images.map((img, i) => (
                      <div key={i} className="w-24 h-24 border-2 border-gray-200 relative group rounded-xl overflow-hidden">
                        <img src={img} className="w-full h-full object-cover" />
                        <button onClick={() => setSelectedProduct(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))} className="absolute top-0 right-0 bg-red-600 text-white p-1"><X size={12}/></button>
                      </div>
                    ))}
                    <button onClick={() => subImageInputRef.current.click()} className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-black hover:border-black rounded-xl transition-all"><ImagePlus size={28}/></button>
                  </div>
                </div>

                <input hidden type="file" ref={mainImageInputRef} onChange={e => e.target.files[0] && uploadMainImage(e.target.files[0])} />
                <input hidden multiple type="file" ref={subImageInputRef} onChange={e => uploadSubImages(e.target.files)} />
              </div>

              {/* FORM FIELDS */}
              <div className="space-y-6 pt-4 border-t-2 border-gray-100">
                <div className="space-y-2">
                  <label className="text-sm uppercase text-black">Tên sản phẩm</label>
                  <input className="w-full border-2 border-gray-300 h-12 px-4  outline-none  uppercase" value={selectedProduct.name} onChange={e => setSelectedProduct({...selectedProduct, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm  uppercase text-black">Giá bán (đ)</label>
                    <input type="number" className="w-full border-2 border-gray-300 h-12 px-4   outline-none " value={selectedProduct.price} onChange={e => setSelectedProduct({...selectedProduct, price: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm  uppercase text-black">Số lượng kho</label>
                    <input type="number" className="w-full border-2 border-gray-300 h-12 px-4  outline-none " value={selectedProduct.stock} onChange={e => setSelectedProduct({...selectedProduct, stock: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase text-black">Danh mục</label>
                  <select className="w-full border-2 border-gray-300 h-12 px-4   outline-none uppercase cursor-pointer" value={selectedProduct.category_id} onChange={e => setSelectedProduct({...selectedProduct, category_id: e.target.value})}>
                    <option value="">Chọn loại</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm  uppercase text-black">Mô tả sản phẩm</label>
                  <textarea className="w-full border-2 border-gray-300 p-4  font-medium outline-none  min-h-[120px]" value={selectedProduct.description} onChange={e => setSelectedProduct({...selectedProduct, description: e.target.value})} />
                </div>
              </div>

              {/* VARIANTS */}
              <div className="space-y-6 pt-6 border-black bg-gray-50 p-4 rounded-xl">
                <p className="text-sm  uppercase text-black">Đặc điểm</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm  uppercase text-black">Màu sắc</label>
                    <input className="w-full border-2 border-gray-300 h-12 px-4 text-sm  outline-none " placeholder="Đen, Trắng..." value={inputStrings.colors} onChange={e => handleTyping("colors", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm  uppercase text-black">Dung lượng</label>
                      <input className="w-full border-2 border-gray-300 h-12 px-4 text-sm  outline-none " placeholder="128GB, 256GB..." value={inputStrings.storages} onChange={e => handleTyping("storages", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm  uppercase text-black">Kích cỡ</label>
                      <input className="w-full border-2 border-gray-300 h-12 px-4 text-sm  outline-none " placeholder="S, M, L..." value={inputStrings.sizes} onChange={e => handleTyping("sizes", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6  flex gap-4 bg-gray-50">
              <button onClick={() => setShowDrawer(false)} className="flex-1 border rounded-xl py-3">Hủy bỏ</button>
              <button onClick={handleSave} className="flex-[2] bg-primary text-white rounded-xl py-3">Lưu dữ liệu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;