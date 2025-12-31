
import React from 'react';
import AccountLayout from '../components/account/AccountLayout';
import { PRODUCTS } from '../../../data';
import ProductCard from '../components/common/ProductCard';

const Favorites: React.FC = () => {
  return (
    <AccountLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-end justify-between border-b border-[#f4f2f0] pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-[#181411] text-2xl md:text-3xl font-bold leading-tight tracking-[-0.033em]">Sản Phẩm Yêu Thích</h2>
            <p className="text-[#897261] text-sm font-normal leading-normal">4 sản phẩm đã lưu</p>
          </div>
          <button className="flex items-center gap-2 text-sm text-[#897261] hover:text-primary transition-colors font-medium">
            <span className="material-symbols-outlined text-[18px]">delete</span>
            Xóa tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </AccountLayout>
  );
};

export default Favorites;
