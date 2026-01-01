import React from "react";
import { Link } from "react-router-dom";
import { useCart } from '../../../context/CartContext';
import baseAPI from '../../../api/baseApi';
import { toast } from "react-hot-toast";

const ProductCard = ({ product, onToggleFavorite }) => {
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
          ? "Đã thêm vào yêu thích"
          : "Đã xóa khỏi yêu thích"
      );
    } catch (error) {
      toast.error("Vui lòng đăng nhập để thực hiện tính năng này");
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    e.stopPropagation();

    addToCart(product, 1, "Default", "Default");

    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <div className="flex flex-col gap-3 group bg-white rounded-xl p-2 hover:shadow-xl transition-all duration-300">
      <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
        {discount_percent > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-sm">
            -{discount_percent}%
          </div>
        )}

        {is_new && !discount_percent && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-sm">
            NEW
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
            src={
              main_image || "https://via.placeholder.com/400x500?text=No+Image"
            }
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-1 px-1 pb-2">
        <div className="flex items-center justify-between text-[11px] md:text-xs">
          <div className="flex items-center gap-1 text-yellow-500">
            <span className="material-symbols-outlined text-[14px] fill-current">
              star
            </span>

            <span className="font-bold text-gray-700">{rating_avg || 5.0}</span>

            <span className="text-gray-400">({reviews_count || 0})</span>
          </div>

          <div className="text-gray-400 font-medium">
            Đã bán {product.sold_count || 0}
          </div>
        </div>

        <Link to={`/product/${id}`}>
          <h3 className="text-[#181411] text-sm md:text-base font-bold line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors leading-tight">
            {name}
          </h3>
        </Link>

        {/* Giá sản phẩm */}

        <div className="flex flex-wrap items-baseline gap-2 mt-1">
          <span className="text-primary text-base md:text-lg font-black">
            {formatCurrency(price)}
          </span>

          {original_price > price && (
            <span className="text-gray-400 text-xs md:text-sm line-through decoration-1">
              {formatCurrency(original_price)}
            </span>
          )}
        </div>

        {/* Nút thêm vào giỏ hàng */}

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full py-2 rounded-lg border-2 border-gray-100 text-[#181411] font-bold text-xs md:text-sm hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">
            add_shopping_cart
          </span>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
