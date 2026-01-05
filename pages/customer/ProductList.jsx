import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './components/common/ProductCard';
// 1. Import untils và Context
import { untils } from '../../languages/untils';

const ProductList = () => {
  // 2. Kích hoạt hook

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Định nghĩa giá trị mặc định cho "Tất cả" dựa trên key
  const ALL_CATEGORY_KEY = 'ALL'; 

  const initialFilters = {
    rating: 0,
    priceRange: { min: '', max: '' },
    category: ALL_CATEGORY_KEY
  };

  const [selectedRating, setSelectedRating] = useState(initialFilters.rating);
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange);
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Danh mục: Map label cho "Tất cả", các mục khác giả sử lấy từ DB hoặc hardcode thì map tương ứng nếu cần
  const categories = [
    { id: ALL_CATEGORY_KEY, name: untils.mess("productList.sidebar.all_categories") },
    { id: 1, name: 'Điện thoại' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Thời trang' }
  ];

  const clearFilters = () => {
    setSelectedRating(initialFilters.rating);
    setPriceRange(initialFilters.priceRange);
    setSelectedCategory(initialFilters.category);
  };

  const isFiltering = selectedRating !== 0 || selectedCategory !== ALL_CATEGORY_KEY || priceRange.min !== '' || priceRange.max !== '';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productRatingRounded = product.rating_avg ? Math.round(product.rating_avg) : 0;
      const matchRating = selectedRating === 0 || productRatingRounded === selectedRating;
      
      const matchCategory = selectedCategory === ALL_CATEGORY_KEY || product.category_id === selectedCategory;
      
      const minPrice = priceRange.min === '' ? 0 : parseInt(priceRange.min);
      const maxPrice = priceRange.max === '' ? Infinity : parseInt(priceRange.max);
      const matchPrice = product.price >= minPrice && product.price <= maxPrice;
      
      return matchRating && matchCategory && matchPrice;
    });
  }, [products, selectedRating, selectedCategory, priceRange]);

  if (loading) return <div className="text-center py-20">{untils.mess("productList.loading")}</div>;

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-2">
          <Link className="hover:text-primary transition-colors" to="/">
            {untils.mess("header.nav.home")}
          </Link>
          <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
          <span className="text-[#181411] font-medium">
            {untils.mess("productList.breadcrumb")}
          </span>
        </nav>

        <h1 className="text-3xl font-bold text-[#181411] mb-8">
          {untils.mess("productList.title")}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
            
            {/* CATEGORIES */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#181411] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">category</span>
                {untils.mess("productList.sidebar.categories_title")}
              </h3>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="w-4 h-4 border-gray-300 text-primary focus:ring-primary cursor-pointer transition-all" 
                    />
                    <span className={`text-sm transition-colors ${selectedCategory === cat.id ? 'text-primary font-bold' : 'text-gray-600 group-hover:text-primary'}`}>
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>

              {isFiltering && (
                <button 
                  onClick={clearFilters}
                  className="mt-6 w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 font-bold text-xs py-2.5 rounded-lg border border-red-100 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">filter_alt_off</span>
                  {untils.mess("productList.sidebar.clear_filters")}
                </button>
              )}
            </div>

            {/* PRICE RANGE */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#181411] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">payments</span>
                {untils.mess("productList.sidebar.price.title")}
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder={untils.mess("productList.sidebar.price.from")} 
                    className="w-full rounded-lg border-gray-200 text-sm p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                  <span className="text-gray-400">-</span>
                  <input 
                    type="number" 
                    placeholder={untils.mess("productList.sidebar.price.to")} 
                    className="w-full rounded-lg border-gray-200 text-sm p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#181411] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">star_rate</span>
                {untils.mess("productList.sidebar.rating.title")}
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setSelectedRating(star)}
                        className="focus:outline-none transition-transform active:scale-125"
                      >
                        <span 
                          className={`material-symbols-outlined text-2xl transition-colors ${
                            star <= selectedRating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                          style={{ fontVariationSettings: star <= selectedRating ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                  {selectedRating > 0 && (
                    <span className="text-sm font-bold text-primary">
                      {selectedRating} {untils.mess("productList.sidebar.rating.suffix")}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 italic">
                  {untils.mess("productList.sidebar.rating.helper")} {selectedRating} {untils.mess("productList.sidebar.rating.helper_suffix")}
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">
                {untils.mess("productList.results.found_prefix")} <span className="font-bold text-[#181411]">{filteredProducts.length}</span> {untils.mess("productList.results.found_suffix")}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-20 text-center border border-dashed border-gray-300">
                <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">search_off</span>
                <p className="text-gray-500 font-medium">
                  {untils.mess("productList.results.empty_msg")}
                </p>
                <button onClick={clearFilters} className="mt-4 text-primary font-bold hover:underline">
                  {untils.mess("productList.results.btn_try_clear")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;