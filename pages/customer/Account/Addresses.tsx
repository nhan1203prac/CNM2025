import React, { useState } from 'react';
import AccountLayout from '../components/account/AccountLayout';

interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
  type: 'Nhà riêng' | 'Văn phòng';
}

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      phone: '0912 345 678',
      province: 'TP. Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Phường Bến Thành',
      street: '123 Đường Lê Lợi',
      isDefault: true,
      type: 'Nhà riêng'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // State cho Form
  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn A',
    phone: '0912 345 678',
    province: '',
    district: '',
    ward: '',
    street: '',
    type: 'Nhà riêng' as 'Nhà riêng' | 'Văn phòng'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(prev => prev.map(a => a.id === editingId ? { ...a, ...formData } : a));
    } else {
      const newAddr: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddr]);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  const openEdit = (addr: Address) => {
    setFormData({ ...addr });
    setEditingId(addr.id);
    setIsModalOpen(true);
  };

  return (
    <AccountLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-[#181411]">Địa chỉ của tôi</h2>
          <button 
            onClick={() => { setEditingId(null); setIsModalOpen(true); }}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span> Thêm địa chỉ mới
          </button>
        </div>

        {/* Danh sách địa chỉ */}
        <div className="space-y-4">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold">{addr.name}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500 text-sm">{addr.phone}</span>
                </div>
                <p className="text-sm text-gray-600">{addr.street}</p>
                <p className="text-sm text-gray-600">{`${addr.ward}, ${addr.district}, ${addr.province}`}</p>
                {addr.isDefault && (
                  <span className="mt-2 inline-block px-2 py-0.5 border border-primary text-primary text-[10px] font-bold uppercase rounded">Mặc định</span>
                )}
              </div>
              <div className="flex flex-col gap-2 text-right">
                <button onClick={() => openEdit(addr)} className="text-sm text-blue-600 hover:underline">Cập nhật</button>
                {!addr.isDefault && <button onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))} className="text-sm text-red-500 hover:underline">Xóa</button>}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold mb-6">{editingId ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</h3>
              <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
                <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder="Họ và tên" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder="Số điện thoại" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                
                <select className="col-span-1 p-2.5 border rounded-lg text-sm" value={formData.province} onChange={e => setFormData({...formData, province: e.target.value})} required>
                  <option value="">Tỉnh/Thành phố</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                </select>
                
                <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder="Quận/Huyện" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} required />
                <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder="Phường/Xã" value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})} required />
                <input className="col-span-2 p-2.5 border rounded-lg text-sm" placeholder="Tên đường, Tòa nhà, Số nhà" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} required />
                
                <div className="col-span-2 flex gap-4 mt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="type" checked={formData.type === 'Nhà riêng'} onChange={() => setFormData({...formData, type: 'Nhà riêng'})} /> Nhà riêng
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="type" checked={formData.type === 'Văn phòng'} onChange={() => setFormData({...formData, type: 'Văn phòng'})} /> Văn phòng
                  </label>
                </div>

                <div className="col-span-2 flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold">Trở Lại</button>
                  <button type="submit" className="bg-primary text-white px-8 py-2 rounded-lg font-bold">Hoàn thành</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Addresses;