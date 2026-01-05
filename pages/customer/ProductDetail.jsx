import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ProductCard from './components/common/ProductCard';
import { untils } from "../../languages/untils";
import { 
  ShoppingBag, 
  ChevronRight, 
  Minus, 
  Plus, 
  Loader2 
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // State chứa toàn bộ dữ liệu từ API
  const [data, setData] = useState({ 
    product: null, 
    related: [], 
    colors: [], 
    storages: [], 
    sizes: [] 
  });
  
  const [loading, setLoading] = useState(true);
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // State cho các lựa chọn người dùng
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}`);
        const { product, related, colors, storages, sizes } = res.data;
        console.log("Res", res.data)
        setData({ product, related, colors, storages, sizes });

        if (colors && colors.length > 0) setSelectedColor(colors[0]);
        if (storages && storages.length > 0) setSelectedStorage(storages[0]);
        if (sizes && sizes.length > 0) setSelectedSize(sizes[0]);

        setQuantity(1);
        setActiveThumb(0);
      } catch (error) {
        console.error("Lỗi lấy chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 bg-white">
      <Loader2 className="animate-spin text-primary mb-4" size={40} />
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{untils.mess("productDetail.loading")}</p>
    </div>
  );

  const { product, related, colors, storages, sizes } = data;
  if (!product) return <div className="p-20 text-center font-bold text-slate-500">{untils.mess("productDetail.not_found")}</div>;

  const allImages = [product.main_image, ...(product.images?.map(img => img.image_url) || [])];

  const handleAddToCart = async () => {
    const variantData = {
      color: selectedColor,
      storage: selectedStorage,
      size: selectedSize
    };
    await addToCart(product, quantity, variantData);
  };

  return (
    <div className="bg-white font-sans text-slate-900">
      <section className="py-12 border-b border-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          
          {/* Breadcrumb */}
          <nav className="flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-slate-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Gallery */}
            <div className="space-y-6">
              <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                <img alt={product.name} className="w-full h-full object-cover" src={allImages[activeThumb]} />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((thumb, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveThumb(i)} 
                    className={`size-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeThumb === i ? 'border-primary' : 'border-transparent bg-slate-50'}`}
                  >
                    <img alt="thumb" className="w-full h-full object-cover" src={thumb} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col py-2">
              <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight uppercase tracking-tight">{product.name}</h1>
              
              <div className="mb-10 pb-8 border-b border-slate-100">
                <span className="text-4xl font-black text-primary">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </span>
              </div>

              <div className="space-y-10 mb-12">
                {colors.length > 0 && (
                  <OptionGroup label="Màu sắc" options={colors} selected={selectedColor} onSelect={setSelectedColor} />
                )}
                
                {storages.length > 0 && (
                  <OptionGroup label="Dung lượng" options={storages} selected={selectedStorage} onSelect={setSelectedStorage} />
                )}

                {sizes.length > 0 && (
                  <OptionGroup label="Kích thước" options={sizes} selected={selectedSize} onSelect={setSelectedSize} />
                )}
              </div>

              <div className="flex items-center gap-6 mt-auto pt-10 border-t border-slate-100">
                <div className="flex items-center bg-slate-100 rounded-2xl p-1 shrink-0">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="size-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"><Minus size={18}/></button>
                  <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q+1)} className="size-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"><Plus size={18}/></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-slate-900 text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all active:scale-95 uppercase text-[11px] tracking-widest"
                >
                  <ShoppingBag size={18} />
                  {untils.mess("productDetail.btn_add_to_cart")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <h2 className="text-xl font-bold mb-10 uppercase tracking-widest border-l-4 border-primary pl-4">
            {untils.mess("productDetail.related_products")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

const OptionGroup = ({ label, options, selected, onSelect }) => (
  <div>
    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
      {label}: <span className="text-slate-900">{selected}</span>
    </h3>
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-6 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${
            selected === opt 
            ? 'border-primary text-primary bg-white shadow-sm' 
            : 'border-slate-50 bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default ProductDetail;