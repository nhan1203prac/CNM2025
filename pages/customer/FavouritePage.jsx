import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/common/ProductCard';
import baseAPI from '../api/baseApi'
import { toast } from 'react-hot-toast';
// 1. Import untils và Context
import { untils } from "../../languages/untils";

const FavoritesPage = () => {
  // 2. Kích hoạt hook

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await baseAPI.get("/favorites");
      const data = response.data.map(p => ({ ...p, is_favorite: true }));
      setFavorites(data);
    } catch (error) {
      console.error(untils.mess("favoritePage.error_load"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const onToggleFavorite = (productId, isFav) => {
    if (!isFav) {
      setFavorites(prev => prev.filter(p => p.id !== productId));
    }
  };

  console.log("favourtie", favorites)
  if (loading) return <div className="text-center py-20">{untils.mess("favoritePage.loading")}</div>;

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link className="hover:text-primary transition-colors" to="/">
            {untils.mess("header.nav.home")}
          </Link>
          <span className="material-symbols-outlined text-sm mx-2">chevron_right</span>
          <span className="text-[#181411] font-medium">
            {untils.mess("favoritePage.breadcrumb")}
          </span>
        </nav>

        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-gray-200 pb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#181411] text-3xl font-bold tracking-tight">
                {untils.mess("favoritePage.title")}
              </h1>
              <p className="text-gray-500 text-base">
                {/* Tách chuỗi để chèn biến số lượng vào giữa */}
                {untils.mess("favoritePage.count_prefix")} {favorites.length} {untils.mess("favoritePage.count_suffix")}
              </p>
            </div>
            {favorites.length > 0 && (
               <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors font-bold bg-white px-4 py-2 rounded-lg border border-red-100 shadow-sm">
                 <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
                 {untils.mess("favoritePage.clear_btn")}
               </button>
            )}
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {favorites.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onToggleFavorite={onToggleFavorite} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">heart_broken</span>
              <p className="text-gray-500 mb-6">
                {untils.mess("favoritePage.empty.message")}
              </p>
              <Link to="/" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-all">
                {untils.mess("favoritePage.empty.btn_continue")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;