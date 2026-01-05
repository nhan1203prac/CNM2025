const ordersPage = {
    title: "My Orders",
    loading: "Syncing orders...",
    error_load: "Failed to load order history",
    tabs: {
      all: "All",
      pending: "Pending",
      shipping: "Shipping",
      delivered: "Completed",
      cancelled: "Cancelled"
    },
    empty_state: "You have no orders in this status.",
    card: {
      order_id: "Order ID",
      view_more: "View",
      view_more_suffix: "more products...",
      total_payment: "Total Payment",
      btn_detail: "Order Details",
      quantity: "Qty"
    },
    detail_popup: {
      title: "Order Details",
      order_id: "ID",
      variant: "Variant",
      default: "Default",
      subtotal: "Subtotal",
      shipping: "Shipping",
      free: "Free",
      total: "Total Payment",
      btn_close: "Close Window"
    }
};

export default ordersPage;