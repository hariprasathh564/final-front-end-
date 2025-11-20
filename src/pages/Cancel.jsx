// src/pages/Cancel.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-pink-100 px-4">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-red-500 text-6xl font-bold"
        >
          ✕
        </motion.div>

        <h2 className="text-3xl font-bold text-red-600 mt-4">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mt-2">
          Your payment was not completed. No worries — you can try again anytime.
        </p>

        <Link
          to="/cart"
          className="mt-6 inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Back to Cart
        </Link>
      </motion.div>
    </div>
  );
}
