import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Loader2, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, loading, removeFromCart, addToCart, subtotal, totalItems } = useCart();

  const formatCurrency = (amount) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  if (loading && cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="px-4 lg:px-40 py-24 flex flex-col items-center justify-center text-center">
        <div className="size-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-2xl font-black uppercase italic mb-2">Giỏ hàng của bạn đang trống</h1>
        <p className="text-slate-500 font-medium mb-8">Có vẻ như bạn chưa chọn được món đồ ưng ý nào.</p>
        <Link to="/" className="bg-primary text-white font-black uppercase tracking-widest text-xs py-4 px-10 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all">
          Khám phá sản phẩm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      <div className="px-4 lg:px-40 py-10">
        <nav className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="mx-3">/</span>
          <span className="text-slate-900">Giỏ hàng</span>
        </nav>
        <h1 className="text-4xl font-black text-slate-900 uppercase italic">
          Giỏ hàng 
          <span className="text-xl font-bold text-primary ml-4 not-italic">({totalItems} món)</span>
        </h1>
      </div>

      <section className="px-4 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white rounded-2xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <div className="col-span-6">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-right">Thành tiền</div>
            </div>

            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-[32px] border border-slate-100 p-6 md:grid md:grid-cols-12 gap-6 items-center shadow-sm hover:shadow-md transition-shadow relative group"
                >
                  <div className="col-span-6 flex gap-6">
                    <div className="size-24 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shrink-0">
                      <img 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        src={item.image} 
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <Link to={`/product/${item.product_id}`}>
                          <h3 className="font-black text-slate-900 uppercase tracking-tight line-clamp-2 hover:text-primary transition-colors mb-2">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-lg border border-slate-100">
                            ID: #{item.product_id}
                          </span>
                          {item.color && <span className="text-[10px] font-bold bg-primary/5 text-primary px-2 py-1 rounded-lg border border-primary/10">{item.color}</span>}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors mt-2"
                      >
                        <Trash2 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Loại bỏ</span>
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center mt-4 md:mt-0">
                    <p className="text-[10px] md:hidden font-black uppercase text-slate-400 mb-1">Đơn giá</p>
                    <span className="font-bold text-slate-600">{formatCurrency(item.price)}</span>
                  </div>

                  <div className="col-span-2 flex justify-center mt-4 md:mt-0">
                    <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="size-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-slate-500"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart({ id: item.product_id }, 1)}
                        className="size-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-slate-500"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right mt-4 md:mt-0">
                    <p className="text-[10px] md:hidden font-black uppercase text-slate-400 mb-1">Thành tiền</p>
                    <span className="font-black text-primary text-lg italic tracking-tight">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 sticky top-28 shadow-sm">
              <h3 className="text-xl font-black uppercase italic mb-8 tracking-tight text-slate-900 border-b pb-4">
                Tổng kết đơn hàng
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Tạm tính ({totalItems} món)</span>
                  <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Vận chuyển</span>
                  <span className="text-[11px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Miễn phí</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-dashed border-slate-200 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">Tổng thanh toán</span>
                  <span className="text-3xl font-black text-primary italic tracking-tighter">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-slate-900 hover:bg-primary text-white py-5 rounded-2xl flex items-center justify-center gap-3 transition-all group shadow-xl shadow-slate-200"
              >
                <span className="text-xs font-black uppercase tracking-[2px]">Tiến hành thanh toán</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <p className="mt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                Sẵn sàng giao hàng đến tận tay bạn
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;