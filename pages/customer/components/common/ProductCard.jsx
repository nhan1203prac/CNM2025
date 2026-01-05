import React from "react";
import { Link } from "react-router-dom";
import { useCart } from '../../../context/CartContext';
import baseAPI from '../../../api/baseApi';
import { toast } from "react-hot-toast";
import { ShoppingCart, Eye } from "lucide-react"; 
// 1. Import untils và Context
import { untils } from "../../../../languages/untils";

const ProductCard = ({ product, onToggleFavorite }) => {
  // 2. Kích hoạt hook để lắng nghe thay đổi ngôn ngữ
  const { addToCart } = useCart();
  const {
    id,
    name,
    price,
    original_price,
    discount_percent,
    rating_avg,
    reviews_count,
    main_image,
    is_new,
    is_favorite,
  } = product;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await baseAPI.post(`/favorites/${id}`);
      if (onToggleFavorite) {
        onToggleFavorite(id, response.data.is_favorite);
      }
      toast.success(
        response.data.is_favorite
          ? untils.mess("productCard.toast.add_fav")     // Đã sửa thành productCard
          : untils.mess("productCard.toast.remove_fav")  // Đã sửa thành productCard
      );
    } catch (error) {
      toast.error(untils.mess("productCard.toast.login_required")); // Đã sửa thành productCard
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
  };

  return (
    <div className="flex flex-col gap-3 group bg-white rounded-xl p-2 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100">
      <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
        {discount_percent > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] md:text-xs font-black px-2 py-1 rounded shadow-sm">
            -{discount_percent}%
          </div>
        )}

        {is_new && !discount_percent && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] md:text-xs font-black px-2 py-1 rounded shadow-sm uppercase italic">
            {untils.mess("productCard.new_label")} {/* Đã sửa thành productCard */}
          </div>
        )}

        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 size-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-red-500 transition-all shadow-md active:scale-90"
        >
          <span
            className={`material-symbols-outlined text-xl ${
              is_favorite ? "text-red-500 fill-current " : ""
            }`}
          >
            favorite
          </span>
        </button>

        <Link to={`/product/${id}`} className="block w-full h-full">
          <img
            alt={name}
            src={main_image || "https://via.placeholder.com/400x500?text=No+Image"}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-1 px-1 pb-2">
        <div className="flex items-center justify-between text-[11px] md:text-xs">
          <div className="flex items-center gap-1 text-yellow-500">
            <span className="material-symbols-outlined text-[14px] fill-current">star</span>
            <span className="font-bold text-gray-700">{rating_avg || 5.0}</span>
            <span className="text-gray-400">({reviews_count || 0})</span>
          </div>
          <div className="text-gray-400 font-medium italic">
            {untils.mess("productCard.sold")} {product.sold_count || 0} {/* Đã sửa thành productCard */}
          </div>
        </div>

        <Link to={`/product/${id}`}>
          <h3 className="text-[#181411] text-sm md:text-base font-black line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors leading-tight uppercase mt-1">
            {name}
          </h3>
        </Link>

        <div className="flex flex-wrap items-baseline gap-2 mt-1">
          <span className="text-primary text-base md:text-lg font-black italic">
            {formatCurrency(price)}
          </span>
          {original_price > price && (
            <span className="text-gray-400 text-xs md:text-sm line-through decoration-1 italic">
              {formatCurrency(original_price)}
            </span>
          )}
        </div>

        {/* Cụm nút bấm phía dưới */}
        <div className="flex gap-2 mt-3">
          {/* Nút Xem chi tiết */}
          <Link 
            to={`/product/${id}`} 
            className="flex-1 py-2.5 rounded-xl border-2 border-slate-100 text-[#181411] font-black text-[10px] md:text-[11px] uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 italic"
          >
            <Eye size={16} />
            {untils.mess("productCard.view_details")} {/* Đã sửa thành productCard */}
          </Link>

          {/* Nút Thêm vào giỏ */}
          <button
            onClick={handleAddToCart}
            className="size-10 md:size-11 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-90"
            title={untils.mess("productCard.add_to_cart_tooltip")} // Đã sửa thành productCard
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;