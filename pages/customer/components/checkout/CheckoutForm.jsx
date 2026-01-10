import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import baseAPI from "../../../api/baseApi";
import toast from "react-hot-toast";

const CheckoutForm = ({ clientSecret,orderId, onOrderPaid }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        await baseAPI.post(`/payment/confirm-order/${orderId}`);
        toast.success("Thanh toán thành công!");
        onOrderPaid(); 
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-xl bg-slate-50">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button
        disabled={!stripe}
        className="w-full py-3  bg-primary text-white rounded-xl font-bold uppercase"
      >
        Xác nhận trả tiền
      </button>
    </form>
  );
};

export default CheckoutForm;
