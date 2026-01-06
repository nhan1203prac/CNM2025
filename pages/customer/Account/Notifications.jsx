import React, { useState, useEffect } from 'react';
import baseAPI from '../../api/baseApi';
import toast from 'react-hot-toast';
import dayjs from 'dayjs'; 
// 1. Import untils và Context
import { untils } from '../../../languages/untils';

const Notifications = () => {
  // 2. Kích hoạt hook

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await baseAPI.get('/notifications/');
      setNotifications(res.data);
    } catch (error) {
      console.error(untils.mess("notifications.toast.load_error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const markAllAsRead = async () => {
    try {
      await baseAPI.post('/notifications/mark-all-read');
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      toast.success(untils.mess("notifications.toast.mark_all_success"));
    } catch (error) {
      toast.error(untils.mess("notifications.toast.action_fail"));
    }
  };

  const markOneAsRead = async (id, isAlreadyRead) => {
    if (isAlreadyRead) return;
    try {
      await baseAPI.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error(untils.mess("notifications.toast.mark_one_error"));
    }
  };


  if (loading) return <div className="p-10 text-center">{untils.mess("notifications.loading")}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#181411]">
            {untils.mess("notifications.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {untils.mess("notifications.unread_prefix")} {notifications.filter(n => !n.is_read).length} {untils.mess("notifications.unread_suffix")}
          </p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-sm text-primary font-bold hover:underline flex items-center gap-1"
        >
          {untils.mess("notifications.btn_mark_all")}
        </button>
      </div>

      <div className="divide-y divide-gray-50">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              onClick={() => markOneAsRead(notif.id, notif.is_read)}
              className={`p-6 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${!notif.is_read ? 'bg-orange-50/30' : ''}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-bold truncate ${!notif.is_read ? 'text-[#181411]' : 'text-gray-600'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">
                    {dayjs(notif.created_at).format('DD/MM/YYYY HH:mm')}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{notif.content}</p>
                {!notif.is_read && <div className="mt-2 w-2 h-2 bg-primary rounded-full"></div>}
              </div>
            </div>
          ))
        ) : (
          <div className="p-20 text-center">
            {untils.mess("notifications.empty")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;