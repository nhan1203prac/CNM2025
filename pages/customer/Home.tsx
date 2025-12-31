
import React from 'react';
import ProductCard from './components/common/ProductCard';
import { PRODUCTS } from '../../data';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <section className="w-full bg-white pb-8">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40 py-5">
          <div className="rounded-2xl overflow-hidden relative shadow-lg">
            <div 
              className="flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center p-8 md:p-16" 
              style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC22Ci_DP5nozn1gM28i2Tdth35WykBW2re-Pn6irPgVW1gb7dgi2vMFFrvvxFUZpEFmJh3nHjm8gHdWainNUttsVSCcZx_a88HwTT5ouywmGSZWajWrNTeGU-5S2cH9NjxeotviGsVVoMlXW_pYY0zrDU5MZFtZfPW3whqCVLsLDw13onJBi3_3j_2ZrWTsb_kD_14ZPLKVVj6kkQXQlZfgzbfUKlcMw9BNGPvc1CbqysQiO5wgD0SXNSNyVg8NLt0yzmvrXlCbfZY")` }}
            >
              <div className="flex flex-col gap-4 text-left max-w-lg">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full w-fit">Summer Collection</span>
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-sm">
                  Khuyến mãi <br/> <span className="text-primary">Mùa hè rực rỡ</span>
                </h1>
                <h2 className="text-gray-100 text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
                  Giảm giá lên đến 50% cho tất cả các sản phẩm thời trang và phụ kiện.
                </h2>
                <div className="pt-4">
                  <button className="bg-primary hover:bg-primary/90 text-white text-base font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/30 transition-transform transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    Mua ngay
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-8 bg-background-light">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#181411] text-2xl md:text-[32px] font-bold leading-tight">Danh mục nổi bật</h2>
            <a className="text-primary font-bold text-sm flex items-center hover:underline" href="#">Xem tất cả <span className="material-symbols-outlined text-sm ml-1">chevron_right</span></a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Điện tử', count: '1.2k+', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxgP9EFAI4hYok9j6V3p2xjDNFzhd7nXCOlhQwk9QtLB1Sq84tKF6-mzIf8nW22n2GSVpEnoVTolA-NQfziHDM4LgpYYU1VsjYk3DWcjUTnLAImXH6NxDe6TGebwegCarwP1bE3cbueqSLn9zAUZbjRwkHYfjfSGMjnNWt-5Q1f4y4_hmQ4ioV6gheuAAoZCaVgf0jizvA1dFZhlzad8nYUtaAXZhMRaabiEMEE9KQI6Yfp7J5oLy9Dab3lRf5CJabToj32-SEG4b5' },
              { name: 'Thời trang', count: '3.5k+', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZW7nTcNYL95-BUX7kQLuQNud4c7gmkJZW5u-ehWMvLH0EGfgF3JOBrs1HYXUpPNS4K2fT8-7rwnaW6JmLW53GEWqfhEu714UhZx1OJjCwyVXBRGAPD6oJFEHHMJrp8W7eY2yZ6osiJKFICiAGNMIlItLwEHh517P3QL7RpBZuw4PAF9uxYuqLU8UTH62sc_iQgjL8AsE290GBmmV4JBB6Tu3TMsaDKN-SYeVazhj_OJjPDNMSCO8RZMDfzBFvtNlYoIG7JkpT9Q-r' },
              { name: 'Nhà cửa', count: '800+', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVxIbCMQjvIISIXp_3SCvK-Iz7crku4CPwXgTaJfyL6pKN2u1Cm96d_815w_sKY-9mdIntHkod2qgkDPHGyFg5x6U5opzXy2pz0k7rA0p2LYM1-FnpoJMNkQ0oi5662n6-XY6meJ1KNjb0kQhonn45XHNW3RExbevEiT4-J_b1S4p8R8b-4biMQRenfq0PUcpNkEgk8jj2FWoFnts_CWUpawLF5jUkWrcAC4kkfD9rNU8Ar8Ti7Ofu9ekc5qztMvAxrDrFr0S0tEL-' },
              { name: 'Làm đẹp', count: '2k+', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXONt566toVQWaxf-EFZt_SdJ8Q-IfPzo6YEqKelm6a13jVldO7s6cOwUa3YGKzxo_0DtxHXoYe4jfQOUJIsx8JiiK01KmVddfVp-fAoRdyWdw4E210IM4xY7tiv7MScWQqrnoiljW-5ybuUhFmxkhcaMJl6cnmvnEphRaBl6As12Qgyi2AP1stCD-3q_L38aOAnfjDbPv5h3jkogDZQj59iLf3D-oNcFUW2lCc-muju-qyiWOv7TR10Cg7zVQcPKtguzmR9otza6a' },
            ].map(cat => (
              <a key={cat.name} className="group flex flex-col gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20" href="#">
                <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url("${cat.img}")` }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#181411] text-lg font-bold group-hover:text-primary transition-colors">{cat.name}</p>
                    <p className="text-[#897261] text-sm">{cat.count} Sản phẩm</p>
                  </div>
                  <div className="size-8 rounded-full bg-background-light flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-[#181411] text-[32px] font-bold leading-tight">Sản phẩm bán chạy</h2>
              <p className="text-gray-500 mt-1">Được khách hàng yêu thích nhất tuần này</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium">Tất cả</button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition-colors">Thời trang</button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition-colors">Điện tử</button>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
          <div className="mt-12 flex justify-center">
            <button className="px-8 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              Xem thêm sản phẩm
            </button>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-12 px-4 lg:px-40 bg-background-light">
        <div className="max-w-[1440px] mx-auto rounded-2xl overflow-hidden bg-background-dark relative flex flex-col md:flex-row shadow-2xl">
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-start gap-4 relative z-10">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Ưu đãi độc quyền</span>
            <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">Đăng ký thành viên mới <br/>Nhận ngay voucher 100k</h2>
            <p className="text-gray-400 max-w-md">Trải nghiệm mua sắm tuyệt vời với hàng ngàn ưu đãi hấp dẫn đang chờ đón bạn.</p>
            <button className="mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors">Đăng ký ngay</button>
          </div>
          <div className="md:w-1/2 min-h-[300px] bg-cover bg-center relative" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSxD9CIyd50VqYJIDsmy-rqatN-MqUgOZzKueBLiUwPBHOjagS3OLOfuSWxsYuKlZ7UhPIHwaZ3fPH8PcLULPmuFJVwr1ACLIymAeqczuFc91mtDdoRlVbEK1XyNxOVAiCXw7ynAY01hXtGOyVNwNRaJubjmB8VjExOpUqayMPHv1Sjhl_rCJu5w1Z2GNkelQEkk5NgyJlbfKCM7nQZ9smTWkR5DOdU9v77UToCo0j85MEaGr959nqao6wimanfJjLtWAmBRB8rK3v")` }}>
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background-dark to-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
