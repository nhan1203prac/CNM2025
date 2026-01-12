import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './components/common/ProductCard';
import { untils } from '../../languages/untils';
import { 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Star, 
  ChevronRight as ChevronIcon,
  FilterX
} from 'lucide-react';
import baseAPI from '../api/baseApi';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const [searchParams, setSearchParams] = useSearchParams();
  const ALL_CATEGORY_KEY = 'ALL';

  const getFilterFromURL = () => ({
    category: searchParams.get('category') || ALL_CATEGORY_KEY,
    rating: Number(searchParams.get('rating')) || 0,
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  });

  const [tempFilters, setTempFilters] = useState(getFilterFromURL());

  useEffect(() => {
    setTempFilters(getFilterFromURL());
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/v1/categories/all');
        setCategories([{ id: ALL_CATEGORY_KEY, name: untils.mess("productList.sidebar.all_categories") }, ...res.data]);
      } catch (e) { console.error(e); }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const currentFilters = getFilterFromURL();
      try {
        const params = {
          page: page,
          size: 12,
          category_id: currentFilters.category === ALL_CATEGORY_KEY ? null : currentFilters.category,
          min_price: currentFilters.minPrice || null,
          max_price: currentFilters.maxPrice || null,
          rating: currentFilters.rating || null
        };
        const res = await baseAPI.get('/products', { params });
        setProducts(res.data.items);
        setPagination({ total: res.data.total, pages: res.data.pages });
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, searchParams]); 

  const handleApplyFilters = () => {
    const newParams = {};
    if (tempFilters.category !== ALL_CATEGORY_KEY) newParams.category = tempFilters.category;
    if (tempFilters.rating > 0) newParams.rating = tempFilters.rating;
    if (tempFilters.minPrice) newParams.minPrice = tempFilters.minPrice;
    if (tempFilters.maxPrice) newParams.maxPrice = tempFilters.maxPrice;
    
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchParams({}); 
    setPage(1);
  };

  const onToggleFavorite = (productId, isFav) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_favorite: isFav } : p));
  };

  const isFiltering = searchParams.toString() !== "";

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-10">
        
        <nav className="flex items-center text-sm text-slate-500 mb-4">
          <Link className="hover:text-primary transition-colors" to="/">
            {untils.mess("header.nav.home")}
          </Link>
          <ChevronIcon size={14} className="mx-2" />
          <span className="text-slate-800 font-semibold uppercase tracking-tight">
            {untils.mess("productList.breadcrumb")}
          </span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-10 uppercase tracking-tight">
          {untils.mess("productList.title")}
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="flex items-center gap-2 border-b pb-4">
                <Filter size={18} className="text-slate-900" />
                <h3 className="font-bold uppercase text-sm tracking-wider">
                  {untils.mess("productList.filter.filter")}
                </h3>
              </div>

              <div>
                <p className="text-[13px] font-bold uppercase mb-4 ">
                  {untils.mess("productList.sidebar.categories_title")}
                </p>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category"
                        checked={String(tempFilters.category) === String(cat.id)}
                        onChange={() => setTempFilters({...tempFilters, category: cat.id})}
                        className="w-4 h-4 text-primary border-slate-300 focus:ring-0 cursor-pointer transition-all" 
                      />
                      <span className={`text-sm transition-colors ${String(tempFilters.category) === String(cat.id) ? 'text-primary font-bold' : 'text-slate-600 group-hover:text-primary'}`}>
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-[13px]   uppercase mb-4 ">
                  {untils.mess("productList.sidebar.price.title")}
                </p>
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg  transition-all">
                  <input 
                    type="number" 
                    placeholder={untils.mess("productList.sidebar.price.from")}
                    className="w-full h-8 px-2 bg-transparent text-sm outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={tempFilters.minPrice} 
                    onChange={(e) => setTempFilters({...tempFilters, minPrice: e.target.value})} 
                  />
                  <div className="w-3 h-px bg-slate-300 shrink-0"></div>
                  <input 
                    type="number" 
                    placeholder={untils.mess("productList.sidebar.price.to")}
                    className="w-full h-8 px-2 bg-transparent text-sm outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={tempFilters.maxPrice} 
                    onChange={(e) => setTempFilters({...tempFilters, maxPrice: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <p className="text-[13px] font-bold uppercase mb-4 ">
                  {untils.mess("productList.sidebar.rating.title")}
                </p>
                <div className="flex gap-1.5 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      onClick={() => setTempFilters({...tempFilters, rating: star})}
                      className="transition-transform active:scale-90"
                    >
                      <Star 
                        size={22} 
                        className={`transition-all duration-200 ${star <= tempFilters.rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200 hover:text-slate-300'}`} 
                      />
                    </button>
                  ))}
                  {tempFilters.rating > 0 && (
                    <span className="text-[10px] font-bold text-primary ml-1 uppercase">
                      {tempFilters.rating} {untils.mess("productList.sidebar.rating.suffix")}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={handleApplyFilters} 
                  className="w-full py-3 bg-slate-900 text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all active:scale-[0.98]"
                >
                  {untils.mess("productList.filter.apply")}
                </button>
                {isFiltering && (
                  <button 
                    onClick={clearFilters} 
                    className="w-full mt-3 py-2 flex items-center justify-center gap-2  font-bold text-[13px] uppercase hover:text-red-500 transition-colors"
                  >
                    <FilterX size={14} /> {untils.mess("productList.filter.clear")}
                  </button>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-8 pb-4 border-b border-slate-100 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 italic">
                {untils.mess("productList.results.found_prefix")} <span className="text-slate-900 font-bold not-italic">{pagination.total}</span> {untils.mess("productList.results.found_suffix")}
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
                  {untils.mess("productList.loading")}
                </p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} onToggleFavorite={onToggleFavorite} />
                  ))}
                </div>

                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-20 pt-10 border-t border-slate-50">
                    <button 
                      disabled={page === 1} 
                      onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex items-center px-4 gap-4 text-sm font-black text-slate-300">
                      {[...Array(pagination.pages)].map((_, i) => (
                        <button 
                          key={i+1} 
                          onClick={() => { setPage(i+1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                          className={`transition-all ${page === i+1 ? 'text-primary scale-125' : 'hover:text-slate-800'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button 
                      disabled={page === pagination.pages} 
                      onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 disabled:opacity-20 transition-all shadow-sm"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-40 text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest px-10 leading-relaxed text-[20px]">
                  {untils.mess("productList.results.empty_msg")}
                </p>
                <button 
                  onClick={clearFilters} 
                  className="mt-6 text-primary font-black text-[15px] uppercase tracking-[0.2em] border-b-2 border-primary pb-1 hover:text-slate-900 transition-all"
                >
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