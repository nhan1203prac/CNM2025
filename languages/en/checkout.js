const checkout = {
    breadcrumb: "Checkout",
    shipping: {
      title: "Shipping Information",
      change: "Change",
      labels: {
        name: "Full Name",
        phone: "Phone Number",
        email: "Email",
        address: "Shipping Address",
        note: "Note (Optional)"
      },
      placeholders: {
        name: "Enter full name",
        phone: "Enter phone number",
        email: "Enter email address",
        address: "House number, street, ward, district...",
        note: "Notes for seller or shipper"
      }
    },
    payment: {
      title: "Payment Method",
      cod: { label: "Cash on Delivery (COD)", desc: "Pay cash upon delivery" },
      bank: { label: "Bank Transfer", desc: "Scan QR code via banking app" },
      card: { label: "Credit / Debit Card", desc: "Visa, Mastercard, JCB" }
    },
    order_summary: {
      title: "Your Order",
      item: { size: "Size", color: "Color" },
      coupon: { placeholder: "Voucher code", btn: "Apply" },
      costs: {
        subtotal: "Subtotal",
        shipping: "Shipping Fee",
        discount: "Discount",
        total: "Total"
      },
      btn_order: "Place Order",
      terms: "By placing an order, you agree to our",
      terms_link: "Terms of Service",
      terms_suffix: "."
    },
    success_msg: "Order successful! Your order ID is"
};
export default checkout;