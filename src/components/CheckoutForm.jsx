// src/components/CheckoutForm.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../api/axiosClient";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { data } = await API.post("/create-payment-intent"); // backend route
      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-purple-50 rounded-xl shadow">
      <CardElement className="mb-4 p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </form>
  );
}
