
import React from 'react';
import AccountLayout from '../../components/account/AccountLayout';
import { MOCK_ORDERS, PRODUCTS } from '../../data';
import ProductCard from '../../components/common/ProductCard';

const Dashboard: React.FC = () => {
  return (
    <AccountLayout>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#181411]">3</p>
              <p className="text-sm text-gray-500">Đơn hàng đang xử lý</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="size-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#181411]">12</p>
              <p className="text-sm text-gray-500">Đơn hàng thành công</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="size-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <span className="material-symbols-outlined text-2xl">favorite</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#181411]">5</p>
              <p className="text-sm text-gray-500">Sản phẩm yêu thích</p>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#181411]">Đơn hàng gần đây</h2>
            <a className="text-primary text-sm font-bold hover:underline" href="#">Xem tất cả</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Mã đơn hàng</th>
                  <th className="px-6 py-4 font-medium">Ngày đặt</th>
                  <th className="px-6 py-4 font-medium">Sản phẩm</th>
                  <th className="px-6 py-4 font-medium">Tổng tiền</th>
                  <th className="px-6 py-4 font-medium">Trạng thái</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_ORDERS.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#181411]">#{order.id}</td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">{order.items[0].name}...</td>
                    <td className="px-6 py-4 font-bold text-primary">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-primary transition-colors">Chi tiết</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#181411]">Sản phẩm yêu thích</h2>
            <a className="text-primary text-sm font-bold hover:underline" href="#">Xem tất cả</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PRODUCTS.slice(0, 3).map(p => (
              <div key={p.id} className="flex flex-col gap-3 group">
                <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                  <button className="absolute top-3 right-3 size-8 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-lg fill-current">favorite</span>
                  </button>
                  <img alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={p.image} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#181411] text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">{p.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-primary text-base font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}</span>
                    <button className="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors text-[#181411]">
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AccountLayout>
  );
};

export default Dashboard;
