export const OrderStatus = {
  PROCESSING : 'Đang xử lý',
  COMPLETED : 'Hoàn thành',
  CANCELLED : 'Đã hủy'
}

export const PaymentStatus = {
  PAID : 'Đã thanh toán',
  PENDING : 'Chờ thanh toán',
  REFUNDED : 'Đã hoàn tiền'
}

export const ShippingStatus ={
  PENDING :'Chờ xử lý',
  SHIPPING : 'Đang giao',
  DELIVERED : 'Đã giao',
  CANCELLED : 'Đã hủy'
}

export const StockStatus = {
  IN_STOCK : 'Còn hàng',
  OUT_OF_STOCK : 'Hết hàng',
  LOW_STOCK : 'Sắp hết'
}

export const UserRole = {
  ADMIN :'Quản trị viên',
  EDITOR : 'Biên tập viên',
  CUSTOMER : 'Khách hàng'
}

export const UserStatus = {
  ACTIVE : 'Đang hoạt động',
  INACTIVE :'Ngoại tuyến',
  BANNED : 'Đã khóa'
}
