import React, { useState, useEffect } from 'react';
import baseAPI from '../../api/baseApi';
import toast from 'react-hot-toast';
// 1. Import untils và Context
import { untils } from '../../../languages/untils';

const Addresses = () => {
  // 2. Kích hoạt hook

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
      toast.error(untils.mess("addresses.toast.load_error"));
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
        toast.success(untils.mess("addresses.toast.update_success"));
      } else {
        await baseAPI.post('/addresses/', formData);
        toast.success(untils.mess("addresses.toast.add_success"));
      }
      setIsModalOpen(false);
      fetchAddresses();
    } catch (error) {
      toast.error(untils.mess("addresses.toast.save_error"));
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
    if (!window.confirm(untils.mess("addresses.card.confirm_delete"))) return;
    try {
      await baseAPI.delete(`/addresses/${id}`);
      toast.success(untils.mess("addresses.toast.delete_success"));
      fetchAddresses();
    } catch (error) {
      toast.error(error.response?.data?.detail || untils.mess("addresses.toast.delete_error"));
    }
  };

  // Cấu hình loại địa chỉ để map ngôn ngữ nhưng giữ nguyên value gửi API
  const addressTypes = [
    { value: 'Nhà riêng', labelKey: 'addresses.card.type.home' },
    { value: 'Văn phòng', labelKey: 'addresses.card.type.office' }
  ];

  if (loading) return <div className="p-10 text-center">{untils.mess("addresses.loading")}</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-[#181411]">
          {untils.mess("addresses.title")}
        </h2>
        <button 
          onClick={() => { setEditingId(null); setIsModalOpen(true); setFormData({receiver_name: '', receiver_phone: '', province: '', district: '', ward: '', street_details: '', type: 'Nhà riêng', is_default: false}); }}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span> {untils.mess("addresses.btn_add")}
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
                <span className="px-2 py-0.5 border border-gray-200 text-gray-500 text-[10px] rounded uppercase">
                  {/* Map lại label hiển thị dựa trên value từ API */}
                  {addressTypes.find(t => t.value === addr.type) 
                    ? untils.mess(addressTypes.find(t => t.value === addr.type).labelKey) 
                    : addr.type}
                </span>
                {addr.is_default && (
                  <span className="px-2 py-0.5 border border-primary text-primary text-[10px] font-bold uppercase rounded">
                    {untils.mess("addresses.card.default")}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <button onClick={() => openEdit(addr)} className="text-sm text-blue-600 hover:underline">
                {untils.mess("addresses.card.btn_update")}
              </button>
              {!addr.is_default && (
                <button onClick={() => deleteAddress(addr.id)} className="text-sm text-red-500 hover:underline">
                  {untils.mess("addresses.card.btn_delete")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-6">
              {editingId ? untils.mess("addresses.modal.title_edit") : untils.mess("addresses.modal.title_add")}
            </h3>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder={untils.mess("addresses.modal.placeholders.name")} value={formData.receiver_name} onChange={e => setFormData({...formData, receiver_name: e.target.value})} required />
              <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder={untils.mess("addresses.modal.placeholders.phone")} value={formData.receiver_phone} onChange={e => setFormData({...formData, receiver_phone: e.target.value})} required />
              
              <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder={untils.mess("addresses.modal.placeholders.province")} value={formData.province} onChange={e => setFormData({...formData, province: e.target.value})} required />
              <input className="col-span-1 p-2.5 border rounded-lg text-sm" placeholder={untils.mess("addresses.modal.placeholders.district")} value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} required />
              <input className="col-span-2 p-2.5 border rounded-lg text-sm" placeholder={untils.mess("addresses.modal.placeholders.ward")} value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})} required />
              <input className="col-span-2 p-2.5 border rounded-lg text-sm" placeholder={untils.mess("addresses.modal.placeholders.details")} value={formData.street_details} onChange={e => setFormData({...formData, street_details: e.target.value})} required />
              
              <div className="col-span-2 flex gap-4 mt-2">
                {addressTypes.map(t => (
                  <label key={t.value} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={formData.type === t.value} 
                      onChange={() => setFormData({...formData, type: t.value})} 
                    /> 
                    {untils.mess(t.labelKey)}
                  </label>
                ))}
              </div>

              <label className="col-span-2 flex items-center gap-2 text-sm cursor-pointer mt-2">
                <input type="checkbox" checked={formData.is_default} onChange={e => setFormData({...formData, is_default: e.target.checked})} disabled={editingId && addresses.find(a => a.id === editingId)?.is_default} /> 
                {untils.mess("addresses.modal.labels.set_default")}
              </label>

              <div className="col-span-2 flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 font-bold">
                  {untils.mess("addresses.modal.btn_back")}
                </button>
                <button type="submit" className="bg-primary text-white px-8 py-2 rounded-lg font-bold">
                  {untils.mess("addresses.modal.btn_save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;