// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// export default function StripeCheckoutButton({ amount, token }) {
//   const handleCheckout = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/payments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ amount }),
//       });

//       const data = await res.json();

//       if (data.success && data.checkoutUrl) {
//         // ✅ redirect to Stripe checkout page
//         window.location.href = data.checkoutUrl;
//       } else {
//         alert("Something went wrong while creating checkout session");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong while creating checkout session");
//     }
//   };

//   return (
//     <button
//       onClick={handleCheckout}
//       className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//     >
//       Pay ${amount}
//     </button>
//   );
// }

// src/components/StripeCheckoutButton.jsx
import React, { useState } from "react";
import API from "../api/axiosClient";

export default function StripeCheckoutButton({ amount }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await API.post("/payments/create", { amount });
      // Redirect user to Stripe Checkout
      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleCheckout}
      className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
    >
      {loading ? "Processing..." : `Pay $${amount}`}
    </button>
  );
}
