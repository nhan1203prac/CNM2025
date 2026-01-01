import React, { useEffect, useState } from "react";
import ProductCard from "./components/common/ProductCard";
import { Link } from "react-router-dom";
import baseAPI from "../api/baseApi";

const Home = () => {
  const [data, setData] = useState({ categories: [], products: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await baseAPI.get("/home");
        setData({
          categories: response.data.featured_categories,
          products: response.data.best_sellers,
        });
        console.log("home", response.data)
      } catch (error) {
        console.error("Failed to load home data");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const filteredProducts = activeTab
    ? data.products.filter((p) => p.category_id === activeTab)
    : data.products;

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const onToggleFavorite = (productId, isFavorite) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, is_favorite: isFavorite } : p
      ),
    }));
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <section className="w-full bg-white pb-8">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-5">
          <div className="rounded-2xl overflow-hidden relative shadow-lg">
            <div
              className="flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center p-8 md:p-16"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC22Ci_DP5nozn1gM28i2Tdth35WykBW2re-Pn6irPgVW1gb7dgi2vMFFrvvxFUZpEFmJh3nHjm8gHdWainNUttsVSCcZx_a88HwTT5ouywmGSZWajWrNTeGU-5S2cH9NjxeotviGsVVoMlXW_pYY0zrDU5MZFtZfPW3whqCVLsLDw13onJBi3_3j_2ZrWTsb_kD_14ZPLKVVj6kkQXQlZfgzbfUKlcMw9BNGPvc1CbqysQiO5wgD0SXNSNyVg8NLt0yzmvrXlCbfZY")`,
              }}
            >
              <div className="flex flex-col gap-4 text-left max-w-lg">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full w-fit">
                  Summer Collection
                </span>
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-sm">
                  Khuyến mãi <br />{" "}
                  <span className="text-primary">Mùa hè rực rỡ</span>
                </h1>
                <h2 className="text-gray-100 text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
                  Giảm giá lên đến 50% cho tất cả các sản phẩm thời trang và phụ
                  kiện.
                </h2>
                <div className="pt-4">
                  <button className="bg-primary hover:bg-primary/90 text-white text-base font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/30 transition-transform transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    Mua ngay
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background-light">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#181411] text-2xl md:text-[32px] font-bold leading-tight">
              Danh mục nổi bật
            </h2>
            <Link
              to="/category"
              className="text-primary font-bold text-sm flex items-center hover:underline"
              href="#"
            >
              Xem tất cả{" "}
              <span className="material-symbols-outlined text-sm ml-1">
                chevron_right
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {data.categories.map((cat) => (
              <Link
                key={cat.id}
                className="group flex flex-col gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                to={`/products?category=${cat.id}`}
              >
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url("${cat.img}")` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#181411] text-lg font-bold group-hover:text-primary">
                      {cat.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {cat.product_count} Sản phẩm
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-[#181411] text-[32px] font-bold leading-tight">
                Sản phẩm bán chạy
              </h2>
              <p className="text-gray-500 mt-1">
                Được khách hàng yêu thích nhất tuần này
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setActiveTab(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === null
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tất cả
              </button>
              {data.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === cat.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onToggleFavorite={onToggleFavorite}/>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <span className="material-symbols-outlined text-6xl mb-2">
                  inventory_2
                </span>
                <p>Chưa có sản phẩm nào trong danh mục này</p>
              </div>
            )}
          </div>
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm flex items-center gap-2"
              >
                Xem thêm sản phẩm
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-4 lg:px-40 bg-background-light">
        <div className="max-w-[1440px] mx-auto rounded-2xl overflow-hidden bg-background-dark relative flex flex-col md:flex-row shadow-2xl">
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-start gap-4 relative z-10">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              Ưu đãi độc quyền
            </span>
            <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
              Đăng ký thành viên mới <br />
              Nhận ngay voucher 100k
            </h2>
            <p className="text-gray-400 max-w-md">
              Trải nghiệm mua sắm tuyệt vời với hàng ngàn ưu đãi hấp dẫn đang
              chờ đón bạn.
            </p>
            <button className="mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Đăng ký ngay
            </button>
          </div>
          <div
            className="md:w-1/2 min-h-[300px] bg-cover bg-center relative"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSxD9CIyd50VqYJIDsmy-rqatN-MqUgOZzKueBLiUwPBHOjagS3OLOfuSWxsYuKlZ7UhPIHwaZ3fPH8PcLULPmuFJVwr1ACLIymAeqczuFc91mtDdoRlVbEK1XyNxOVAiCXw7ynAY01hXtGOyVNwNRaJubjmB8VjExOpUqayMPHv1Sjhl_rCJu5w1Z2GNkelQEkk5NgyJlbfKCM7nQZ9smTWkR5DOdU9v77UToCo0j85MEaGr959nqao6wimanfJjLtWAmBRB8rK3v")`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background-dark to-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
