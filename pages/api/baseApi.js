import axios from "axios";
import toast from "react-hot-toast";

const baseAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});

baseAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || "Đã có lỗi xảy ra";
    
    if (error.response?.status === 401) {
      toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      localStorage.removeItem("token");
    }
    else if( error.response?.status === 500){
      toast.error("Máy chủ gặp sự cố, vui lòng thử lại sau");
    }
    // else {
    //   toast.error(message);
    // }
    
    return Promise.reject(error);
  }
);

export default baseAPI;