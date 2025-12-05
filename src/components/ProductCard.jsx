import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const img = product.images?.[0] || product.image || "https://via.placeholder.com/300";
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <img src={img} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description?.slice(0, 100)}</p>
        <div className="mt-3 flex justify-between items-center">
          <div className="text-lg font-bold">Rs {product.price}</div>
          <Link to={`/product/${product._id}`} className="text-sm bg-sky-600 text-white px-3 py-1 rounded">View</Link>
        </div>
      </div>
    </div>
  );
}
