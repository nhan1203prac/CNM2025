import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import baseAPI from "../../../api/baseApi";
import toast from "react-hot-toast";
import { untils } from "../../../../languages/untils";

const InputWrapper = ({ label, Component, options }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
      <Component options={options} />
    </div>
  </div>
);

const CheckoutForm = ({ clientSecret, orderId, onOrderPaid }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // STEP 2: KIỂM TRA TRẠNG THÁI TRƯỚC KHI XỬ LÝ
    if (!stripe || !elements || processing) return;

    // Lấy tham chiếu đến CardNumberElement
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
        toast.error("Stripe Element not found");
        return;
    }

    setProcessing(true);
    setError(null);

    try {
      // STEP 3: XÁC NHẬN THANH TOÁN VỚI STRIPE
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      if (result.error) {
        // Lỗi từ phía Stripe (Sai thẻ, hết tiền, v.v.)
        const errorMessage = result.error.message;
        setError(errorMessage);
        toast.error(errorMessage);
        setProcessing(false);
      } else {
        // Thanh toán thành công trên Stripe
        if (result.paymentIntent.status === "succeeded") {
          await handleServerConfirmation();
        }
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setError("An unexpected error occurred.");
      setProcessing(false);
    }
  };

  // STEP 4: XÁC NHẬN VỚI BACKEND SAU KHI STRIPE THÀNH CÔNG
  const handleServerConfirmation = async () => {
    try {
      await baseAPI.post(`/payment/confirm-order/${orderId}`);
      toast.success(untils.mess("checkoutForm.paymentSuccess"));
      
      // Callback để load lại UI hoặc chuyển trang
      if (onOrderPaid) onOrderPaid(); 
    } catch (err) {
      console.error("Backend Confirm Error:", err);
      toast.error(untils.mess("checkoutForm.paymentError"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {untils.mess("checkoutForm.paymentInfo")}
          </h3>
          <p className="text-xs text-gray-500">
            {untils.mess("checkoutForm.powerbySripe")}
          </p>
        </div>

        {/* Card Number */}
        <InputWrapper 
          label={untils.mess("checkoutForm.paymentNumber")} 
          Component={CardNumberElement} 
          options={elementOptions} 
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <InputWrapper 
            label={untils.mess("checkoutForm.expiredDate")} 
            Component={CardExpiryElement} 
            options={elementOptions} 
          />
          {/* CVC */}
          <InputWrapper 
            label={untils.mess("checkoutForm.cardVerificationCode")} 
            Component={CardCvcElement} 
            options={elementOptions} 
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-100 mt-2 animate-pulse">
            {error}
          </div>
        )}

        <button
          disabled={!stripe || processing}
          type="submit"
          className={`w-full py-3.5 mt-4 text-white rounded-xl font-bold uppercase transition-all duration-300 flex justify-center items-center shadow-md
            ${processing || !stripe 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-primary hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            }`}
        >
          {processing ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{untils.mess("checkoutForm.loading")}</span>
            </div>
          ) : (
             untils.mess("checkoutForm.confirmPayment")
          )}
        </button>

        <div className="flex justify-center items-center space-x-2 mt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
             <span className="text-[10px] text-gray-400 font-semibold">
               {untils.mess("checkoutForm.powerbySripe")}
             </span>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;