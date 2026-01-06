import React, { useState, useEffect } from 'react';
import baseAPI from '../../api/baseApi';
import toast from 'react-hot-toast';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    receiver_name: '',
    receiver_phone: '',
    province: '',
    district: '',
    ward: '',
    street_details: '',
    type: 'Nhà riêng',
    is_default: false
  });

  const fetchAddresses = async () => {
    try {
      const res = await baseAPI.get('/addresses/');
      setAddresses(res.data);
    } catch (error) {
      toast.error("Lỗi tải danh sách địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAddresses(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await baseAPI.put(`/addresses/${editingId}`, formData);
        toast.success("Cập nhật thành công");
      } else {
        await baseAPI.post('/addresses/', formData);
        toast.success("Thêm địa chỉ thành công");
      }
      setIsModalOpen(false);
      fetchAddresses();
    } catch (error) {
      toast.error("Lỗi lưu địa chỉ");
    }
  };

  const openEdit = (addr) => {
    setFormData({
      receiver_name: addr.receiver_name,
      receiver_phone: addr.receiver_phone,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      street_details: addr.street_details,
      type: addr.type,
      is_default: addr.is_default
    });
    setEditingId(addr.id);
    setIsModalOpen(true);
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Bạn muốn xóa địa chỉ này?")) return;
    try {
      await baseAPI.delete(`/addresses/${id}`);
      toast.success("Đã xóa");
      fetchAddresses();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Lỗi xóa địa chỉ");
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-[#181411]">Địa chỉ của tôi</h2>
        <button 
          onClick={() => { setEditingId(null); setIsModalOpen(true); setFormData({receiver_name: '', receiver_phone: '', province: '', district: '', ward: '', street_details: '', type: 'Nhà riêng', is_default: false}); }}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span> Thêm địa chỉ mới
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">{addr.receiver_name}</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 text-sm">{addr.receiver_phone}</span>
              </div>
              <p className="text-sm text-gray-600">{addr.street_details}</p>
              <p className="text-sm text-gray-600">{`${addr.ward}, ${addr.district}, ${addr.province}`}</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 border border-gray-200 text-gray-500 text-[10px] rounded uppercase">{addr.type}</span>
                {addr.is_default && (
                  <span className="px-2 py-0.5 border border-primary text-primary text-[10px] font-bold uppercase rounded">Mặc định</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <button onClick={() => openEdit(addr)} className="text-sm text-blue-600 hover:underline">Cập nhật</button>
              {!addr.is_default && <button onClick={() => deleteAddress(addr.id)} className="text-sm text-red-500 hover:underline">Xóa</button>}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-6">{editingId ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</h3>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder="Họ và tên người nhận" value={formData.receiver_name} onChange={e => setFormData({...formData, receiver_name: e.target.value})} required />
              <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder="Số điện thoại" value={formData.receiver_phone} onChange={e => setFormData({...formData, receiver_phone: e.target.value})} required />
              
              <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder="Tỉnh/Thành phố" value={formData.province} onChange={e => setFormData({...formData, province: e.target.value})} required />
              <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder="Quận/Huyện" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} required />
              <input className="col-span-2 p-2.5 border rounded-lg text-sm" placeholder="Phường/Xã" value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})} required />
              <input className="col-span-2 p-2.5 border rounded-lg text-sm" placeholder="Tên đường, Tòa nhà, Số nhà" value={formData.street_details} onChange={e => setFormData({...formData, street_details: e.target.value})} required />
              
              <div className="col-span-2 flex gap-4 mt-2">
                {['Nhà riêng', 'Văn phòng'].map(t => (
                  <label key={t} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="type" checked={formData.type === t} onChange={() => setFormData({...formData, type: t})} /> {t}
                  </label>
                ))}
              </div>

              <label className="col-span-2 flex items-center gap-2 text-sm cursor-pointer mt-2">
                <input type="checkbox" checked={formData.is_default} onChange={e => setFormData({...formData, is_default: e.target.checked})} disabled={editingId && addresses.find(a => a.id === editingId)?.is_default} /> Đặt làm địa chỉ mặc định
              </label>

              <div className="col-span-2 flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold">Trở Lại</button>
                <button type="submit" className="bg-primary text-white px-8 py-2 rounded-lg font-bold">Hoàn thành</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;