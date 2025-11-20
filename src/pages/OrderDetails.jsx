// // frontend/src/pages/OrderDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import API from "../api/axiosClient";

// export default function OrderDetails() {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const statusColors = {
//     Pending: "text-yellow-600 bg-yellow-100",
//     Confirmed: "text-blue-600 bg-blue-100",
//     Packed: "text-indigo-600 bg-indigo-100",
//     Out_for_delivery: "text-purple-600 bg-purple-100",
//     Delivered: "text-green-600 bg-green-100",
//     Canceled: "text-red-600 bg-red-100",
//   };

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await API.get(`/orders/${id}`);
//         setOrder(res.data);
//       } catch (err) {
//         console.error("Load Order Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [id]);

//   if (loading) return <div className="p-4 animate-pulse">Loading...</div>;
//   if (!order) return <div className="p-4 text-center">Order not found</div>;

//   return (
//     <div className="p-4">
//       <Link to="/orders" className="text-sm text-blue-600 mb-4 inline-block">← Back to orders</Link>
//       <h2 className="text-3xl font-bold mb-4">Order Details</h2>

//       <div className="border p-5 rounded-xl shadow bg-white">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="font-semibold text-xl">Order #{order._id}</p>
//             <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
//           </div>

//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
//             {order.status}
//           </span>
//         </div>

//         <div className="mt-5 space-y-3">
//           <h3 className="font-semibold">Items</h3>
//           {order.items?.map((item, idx) => (
//             <div key={idx} className="flex justify-between bg-gray-50 p-2 rounded-md">
//               <div className="flex items-center gap-3">
//                 {/* product name if populated */}
//                 <div>
//                   <div className="font-medium">{item.productId?.name || "Product"}</div>
//                   <div className="text-sm text-gray-500">{item.productId?.category}</div>
//                 </div>
//               </div>
//               <div className="text-gray-700">{item.qty} × ₹{item.unitPrice}</div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-5 border-t pt-4 space-y-2">
//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>₹{order.subtotal || 0}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Tax</span>
//             <span>₹{order.tax || 0}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Shipping</span>
//             <span>₹{order.shipping_fee || 0}</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg text-purple-700">
//             <span>Total</span>
//             <span>₹{order.total || 0}</span>
//           </div>
//         </div>

//         <div className="mt-4">
//           <h4 className="font-semibold">Delivery Address</h4>
//           <pre className="text-sm bg-gray-50 p-3 rounded">{JSON.stringify(order.delivery_address, null, 2)}</pre>
//         </div>
//       </div>
//     </div>
//   );
// }
