

// // src/pages/PaymentSuccess.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export default function PaymentSuccess() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [payment, setPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const sessionId = searchParams.get("session_id");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const confirmPayment = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/payments/confirm", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ sessionId }),
//         });

//         const data = await res.json();
//         if (data.success) setPayment(data.payment);
//         else alert(data.message);
//       } catch (err) {
//         console.error(err);
//         alert("Error confirming payment");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (sessionId) confirmPayment();
//   }, [sessionId, token]);

//   // Redirect to home after 5 seconds
//   useEffect(() => {
//     if (!loading && payment) {
//       const timer = setTimeout(() => {
//         navigate("/");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [loading, payment, navigate]);

//   if (loading) return <p className="text-center mt-20 text-lg">Confirming your payment...</p>;

//   if (!payment)
//     return (
//       <div className="text-center mt-20 text-red-500">
//         <p>Payment confirmation failed.</p>
//       </div>
//     );

//   return (
//     <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg text-center">
//       <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful ✅</h2>
//       <p className="text-gray-700 mb-2">
//         Amount Paid: <span className="font-semibold">${payment.amount}</span>
//       </p>
//       <p className="text-gray-700 mb-2">
//         Status: <span className="font-semibold">{payment.status}</span>
//       </p>
//       <p className="text-gray-700 mb-4">
//         Payment ID: <span className="font-mono text-sm">{payment._id}</span>
//       </p>
//       <p className="text-gray-500">Redirecting to home in 5 seconds...</p>
//     </div>
//   );
// }


// src/pages/PaymentSuccess.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export default function PaymentSuccess() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [payment, setPayment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const sessionId = searchParams.get("session_id");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const confirmPayment = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/payments/confirm", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ sessionId }),
//         });

//         const data = await res.json();

//         if (data.success) {
//           setPayment(data.payment);
//         } else {
//           alert(data.message || "Payment confirmation failed");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Error confirming payment");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (sessionId) confirmPayment();
//   }, [sessionId, token]);

//   // Redirect to home after 5 seconds
//   useEffect(() => {
//     if (!loading && payment) {
//       const timer = setTimeout(() => {
//         navigate("/");
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [loading, payment, navigate]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg text-gray-500">Confirming your payment...</p>
//       </div>
//     );
//   }

//   if (!payment) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-lg">Payment confirmation failed.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg text-center">
//       <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful ✅</h2>

//       <p className="text-gray-700 mb-2">
//         Amount Paid: <span className="font-semibold">${payment.amount}</span>
//       </p>

//       <p className="text-gray-700 mb-2">
//         Status: <span className="font-semibold">{payment.status}</span>
//       </p>

//       <p className="text-gray-700 mb-4">
//         Payment ID: <span className="font-mono text-sm">{payment._id}</span>
//       </p>

//       <p className="text-gray-500">You will be redirected to Home in 5 seconds...</p>
//     </div>
//   );
// }

// // src/pages/PaymentSuccess.jsx
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import API from "../api/axiosClient";

// export default function PaymentSuccess() {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const [message, setMessage] = useState("Verifying payment...");

//   useEffect(() => {
//     const confirmPayment = async () => {
//       try {
//         const { data } = await API.post("/payments/confirm", { sessionId });
//         if (data.success) setMessage("Payment successful! 🎉");
//         else setMessage("Payment verification failed.");
//       } catch (err) {
//         console.error(err);
//         setMessage("Payment verification error.");
//       }
//     };

//     if (sessionId) confirmPayment();
//   }, [sessionId]);

//   return <div className="text-center text-xl mt-10">{message}</div>;
// }


// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../api/axiosClient";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const { data } = await API.post("/payments/confirm", { sessionId });

        if (data.success) {
          setStatus("success");
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
  }, [sessionId]);

  // Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center mt-20 text-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
        <p className="mt-4">Verifying your payment...</p>
      </div>
    );
  }

  // Payment Status UI
  return (
    <div className="flex flex-col justify-center items-center mt-20 text-center">
      {status === "success" && (
        <>
          <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
          <p className="mt-2 text-lg text-gray-700">
            Thank you! Your order has been successfully processed.
          </p>

          <Link
            to="/"
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Go Back Home
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <h1 className="text-3xl font-bold text-red-600">❌ Payment Failed</h1>
          <p className="mt-2 text-lg text-gray-600">Something went wrong.</p>

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
