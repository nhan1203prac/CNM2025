import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseAPI from "../api/baseApi";
// 1. Import untils và Context
import { untils } from "../../languages/untils"; 

const CategoryPage = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await baseAPI.get("/categories/all");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi lấy danh mục:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCategories();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        {untils.mess("categoryPage.loading")}
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
            {untils.mess("categoryPage.title")}
        </h1>
        <p className="text-gray-500 mt-2">
            {untils.mess("categoryPage.description")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className="group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
          >
            <div className="size-24 rounded-full overflow-hidden border-2 border-gray-50 group-hover:border-primary/30 transition-colors">
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                {/* Tên danh mục từ API thường giữ nguyên hoặc xử lý riêng ở Backend */}
                {cat.name} 
              </h3>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                {cat.product_count} {untils.mess("categoryPage.product_count_suffix")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CategoryPage;