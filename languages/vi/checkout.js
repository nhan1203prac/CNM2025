const checkout = {
    breadcrumb: "Thanh toán",
    shipping: {
      title: "Thông tin giao hàng",
      change: "Thay đổi",
      labels: {
        name: "Họ và tên",
        phone: "Số điện thoại",
        email: "Email",
        address: "Địa chỉ nhận hàng",
        note: "Ghi chú (Tùy chọn)"
      },
      placeholders: {
        name: "Nhập họ tên đầy đủ",
        phone: "Nhập số điện thoại",
        email: "Nhập địa chỉ email",
        address: "Số nhà, tên đường, phường/xã, quận/huyện...",
        note: "Lưu ý cho người bán hoặc shipper"
      }
    },
    payment: {
      title: "Phương thức thanh toán",
      cod: { label: "Thanh toán khi nhận hàng (COD)", desc: "Thanh toán tiền mặt khi giao hàng" },
      bank: { label: "Chuyển khoản ngân hàng", desc: "Quét mã QR qua ứng dụng ngân hàng" },
      card: { label: "Thẻ tín dụng / Ghi nợ", desc: "Visa, Mastercard, JCB" }
    },
    order_summary: {
      title: "Đơn hàng của bạn",
      item: { size: "Size", color: "Màu" },
      coupon: { placeholder: "Mã giảm giá", btn: "Áp dụng" },
      costs: {
        subtotal: "Tạm tính",
        shipping: "Phí vận chuyển",
        discount: "Giảm giá",
        total: "Tổng cộng"
      },
      btn_order: "Đặt hàng ngay",
      terms: "Bằng việc đặt hàng, bạn đồng ý với",
      terms_link: "Điều khoản dịch vụ",
      terms_suffix: "của chúng tôi."
    },
    success_msg: "Đặt hàng thành công! Mã đơn hàng của bạn là"
};
export default checkout;