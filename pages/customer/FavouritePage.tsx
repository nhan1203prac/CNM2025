import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data';
import ProductCard from './components/common/ProductCard';

const FavoritesPage: React.FC = () => {
  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="material-symbols-outlined text-sm mx-2">chevron_right</span>
          <span className="text-[#181411] font-medium">Sản phẩm yêu thích</span>
        </nav>

        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between border-b border-gray-200 pb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#181411] text-3xl font-bold tracking-tight">Sản phẩm yêu thích</h1>
              <p className="text-gray-500 text-base">Danh sách các sản phẩm bạn đã lưu để mua sau.</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors font-bold bg-white px-4 py-2 rounded-lg border border-red-100 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
              Xóa tất cả
            </button>
          </div>

          {/* Grid hiển thị sản phẩm */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {PRODUCTS.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;