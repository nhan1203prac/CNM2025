
export const RECENT_ORDERS = [
  {
    id: '#ORD-7829',
    customerName: 'Nguyễn Văn A',
    customerInitials: 'VA',
    customerEmail: 'nguyenvana@gmail.com',
    productName: 'iPhone 15 Pro Max',
    date: '24/10/2023',
    total: 34990000,
    status: OrderStatus.PROCESSING,
    paymentStatus: PaymentStatus.PAID,
    shippingStatus: ShippingStatus.SHIPPING
  },
  {
    id: '#ORD-7830',
    customerName: 'Trần Thị B',
    customerInitials: 'TB',
    customerEmail: 'tranthib@gmail.com',
    productName: 'MacBook Air M2',
    date: '24/10/2023',
    total: 28500000,
    status: OrderStatus.PROCESSING,
    paymentStatus: PaymentStatus.PENDING,
    shippingStatus: ShippingStatus.PENDING
  },
  {
    id: '#ORD-7831',
    customerName: 'Lê Văn C',
    customerInitials: 'VC',
    customerEmail: 'levanc@company.vn',
    productName: 'Sony WH-1000XM5',
    date: '23/10/2023',
    total: 8490000,
    status: OrderStatus.COMPLETED,
    paymentStatus: PaymentStatus.PAID,
    shippingStatus: ShippingStatus.DELIVERED
  },
  {
    id: '#ORD-7832',
    customerName: 'Phạm Thị D',
    customerInitials: 'TD',
    customerEmail: 'phamthid@email.com',
    productName: 'iPad Pro M2',
    date: '23/10/2023',
    total: 21000000,
    status: OrderStatus.CANCELLED,
    paymentStatus: PaymentStatus.REFUNDED,
    shippingStatus: ShippingStatus.CANCELLED
  },
  {
    id: '#ORD-7833',
    customerName: 'Hoàng Văn E',
    customerInitials: 'VE',
    customerEmail: 'hoangve@test.com',
    productName: 'AirPods Pro 2',
    date: '22/10/2023',
    total: 5900000,
    status: OrderStatus.PROCESSING,
    paymentStatus: PaymentStatus.PAID,
    shippingStatus: ShippingStatus.SHIPPING
  }
];

export const CATEGORIES_LIST = [
  {
    id: '#CAT-001',
    name: 'Điện thoại di động',
    slug: 'dien-thoai-di-dong',
    productCount: 1240,
    status: 'Hiển thị',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop'
  },
  {
    id: '#CAT-002',
    name: 'Máy tính xách tay',
    slug: 'may-tinh-xach-tay',
    productCount: 856,
    status: 'Hiển thị',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop'
  },
  {
    id: '#CAT-003',
    name: 'Phụ kiện âm thanh',
    slug: 'phu-kien-am-thanh',
    productCount: 342,
    status: 'Đang ẩn',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
  },
  {
    id: '#CAT-004',
    name: 'Smartwatch',
    slug: 'smartwatch',
    productCount: 92,
    status: 'Hiển thị',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
  }
];

export const PRODUCTS_LIST = [
  {
    id: '1',
    sku: 'IPH15PM-256-VN',
    name: 'iPhone 15 Pro Max',
    category: 'Điện thoại',
    price: 34990000,
    stock: 45,
    status: StockStatus.IN_STOCK,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    sku: 'MBP-M3-14',
    name: 'MacBook Pro M3 14"',
    category: 'Laptop',
    price: 45000000,
    stock: 12,
    status: StockStatus.IN_STOCK,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    sku: 'SONY-XM5-BLK',
    name: 'Sony WH-1000XM5',
    category: 'Phụ kiện',
    price: 8490000,
    stock: 0,
    status: StockStatus.OUT_OF_STOCK,
    imageUrl: 'https://images.unsplash.com/photo-1618366712214-8c07b1373977?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    sku: 'AW-S9-41-GPS',
    name: 'Apple Watch Series 9',
    category: 'Đồng hồ',
    price: 10990000,
    stock: 28,
    status: StockStatus.IN_STOCK,
    imageUrl: 'https://images.unsplash.com/photo-1544117518-29057b9765d7?w=100&h=100&fit=crop'
  },
  {
    id: '5',
    sku: 'LOGI-MX3S-GR',
    name: 'Logitech MX Master 3S',
    category: 'Phụ kiện',
    price: 2490000,
    stock: 5,
    status: StockStatus.LOW_STOCK,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&h=100&fit=crop'
  }
];

export const USERS_LIST= [
  {
    id: 'U001',
    name: 'Nguyễn Đình Khang',
    email: 'khang.nd@example.com',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    joinDate: '12/05/2022',
    avatarUrl: 'https://i.pravatar.cc/150?u=khang'
  },
  {
    id: 'U002',
    name: 'Lê Thanh Thảo',
    email: 'thao.lt@example.com',
    role: UserRole.EDITOR,
    status: UserStatus.ACTIVE,
    joinDate: '24/08/2023',
    avatarUrl: 'https://i.pravatar.cc/150?u=thao'
  },
  {
    id: 'U003',
    name: 'Phạm Minh Quân',
    email: 'quan.pm@example.com',
    role: UserRole.CUSTOMER,
    status: UserStatus.INACTIVE,
    joinDate: '01/10/2023',
    avatarUrl: 'https://i.pravatar.cc/150?u=quan'
  },
  {
    id: 'U004',
    name: 'Trần Hoài Nam',
    email: 'nam.th@example.com',
    role: UserRole.CUSTOMER,
    status: UserStatus.BANNED,
    joinDate: '15/09/2023',
    avatarUrl: 'https://i.pravatar.cc/150?u=nam'
  }
];

export const STATS= [
  {
    label: 'Tổng doanh thu',
    value: '125.4 tr ₫',
    trend: '+12%',
    isPositive: true,
    icon: 'payments',
    colorClass: 'text-green-500 bg-green-500/10'
  },
  {
    label: 'Tổng đơn hàng',
    value: '1,250',
    trend: '+5%',
    isPositive: true,
    icon: 'shopping_cart',
    colorClass: 'text-blue-500 bg-blue-500/10'
  },
  {
    label: 'Sản phẩm tồn kho',
    value: '84',
    trend: '-2%',
    isPositive: false,
    icon: 'inventory',
    colorClass: 'text-orange-500 bg-orange-500/10'
  },
  {
    label: 'Khách hàng mới',
    value: '320',
    trend: '+8%',
    isPositive: true,
    icon: 'person_add',
    colorClass: 'text-purple-500 bg-purple-500/10'
  }
];

export const CATEGORIES = [
  { name: 'Điện tử', percentage: 45, color: 'bg-primary' },
  { name: 'Thời trang', percentage: 30, color: 'bg-purple-500' },
  { name: 'Gia dụng', percentage: 15, color: 'bg-orange-500' },
  { name: 'Khác', percentage: 10, color: 'bg-slate-400' }
];

export const REVENUE_CHART_DATA = [
  { name: 'T1', revenue: 400 },
  { name: 'T2', revenue: 700 },
  { name: 'T3', revenue: 600 },
  { name: 'T4', revenue: 900 },
  { name: 'T5', revenue: 800 },
  { name: 'T6', revenue: 1100 },
];
