// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import API from "../api/axiosClient";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("checking");
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const { data } = await API.post("/payments/confirm", { sessionId });

        if (data.success) {
          setStatus("success");

          // Redirect to Orders page after 2 seconds
          setTimeout(() => navigate("/orders"), 2000);
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) confirmPayment();
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-20 text-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
        <p className="mt-4">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20 text-center">
      {status === "success" && (
        <>
          <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
          <p className="mt-2 text-lg text-gray-700">
            Thank you! Your order has been successfully processed.
          </p>

          <Link
            to="/orders"
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            View My Orders
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <h1 className="text-3xl font-bold text-red-600">❌ Payment Failed</h1>
          <p className="mt-2 text-lg text-gray-600">Something went wrong with your payment.</p>

          <Link
            to="/cart"
            className="mt-6 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Return to Cart
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-3xl font-bold text-orange-600">⚠️ Verification Error</h1>
          <p className="mt-2 text-lg text-gray-600">We couldn't confirm your payment.</p>

          <Link
            to="/cart"
            className="mt-6 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Try Again
          </Link>
        </>
      )}
    </div>
  );
}
