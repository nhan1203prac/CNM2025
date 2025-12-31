import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data';
import ProductCard from './components/common/ProductCard';

const ProductList = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchRating = selectedRating === 0 || Math.floor(product.rating) >= selectedRating;
      const matchCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
      const minPrice = priceRange.min === '' ? 0 : parseInt(priceRange.min);
      const maxPrice = priceRange.max === '' ? Infinity : parseInt(priceRange.max);
      const matchPrice = product.price >= minPrice && product.price <= maxPrice;
      
      return matchRating && matchCategory && matchPrice;
    });
  }, [selectedRating, selectedCategory, priceRange]);

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-2">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
          <span className="text-[#181411] font-medium">Sản phẩm</span>
        </nav>
        <h1 className="text-3xl font-bold text-[#181411] mb-8">Tất cả sản phẩm</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
            
            {/* Bộ lọc Danh mục */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#181411] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">category</span>
                Danh mục
              </h3>
              <div className="flex flex-col gap-3">
                {['Tất cả', 'Điện tử', 'Thời trang', 'Giày Dép'].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="rounded-full border-gray-300 text-primary focus:ring-primary" 
                    />
                    <span className={`text-sm transition-colors ${selectedCategory === cat ? 'text-primary font-bold' : 'text-gray-600 group-hover:text-primary'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bộ lọc Khoảng giá */}
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
                    className="w-full rounded-lg border-gray-200 text-sm p-2 focus:border-primary focus:ring-primary"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                  <span className="text-gray-400">-</span>
                  <input 
                    type="number" 
                    placeholder="Đến" 
                    className="w-full rounded-lg border-gray-200 text-sm p-2 focus:border-primary focus:ring-primary"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Bộ lọc Đánh giá (Tương tác sao theo yêu cầu) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#181411] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">star</span>
                Đánh giá
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className="focus:outline-none transition-transform active:scale-125"
                      title={`${star} sao`}
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
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {selectedRating > 0 ? `Từ ${selectedRating} sao trở lên` : 'Chọn mức đánh giá'}
                  </span>
                  {selectedRating > 0 && (
                    <button 
                      onClick={() => setSelectedRating(0)}
                      className="text-xs text-primary font-bold hover:underline"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Danh sách sản phẩm */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">
                Tìm thấy <span className="font-bold text-[#181411]">{filteredProducts.length}</span> sản phẩm
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sắp xếp:</span>
                <select className="bg-transparent border-none text-sm font-bold text-[#181411] focus:ring-0 cursor-pointer">
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến Cao</option>
                  <option>Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>

            {/* Lưới sản phẩm */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-20 text-center border border-dashed border-gray-300">
                <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">search_off</span>
                <p className="text-gray-500">Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
                <button 
                  onClick={() => { setSelectedRating(0); setSelectedCategory('Tất cả'); setPriceRange({min:'', max:''}); }}
                  className="mt-4 text-primary font-bold hover:underline"
                >
                  Thiết lập lại bộ lọc
                </button>
              </div>
            )}

            {/* Phân trang giả lập */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <button className="size-10 rounded-lg border border-gray-200 flex items-center justify-center bg-white text-gray-400">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="size-10 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20">1</button>
                <button className="size-10 rounded-lg bg-white border border-gray-100 text-gray-600 hover:border-primary">2</button>
                <button className="size-10 rounded-lg border border-gray-200 flex items-center justify-center bg-white text-gray-600">
                  <span className="material-symbols-outlined">chevron_right</span>
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