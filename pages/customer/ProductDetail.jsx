
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../../data';
import {useCart} from '../context/CartContext';
import ProductCard from './components/common/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[0]);
      setSelectedColor(found.colors[0]);
    }
  }, [id]);

  if (!product) return <div className="p-20 text-center">Loading...</div>;

  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice) : null;

  return (
    <div className="bg-white">
      <div className="bg-background-light py-4 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <nav className="flex text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="hover:text-primary transition-colors">{product.category}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="hover:text-primary transition-colors">{product.brand}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#181411] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img alt={product.name} className="w-full h-full object-cover object-center" src={product.image} />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-md">-{product.discount}%</div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.thumbnails.map((thumb, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveThumb(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeThumb === i ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/50 opacity-70 hover:opacity-100'}`}
                  >
                    <img alt={`Thumb ${i}`} className="w-full h-full object-cover" src={thumb} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-start">
              <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2">{product.brand}</span>
              <h1 className="text-[#181411] text-3xl md:text-4xl font-bold leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[20px] fill-current">star</span>
                  ))}
                </div>
                <span className="text-gray-500 text-sm font-medium border-l border-gray-300 pl-4">{product.reviewsCount} Đánh giá</span>
                <span className="text-gray-500 text-sm font-medium border-l border-gray-300 pl-4">Đã bán {(product.soldCount/1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-baseline gap-3 mb-6 bg-gray-50 p-4 rounded-xl">
                <span className="text-3xl font-bold text-primary">{formattedPrice}</span>
                {formattedOriginalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through decoration-1">{formattedOriginalPrice}</span>
                    <span className="ml-auto text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">Tiết kiệm {product.discount}%</span>
                  </>
                )}
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <div className="h-px bg-gray-100 w-full mb-8"></div>
              
              <div className="mb-6">
                <h3 className="font-bold text-[#181411] mb-3">Màu sắc: <span className="font-normal text-gray-600">{selectedColor}</span></h3>
                <div className="flex items-center gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color} 
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-primary border-transparent' : 'border-gray-200 hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-[#181411]">Kích thước</h3>
                  <button className="text-primary text-sm font-medium hover:underline">Bảng quy đổi size</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border-2 ${selectedSize === size ? 'bg-primary text-white border-primary shadow-md shadow-primary/30' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <div className="flex items-center border border-gray-200 rounded-lg h-[52px] w-fit">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 rounded-l-lg transition-colors">
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                  <input readOnly className="w-12 text-center border-none focus:ring-0 text-[#181411] font-bold p-0" value={quantity} />
                  <button onClick={() => setQuantity(q => q+1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 rounded-r-lg transition-colors">
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
                <button 
                  onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg h-[52px] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Tabs */}
      <section className="py-12 bg-background-light">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <button className="px-6 py-4 border-b-2 border-primary text-primary font-bold text-base">Mô tả sản phẩm</button>
              <button className="px-6 py-4 border-b-2 border-transparent text-gray-500 hover:text-[#181411] font-medium text-base">Đánh giá ({product.reviewsCount})</button>
              <button className="px-6 py-4 border-b-2 border-transparent text-gray-500 hover:text-[#181411] font-medium text-base">Chính sách bảo hành</button>
            </div>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">{product.description}</p>
              <h3 className="text-[#181411] font-bold text-lg mt-6 mb-3">Điểm nổi bật:</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Công nghệ tiên tiến mang lại khả năng đệm êm ái, nhẹ nhàng suốt cả ngày.</li>
                <li>Đế ngoài bằng cao su cung cấp độ bám và độ bền tuyệt vời.</li>
                <li>Cổ giày được đệm mềm mại tạo cảm giác thoải mái.</li>
                <li>Màu sắc phối hợp độc đáo, dễ dàng kết hợp trang phục.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <h2 className="text-[#181411] text-2xl font-bold mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
