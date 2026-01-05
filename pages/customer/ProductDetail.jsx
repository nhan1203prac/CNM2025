import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ProductCard from './components/common/ProductCard';
// 1. Import untils và Context
import { untils } from "../../languages/untils";

const ProductDetail = () => {
  // 2. Kích hoạt hook

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // Lưu ý: Đảm bảo đường dẫn API chính xác với môi trường của bạn
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}`);
        const data = res.data;
        setProduct(data);

        // Logic set default value giữ nguyên
        if (data.category_id === 1 || data.category_id === 2) {
          setSelectedColor('Đen');
          setSelectedStorage('256GB');
        } else if (data.category_id === 3) {
          setSelectedSize('M');
        }

        const relatedRes = await axios.get(`http://127.0.0.1:8000/api/v1/products?category_id=${data.category_id}`);
        setRelatedProducts(relatedRes.data.filter(p => p.id !== parseInt(id)).slice(0, 4));
      } catch (error) {
        console.error("Lỗi lấy chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  if (loading) return <div className="p-20 text-center">{untils.mess("productDetail.loading")}</div>;
  if (!product) return <div className="p-20 text-center">{untils.mess("productDetail.not_found")}</div>;

  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
  const allImages = [product.main_image, ...(product.images?.map(img => img.image_url) || [])];

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
  };

  // Định nghĩa các tùy chọn để dễ map ngôn ngữ
  // Value: giá trị dùng cho logic (giữ nguyên tiếng Việt nếu backend cần)
  // LabelKey: key trong file ngôn ngữ để hiển thị
  const colorOptions = [
    { value: 'Đen', labelKey: 'productDetail.variants.black' },
    { value: 'Trắng', labelKey: 'productDetail.variants.white' },
    { value: 'Tím', labelKey: 'productDetail.variants.purple' }
  ];

  const storageOptions = ['256GB', '512GB', '1T']; // Số liệu thường không cần dịch
  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']; // Size chuẩn quốc tế không cần dịch

  return (
    <div className="bg-white">
      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
      
            {/* Gallery Images */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img alt={product.name} className="w-full h-full object-cover" src={allImages[activeThumb]} />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((thumb, i) => (
                  <button key={i} onClick={() => setActiveThumb(i)} className={`aspect-square rounded-xl overflow-hidden border-2 ${activeThumb === i ? 'border-primary' : 'border-gray-200'}`}>
                    <img alt="thumb" className="w-full h-full object-cover" src={thumb} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="bg-gray-50 p-4 rounded-xl mb-8">
                <span className="text-3xl font-bold text-primary">{formattedPrice}</span>
              </div>

              <div className="space-y-6 mb-8">
                {(product.category_id === 1 || product.category_id === 2) && (
                  <>
                    {/* Colors */}
                    <div>
                      <h3 className="font-bold mb-3">
                        {untils.mess("productDetail.labels.color")}: <span className="text-primary">
                          {/* Hiển thị tên màu đang chọn theo ngôn ngữ hiện tại */}
                          {colorOptions.find(c => c.value === selectedColor) 
                            ? untils.mess(colorOptions.find(c => c.value === selectedColor).labelKey)
                            : selectedColor}
                        </span>
                      </h3>
                      <div className="flex gap-3">
                        {colorOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setSelectedColor(option.value)}
                            className={`px-4 py-2 rounded-md border transition-all ${selectedColor === option.value ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200'}`}
                          >
                            {untils.mess(option.labelKey)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Storage */}
                    <div>
                      <h3 className="font-bold mb-3">
                        {untils.mess("productDetail.labels.storage")}: <span className="text-primary">{selectedStorage}</span>
                      </h3>
                      <div className="flex gap-3">
                        {storageOptions.map(cap => (
                          <button
                            key={cap}
                            onClick={() => setSelectedStorage(cap)}
                            className={`px-4 py-2 rounded-md border transition-all ${selectedStorage === cap ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200'}`}
                          >
                            {cap}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {product.category_id === 3 && (
                  <div>
                    <h3 className="font-bold mb-3">
                        {untils.mess("productDetail.labels.size")}: <span className="text-primary">{selectedSize}</span>
                    </h3>
                    <div className="flex gap-3">
                      {sizeOptions.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 flex items-center justify-center rounded-md border transition-all ${selectedSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <div className="flex items-center border border-gray-200 rounded-lg h-[52px]">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-10 h-full hover:bg-gray-50">-</button>
                  <input readOnly className="w-12 text-center font-bold" value={quantity} />
                  <button onClick={() => setQuantity(q => q+1)} className="w-10 h-full hover:bg-gray-50">+</button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white font-bold rounded-lg h-[52px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  {untils.mess("productDetail.btn_add_to_cart")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <h2 className="text-2xl font-bold mb-8">
            {untils.mess("productDetail.related_products")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;