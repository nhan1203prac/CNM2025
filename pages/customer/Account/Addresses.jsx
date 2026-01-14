import React, { useState, useEffect } from 'react';
import baseAPI from '../../api/baseApi';
import toast from 'react-hot-toast';
import { untils } from '../../../languages/untils';
import { 
  Loader2, Plus, MapPin, Phone, Home, 
  Briefcase, Trash2, Edit3, CheckCircle2, X 
} from 'lucide-react';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // GHN Data State
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [formData, setFormData] = useState({
    receiver_name: '',
    receiver_phone: '',
    province: '',
    province_id: '',
    district: '',
    district_id: '',
    ward: '',
    ward_code: '',
    street_details: '',
    type: 'Nhà riêng',
    is_default: false
  });

  // 1. Lấy danh sách địa chỉ của User
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

  // 2. Load tỉnh thành khi mở Modal (Gọi API gộp mới)
  useEffect(() => {
    if (isModalOpen && provinces.length === 0) {
      baseAPI.get('/addresses/provinces')
        .then(res => setProvinces(res.data))
        .catch(() => toast.error("Lỗi tải danh sách tỉnh thành"));
    }
  }, [isModalOpen]);

  // 3. Xử lý thay đổi Tỉnh -> Huyện
  const handleProvinceChange = async (e) => {
    const pId = e.target.value;
    const pName = provinces.find(p => p.ProvinceID === parseInt(pId))?.ProvinceName;
    
    setFormData({ ...formData, province_id: pId, province: pName, district: '', district_id: '', ward: '', ward_code: '' });
    setDistricts([]);
    setWards([]);

    if (pId) {
      const res = await baseAPI.get(`/addresses/districts?province_id=${pId}`);
      setDistricts(res.data);
    }
  };

  // 4. Xử lý thay đổi Huyện -> Xã
  const handleDistrictChange = async (e) => {
    const dId = e.target.value;
    const dName = districts.find(d => d.DistrictID === parseInt(dId))?.DistrictName;
    
    setFormData({ ...formData, district_id: dId, district: dName, ward: '', ward_code: '' });
    setWards([]);

    if (dId) {
      const res = await baseAPI.get(`/addresses/wards?district_id=${dId}`);
      setWards(res.data);
    }
  };

  // 5. Lưu hoặc Cập nhật
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

  // 6. Mở Modal Sửa (Tự động load lại Huyện/Xã để hiển thị đúng select)
  const openEdit = async (addr) => {
  try {
    toast.loading("Đang tải dữ liệu...", { id: "loading-edit" });

    // Gọi API nạp danh sách option trước
    const [resDistricts, resWards] = await Promise.all([
      baseAPI.get(`/addresses/districts?province_id=${addr.province_id}`),
      baseAPI.get(`/addresses/wards?district_id=${addr.district_id}`)
    ]);

    setDistricts(resDistricts.data);
    setWards(resWards.data);

    // Đổ dữ liệu và ÉP KIỂU String cho các ID để Select nhận diện được
    setFormData({
      ...addr,
      province_id: String(addr.province_id),
      district_id: String(addr.district_id),
      ward_code: String(addr.ward_code),
    });

    setEditingId(addr.id);
    setIsModalOpen(true);
    toast.dismiss("loading-edit");
  } catch (error) {
    toast.dismiss("loading-edit");
    toast.error("Lỗi đồng bộ dữ liệu");
  }
};

  const deleteAddress = async (id) => {
    if (!window.confirm(untils.mess("addresses.card.confirm_delete"))) return;
    try {
      await baseAPI.delete(`/addresses/${id}`);
      toast.success(untils.mess("addresses.toast.delete_success"));
      fetchAddresses();
    } catch (error) {
      toast.error(untils.mess("addresses.toast.delete_error"));
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-slate-900">
            {untils.mess("addresses.title")}
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mt-1 italic">Dữ liệu đồng bộ GHN Sandbox</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setIsModalOpen(true); setFormData({receiver_name: '', receiver_phone: '', province: '', province_id: '', district: '', district_id: '', ward: '', ward_code: '', street_details: '', type: 'Nhà riêng', is_default: false}); }}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-primary transition-all shadow-lg"
        >
          <Plus size={16} /> {untils.mess("addresses.btn_add")}
        </button>
      </div>

      {/* Address Cards List */}
      <div className="grid gap-4">
        {addresses.map(addr => (
          <div key={addr.id} className={`bg-white p-6 rounded-[32px] border-2 flex flex-col md:flex-row justify-between items-center transition-all ${addr.is_default ? 'border-primary/20 shadow-lg shadow-primary/5' : 'border-slate-50'}`}>
            <div className="flex gap-5 w-full">
              <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 ${addr.is_default ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                {addr.type === 'Văn phòng' ? <Briefcase size={22} /> : <Home size={22} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-black uppercase text-sm">{addr.receiver_name}</span>
                  {addr.is_default && <span className="text-[9px] bg-primary text-white px-2 py-0.5 rounded-lg font-black uppercase">Mặc định</span>}
                </div>
                <p className="text-slate-500 text-xs font-bold mb-2 flex items-center gap-1"><Phone size={12}/> {addr.receiver_phone}</p>
                <p className="text-slate-400 text-sm font-medium"><MapPin size={12} className="inline mr-1"/> {addr.street_details}, {addr.ward}, {addr.district}, {addr.province}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 w-full md:w-auto shrink-0">
              <button onClick={() => openEdit(addr)} className="flex-1 md:flex-none p-3 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"><Edit3 size={18}/></button>
              {!addr.is_default && <button onClick={() => deleteAddress(addr.id)} className="flex-1 md:flex-none p-3 hover:bg-red-50 rounded-xl text-red-400 transition-colors"><Trash2 size={18}/></button>}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-[40px] p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
            <h3 className="text-2xl font-black uppercase italic mb-8 border-b pb-4 text-slate-900">
              {editingId ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
            </h3>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none" placeholder="Tên người nhận" value={formData.receiver_name} onChange={e => setFormData({...formData, receiver_name: e.target.value})} required />
                <input className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none" placeholder="Số điện thoại" value={formData.receiver_phone} onChange={e => setFormData({...formData, receiver_phone: e.target.value})} required />
              </div>

              {/* GHN Selects */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none cursor-pointer" value={formData.province_id} onChange={handleProvinceChange} required>
                  <option value="">Tỉnh/Thành</option>
                  {provinces.map(p => <option key={p.ProvinceID} value={p.ProvinceID}>{p.ProvinceName}</option>)}
                </select>
                <select className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none cursor-pointer disabled:opacity-50" value={formData.district_id} onChange={handleDistrictChange} disabled={!formData.province_id} required>
                  <option value="">Quận/Huyện</option>
                  {districts.map(d => <option key={d.DistrictID} value={d.DistrictID}>{d.DistrictName}</option>)}
                </select>
                <select className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none cursor-pointer disabled:opacity-50" value={formData.ward_code} onChange={e => setFormData({...formData, ward_code: e.target.value, ward: wards.find(w => w.WardCode === e.target.value)?.WardName})} disabled={!formData.district_id} required>
                  <option value="">Phường/Xã</option>
                  {wards.map(w => <option key={w.WardCode} value={w.WardCode}>{w.WardName}</option>)}
                </select>
              </div>

              <input className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none" placeholder="Địa chỉ chi tiết (Số nhà, tên đường...)" value={formData.street_details} onChange={e => setFormData({...formData, street_details: e.target.value})} required />
              
              <div className="flex items-center justify-between px-2 pt-2">
                 <div className="flex gap-3">
                    {['Nhà riêng', 'Văn phòng'].map(t => (
                        <button type="button" key={t} onClick={() => setFormData({...formData, type: t})} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.type === t ? 'border-primary bg-primary/5 text-primary' : 'border-transparent bg-slate-50 text-slate-400'}`}>{t}</button>
                    ))}
                 </div>
                 <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="hidden" checked={formData.is_default} onChange={e => setFormData({...formData, is_default: e.target.checked})} />
                    <div className={`size-5 rounded-lg border-2 flex items-center justify-center transition-all ${formData.is_default ? 'bg-primary border-primary' : 'border-slate-200'}`}>
                        {formData.is_default && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-400">Mặc định</span>
                 </label>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 font-black uppercase text-[10px] tracking-widest text-slate-400">Hủy bỏ</button>
                <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary shadow-xl shadow-slate-200 transition-all">Lưu địa chỉ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;