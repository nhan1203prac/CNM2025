import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './components/common/ProductCard';
import { untils } from '../../languages/untils';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Star, 
  ChevronRight as ChevronIcon,
  FilterX
} from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const ALL_CATEGORY_KEY = 'ALL';

  const [appliedFilters, setAppliedFilters] = useState({
    category: ALL_CATEGORY_KEY,
    rating: 0,
    minPrice: '',
    maxPrice: ''
  });

  const [tempFilters, setTempFilters] = useState({ ...appliedFilters });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/v1/categories/all');
        setCategories([{ id: ALL_CATEGORY_KEY, name: untils.mess("productList.sidebar.all_categories") }, ...res.data]);
      } catch (e) {
        console.error("Lỗi lấy danh mục:", e);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page: page,
          size: 12,
          category_id: appliedFilters.category === ALL_CATEGORY_KEY ? null : appliedFilters.category,
          min_price: appliedFilters.minPrice || null,
          max_price: appliedFilters.maxPrice || null,
          rating: appliedFilters.rating || null
        };
        const res = await axios.get('http://127.0.0.1:8000/api/v1/products', { params });
        console.log("Params", res);
        setProducts(res.data.items);
        setPagination({ total: res.data.total, pages: res.data.pages });
        console.log("Res", res.data.items)
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    const reset = { category: ALL_CATEGORY_KEY, rating: 0, minPrice: '', maxPrice: '' };
    setTempFilters(reset);
    setAppliedFilters(reset);
    setPage(1);
  };

  console.log("jvuisd", products)

  const isFiltering = appliedFilters.rating !== 0 || appliedFilters.category !== ALL_CATEGORY_KEY || appliedFilters.minPrice !== '' || appliedFilters.maxPrice !== '';

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-10">
        
        <nav className="flex items-center text-sm text-slate-500 mb-4">
          <Link className="hover:text-primary font-medium" to="/">
            {untils.mess("header.nav.home")}
          </Link>
          <ChevronIcon size={14} className="mx-2" />
          <span className="text-slate-800 font-semibold uppercase tracking-tight">
            {untils.mess("productList.breadcrumb")}
          </span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-10 uppercase">
          {untils.mess("productList.title")}
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4 ">
                <Filter size={18} />
                <h3 className="font-bold uppercase text-sm">{untils.mess("productList.filter.filter")}</h3>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">{untils.mess("productList.filter.category")}</p>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category"
                        checked={tempFilters.category === cat.id}
                        onChange={() => setTempFilters({...tempFilters, category: cat.id})}
                        className="w-4 h-4 border-slate-300 text-primary focus:ring-0 cursor-pointer" 
                      />
                      <span className={`text-sm ${tempFilters.category === cat.id ? 'text-primary font-bold' : 'text-slate-600 group-hover:text-primary'}`}>
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">{untils.mess("productList.filter.price")}</p>
                <div className="space-y-2">
                  <input 
                    type="number" 
                    placeholder="Từ" 
                    className="w-full h-10 px-3 bg-slate-50 rounded border-none text-sm outline-none focus:ring-1 focus:ring-primary"
                    value={tempFilters.minPrice}
                    onChange={(e) => setTempFilters({...tempFilters, minPrice: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="Đến" 
                    className="w-full h-10 px-3 bg-slate-50 rounded border-none text-sm outline-none focus:ring-1 focus:ring-primary"
                    value={tempFilters.maxPrice}
                    onChange={(e) => setTempFilters({...tempFilters, maxPrice: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">{untils.mess("productList.filter.rating")}</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setTempFilters({...tempFilters, rating: star})}>
                      <Star 
                        size={20} 
                        className={`${star <= tempFilters.rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={handleApplyFilters}
                  className="w-full py-3 bg-slate-900 text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-primary transition-colors"
                >
                  {untils.mess("productList.filter.apply")}
                </button>
                {isFiltering && (
                  <button 
                    onClick={clearFilters}
                    className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase hover:text-red-500 transition-colors"
                  >
                    <FilterX size={14} /> {untils.mess("productList.filter.clear")}
                  </button>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {untils.mess("productList.filter.result")}: <span className="text-slate-900 font-bold">{pagination.total}</span> {untils.mess("productList.filter.product")}
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="animate-spin text-primary mb-4" size={32} />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{untils.mess("productList.filter.loading")}</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-16 pt-8 border-t border-slate-100">
                    <button 
                      disabled={page === 1}
                      onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-10 h-10 flex items-center justify-center disabled:opacity-20 hover:text-primary transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`w-10 h-10 font-bold text-sm transition-colors ${
                          page === i + 1 ? 'text-primary' : 'text-slate-400 hover:text-slate-800'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button 
                      disabled={page === pagination.pages}
                      onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="w-10 h-10 flex items-center justify-center disabled:opacity-20 hover:text-primary transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-32 text-center border-2 border-dashed border-slate-100 rounded-lg">
                <p className="text-slate-400 font-semibold uppercase text-sm">{untils.mess("productList.filter.no_result")}</p>
                <button onClick={clearFilters} className="mt-4 text-primary font-bold text-xs uppercase underline">{untils.mess("productList.filter.clear_and_retry")}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;