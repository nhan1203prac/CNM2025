import React, { useState, useEffect, useRef } from "react";
import baseAPI from "../api/baseApi";
import {
  Edit3,
  Trash2,
  Search,
  Plus,
  X,
  ImagePlus,
  Globe,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [editMode, setEditMode] = useState("create");

  const imageInputRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    status: false,

  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const generateSlug = (name) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await baseAPI.get("/admin/categories", {
        params: { search, status: filterStatus },
      });
      console.log("categories", res.data);
      setCategories(res.data);
    } catch {
      toast.error("Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [filterStatus]);

  const handleOpenDrawer = (mode, category = null) => {
    setEditMode(mode);
    setSelectedCategory(
      category || {
        name: "",
        slug: "",
        description: "",
        imageUrl: "",
        status: false,
      }
    );
    setShowDrawer(true);
  };

  const handleSave = async () => {
    if (!selectedCategory.name) {
      return toast.error("Vui lòng nhập tên danh mục");
    }

    const payload = {
      name: selectedCategory.name,
      slug: selectedCategory.slug,
      description: selectedCategory.description,
      image_url: selectedCategory.imageUrl,
      is_active: selectedCategory.status,
    };

    const loadingToast = toast.loading("Đang lưu...");
    try {
      if (editMode === "create") {
        await baseAPI.post("/admin/categories", payload);
        toast.success("Đã tạo danh mục", { id: loadingToast });
      } else {
        await baseAPI.patch(
          `/admin/categories/${selectedCategory.id}`,
          payload
        );
        toast.success("Đã cập nhật", { id: loadingToast });
      }
      setShowDrawer(false);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Có lỗi", {
        id: loadingToast,
      });
    }
  };


  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imgload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqmlemao7/image/upload",
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const uploadCategoryImage = async (file) => {
    const loading = toast.loading("Upload ảnh...");
    try {
      const url = await uploadToCloudinary(file);
      setSelectedCategory((prev) => ({ ...prev, imageUrl: url }));
      toast.success("Upload thành công", { id: loading });
    } catch {
      toast.error("Upload thất bại", { id: loading });
    }
  };

  console.log("category ", selectedCategory.imageUrl);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black">Danh mục sản phẩm</h2>
          <p className="text-slate-500">Quản lý danh mục hệ thống</p>
        </div>
        <button
          onClick={() => handleOpenDrawer("create")}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex gap-2"
        >
          <Plus size={20} /> Tạo mới
        </button>
      </div>

      <div className="bg-white border rounded-2xl p-5 flex gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2"
            size={18}
          />
          <input
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border rounded-xl"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchCategories()}
          />
        </div>
        <select
          className="bg-slate-50 border px-8 rounded-xl font-semibold"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="Hiển thị">Hiển thị</option>
          <option value="Đang ẩn">Đang ẩn</option>
        </select>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr className="text-xs font-black uppercase">
              <th className="p-4">Ảnh</th>
              <th className="p-4">Tên</th>
              <th className="p-4">Slug</th>
              <th className="p-4 text-center">SP</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <Loader2 className="animate-spin m-auto" />
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id} className="border-t hover:bg-slate-50">
                  <td className="p-4">
                    <img
                      src={c.imageUrl || "/placeholder-cat.png"}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                  </td>
                  <td className="p-4 font-bold">{c.name}</td>
                  <td className="p-4">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                      /{c.slug}
                    </code>
                  </td>
                  <td className="p-4 text-center font-bold">
                    {c.productCount}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        c.status
                          ? "bg-green-100 text-green-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {c.status?"Hiển thị":"Đang ẩn"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenDrawer("edit", c)}
                      className="p-2"
                    >
                      <Edit3 />
                    </button>
                    
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDrawer && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowDrawer(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white z-50 flex flex-col">
            <div className="p-6 border-b flex justify-between">
              <h2 className="font-black uppercase">
                {editMode === "create" ? "Tạo mới" : "Chỉnh sửa"}
              </h2>
              <X onClick={() => setShowDrawer(false)} />
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden">
                  {selectedCategory.imageUrl ? (
                    <img
                      src={selectedCategory.imageUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlus />
                  )}
                </div>
                <button
                  onClick={() => imageInputRef.current.click()}
                  className="border px-4 py-2 rounded-xl"
                >
                  Chọn ảnh
                </button>
                <input
                  hidden
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files[0] && uploadCategoryImage(e.target.files[0])
                  }
                />
              </div>

              <input
                className="w-full border p-3 rounded-xl font-bold"
                placeholder="Tên danh mục"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                    slug: generateSlug(e.target.value),
                  })
                }
              />

              <div className="relative">
                <Globe
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  size={16}
                />
                <input
                  className="w-full pl-10 border p-3 rounded-xl font-mono text-sm"
                  value={selectedCategory.slug}
                  readOnly
                />
              </div>
            </div>
            {/* Thêm phần này vào bên trong <div className="p-6 space-y-6 overflow-y-auto">, ví dụ sau ô nhập Slug */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="font-black text-sm uppercase">
                  Trạng thái hiển thị
                </p>
                <p className="text-xs text-slate-500">
                  Cho phép danh mục xuất hiện trên cửa hàng
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedCategory.status}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      status: e.target.checked,
                    })
                  }
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="p-6 border-t flex gap-4">
              <button
                onClick={() => setShowDrawer(false)}
                className="flex-1 border rounded-xl py-3"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex-[2] bg-primary text-white rounded-xl py-3"
              >
                Lưu
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
