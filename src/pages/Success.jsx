// src/pages/Success.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 px-4">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-green-500 text-6xl font-bold"
        >
          ✓
        </motion.div>

        <h2 className="text-3xl font-bold text-purple-700 mt-4">
          Payment Successful!
        </h2>

        <p className="text-gray-600 mt-2">
          Thank you for your purchase! Your delicious Milk Soda will be prepared soon.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}
