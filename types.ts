
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  image: string;
  category: string;
  brand: string;
  isNew?: boolean;
  discount?: number;
  description: string;
  colors: string[];
  sizes: string[];
  thumbnails: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
  phone: string;
  gender: 'Nam' | 'Nữ' | 'Khác';
  dob: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Chờ xử lý' | 'Đang vận chuyển' | 'Hoàn thành' | 'Đã hủy';
  items: {
    productId: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    size: string;
    color: string;
  }[];
}
