
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';



const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice) : null;

  return (
    <div className="flex flex-col gap-3 group">
      <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-{product.discount}%</div>
        )}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">New</div>
        )}
        <button 
          onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
          className="absolute top-3 right-3 z-10 size-8 bg-white/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <span className={`material-symbols-outlined text-lg heart-icon ${isFavorite ? 'filled' : ''}`}>favorite</span>
        </button>
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
            src={product.image} 
          />
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-yellow-500 text-xs">
          <span className="material-symbols-outlined text-[16px] fill-current">star</span>
          <span className="font-medium text-gray-500 ml-1">{product.rating} ({product.reviewsCount})</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-[#181411] text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-primary text-lg font-bold">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="text-gray-400 text-sm line-through decoration-1">{formattedOriginalPrice}</span>
          )}
        </div>
        <button 
          onClick={() => addToCart(product, 1, product.sizes[0], 'Default')}
          className="mt-2 w-full py-2.5 rounded-lg border-2 border-[#f4f2f0] text-[#181411] font-bold text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
