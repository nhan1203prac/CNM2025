import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './components/common/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialFilters = {
    rating: 0,
    priceRange: { min: '', max: '' },
    category: 'Tất cả'
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

  const categories = [
    { id: 'Tất cả', name: 'Tất cả' },
    { id: 1, name: 'Điện thoại' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Thời trang' }
  ];

  const clearFilters = () => {
    setSelectedRating(initialFilters.rating);
    setPriceRange(initialFilters.priceRange);
    setSelectedCategory(initialFilters.category);
  };


  const isFiltering = selectedRating !== 0 || selectedCategory !== 'Tất cả' || priceRange.min !== '' || priceRange.max !== '';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {

      const productRatingRounded = product.rating_avg ? Math.round(product.rating_avg) : 0;
      const matchRating = selectedRating === 0 || productRatingRounded === selectedRating;
      
  
      const matchCategory = selectedCategory === 'Tất cả' || product.category_id === selectedCategory;

     
      const minPrice = priceRange.min === '' ? 0 : parseInt(priceRange.min);
      const maxPrice = priceRange.max === '' ? Infinity : parseInt(priceRange.max);
      const matchPrice = product.price >= minPrice && product.price <= maxPrice;
      
      return matchRating && matchCategory && matchPrice;
    });
  }, [products, selectedRating, selectedCategory, priceRange]);

  if (loading) return <div className="text-center py-20">Đang tải sản phẩm...</div>;

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-2">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
          <span className="text-[#181411] font-medium">Sản phẩm</span>
        </nav>

        <h1 className="text-3xl font-bold text-[#181411] mb-8">Tất cả sản phẩm</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
            
        
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#181411] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">category</span>
                Danh mục
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
                  XÓA TẤT CẢ BỘ LỌC
                </button>
              )}
            </div>

        
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#181411] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">payments</span>
                Khoảng giá
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Từ" 
                    className="w-full rounded-lg border-gray-200 text-sm p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                  <span className="text-gray-400">-</span>
                  <input 
                    type="number" 
                    placeholder="Đến" 
                    className="w-full rounded-lg border-gray-200 text-sm p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>
            </div>

       
<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h3 className="font-bold text-[#181411] mb-4 flex items-center gap-2">
    <span className="material-symbols-outlined text-primary text-xl">star_rate</span>
    Số sao đánh giá
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
        <span className="text-sm font-bold text-primary">{selectedRating} Sao</span>
      )}
    </div>
    <p className="text-[11px] text-gray-400 italic">
      Đang lọc chính xác sản phẩm {selectedRating} sao.
    </p>
  </div>
</div>
          </aside>

        
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">
                Tìm thấy <span className="font-bold text-[#181411]">{filteredProducts.length}</span> sản phẩm
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
                <p className="text-gray-500 font-medium">Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
                <button onClick={clearFilters} className="mt-4 text-primary font-bold hover:underline">Thử xóa bộ lọc</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;