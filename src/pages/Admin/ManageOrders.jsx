// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";

// export default function ManageOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const statusColors = {
//     Pending: "bg-yellow-100 text-yellow-700",
//     Confirmed: "bg-blue-100 text-blue-700",
//     Packed: "bg-indigo-100 text-indigo-700",
//     Out_for_delivery: "bg-purple-100 text-purple-700",
//     Delivered: "bg-green-100 text-green-700",
//     Canceled: "bg-red-100 text-red-700",
//     Refunded: "bg-gray-200 text-gray-700",
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await API.get("/orders/all");
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-600 font-semibold">
//         Loading orders...
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <AdminLayout>
//         <div className="p-6 text-center text-gray-500 font-semibold">
//           No orders found.
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div className="p-4">
//         <h2 className="text-3xl font-bold mb-6">All Orders (Admin)</h2>

//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="mb-6 border rounded-lg shadow-sm bg-white"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center p-4 border-b">
//               <div>
//                 <h3 className="font-semibold text-lg">
//                   Order #{order.order_number || order._id}
//                 </h3>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(order.createdAt).toLocaleString()}
//                 </p>
//                 <p className="text-sm text-gray-600 mt-1">
//                   👤 {order.user_id?.name} – {order.user_id?.email}
//                 </p>
//               </div>
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                   statusColors[order.status] || "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {order.status.replace(/_/g, " ")}
//               </span>
//             </div>

//             {/* Items Table */}
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 text-sm">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Product</th>
//                     <th className="px-4 py-2 text-left">Name</th>
//                     <th className="px-4 py-2 text-right">Qty</th>
//                     <th className="px-4 py-2 text-right">Unit Price</th>
//                     <th className="px-4 py-2 text-right">Subtotal</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {order.items?.map((item, index) => (
//                     <tr key={index}>
//                       <td className="px-4 py-2">
//                         {item.productId?.image ? (
//                           <img
//                             src={item.productId.image}
//                             alt={item.productId.name}
//                             className="w-12 h-12 object-cover rounded"
//                           />
//                         ) : (
//                           <div className="w-12 h-12 bg-gray-200 rounded"></div>
//                         )}
//                       </td>
//                       <td className="px-4 py-2">{item.productId?.name || "Product"}</td>
//                       <td className="px-4 py-2 text-right">{item.qty}</td>
//                       <td className="px-4 py-2 text-right">Rs{item.unitPrice}</td>
//                       <td className="px-4 py-2 text-right">
//                         Rs{item.unitPrice * item.qty}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Order Total & Address */}
//             <div className="flex justify-between items-center p-4 border-t">
//               <div>
//                 {order.delivery_address && (
//                   <div className="text-sm text-gray-600">
//                     <p className="font-medium">Delivery Address</p>
//                     <p>
//                       {order.delivery_address.name}, {order.delivery_address.line1},{" "}
//                       {order.delivery_address.city}, {order.delivery_address.state},{" "}
//                       {order.delivery_address.postal_code}
//                     </p>
//                     <p>📞 {order.delivery_address.phone}</p>
//                   </div>
//                 )}
//               </div>
//               <div className="text-lg font-semibold text-green-600">
//                 Total: Rs {order.total}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </AdminLayout>
//   );
// }



import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import AdminLayout from "./AdminLayout";
import { 
  FaBoxOpen, 
  FaUser, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaTruck 
} from "react-icons/fa";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. LOGIC: STATUS COLORS (UNCHANGED) ---
  const statusColors = {
    Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
    Confirmed: "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
    Packed: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]",
    Out_for_delivery: "bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    Delivered: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
    Canceled: "bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]",
    Refunded: "bg-slate-500/10 text-slate-400 border border-slate-500/30",
  };

  // --- 2. LOGIC: FETCH ORDERS (UNCHANGED) ---
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/all");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // --- 3. RENDER: LOADING STATE ---
  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen w-full bg-[#0a0f1c] flex items-center justify-center relative overflow-hidden">
           {/* Fixed Background to fill whole page */}
           <div className="fixed inset-0 bg-[#0a0f1c] z-0"></div>
           <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] z-0 pointer-events-none"></div>
          
           <div className="flex flex-col items-center gap-4 relative z-10">
             <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.4)]"></div>
             <div className="text-cyan-400 font-bold animate-pulse tracking-widest">Loading Data...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // --- 4. RENDER: EMPTY STATE ---
  if (orders.length === 0) {
    return (
      <AdminLayout>
        <div className="min-h-screen w-full bg-[#0a0f1c] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
           {/* Fixed Background to fill whole page */}
           <div className="fixed inset-0 bg-[#0a0f1c] z-0"></div>
           <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] z-0 pointer-events-none"></div>
           <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)] z-0 pointer-events-none"></div>

          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 relative z-10 backdrop-blur-md">
            <FaBoxOpen className="text-4xl text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-white relative z-10">No Orders Found</h3>
          <p className="text-slate-400 mt-2 relative z-10">Wait for customers to place some orders.</p>
        </div>
      </AdminLayout>
    );
  }

  // --- 5. RENDER: MAIN CONTENT ---
  return (
    <AdminLayout>
      {/* 
          MAIN WRAPPER 
          - min-h-screen: ensures it covers at least the viewport.
          - bg-[#0a0f1c]: sets the base color.
      */}
      <div className="min-h-screen w-full bg-[#0a0f1c] relative font-sans text-slate-300 isolate">
        
        {/* 
            --- FIXED BACKGROUND LAYERS --- 
            Using 'fixed' ensures the background covers the WHOLE page 
            even if content is short or if scrolling happens.
        */}
        <div className="fixed inset-0 bg-[#0a0f1c] -z-20"></div>
        
        {/* 1. Tech Grid Pattern */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
        
        {/* 2. Spotlight Gradient at Top */}
        <div className="fixed top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(6,182,212,0.15),transparent)] pointer-events-none -z-10"></div>

        {/* --- Content Container --- */}
        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-500 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                ORDER MANAGEMENT
              </h2>
              <p className="text-slate-400 mt-1 text-sm font-medium">Track and manage customer orders.</p>
            </div>
            <div className="text-slate-400 font-mono text-sm bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              Total Orders: <span className="text-cyan-300 font-bold ml-2">{orders.length}</span>
            </div>
          </div>

          {/* List of Orders */}
          <div className="space-y-8 pb-20">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] group"
              >
                {/* Card Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-white/5 bg-white/5 gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 shadow-inner">
                      <FaBoxOpen className="text-cyan-300 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg text-white font-bold tracking-wide">
                        #{order.order_number || order._id.substring(0, 8).toUpperCase()}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-400">
                        <span className="flex items-center gap-1"><FaCalendarAlt className="text-xs text-cyan-500" /> {new Date(order.createdAt).toLocaleString()}</span>
                        <span className="hidden md:inline text-slate-600">|</span>
                        <span className="flex items-center gap-1 text-cyan-100"><FaUser className="text-xs text-cyan-500" /> {order.user_id?.name}</span>
                        <span className="hidden md:inline text-slate-600">|</span>
                        <span className="text-xs font-mono">{order.user_id?.email}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      statusColors[order.status] || "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {order.status.replace(/_/g, " ")}
                  </span>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#020617]/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-white/5">
                      <tr>
                        <th className="px-6 py-4">Product Details</th>
                        <th className="px-6 py-4 text-right">Qty</th>
                        <th className="px-6 py-4 text-right">Unit Price</th>
                        <th className="px-6 py-4 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {order.items?.map((item, index) => (
                        <tr key={index} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-black/20 shrink-0">
                                {item.productId?.image ? (
                                  <img
                                    src={item.productId.image}
                                    alt={item.productId.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-600">N/A</div>
                                )}
                              </div>
                              <span className="font-medium text-white">{item.productId?.name || "Unknown Product"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-mono text-slate-400">{item.qty}</td>
                          <td className="px-6 py-4 text-right font-mono text-slate-500">Rs {item.unitPrice}</td>
                          <td className="px-6 py-4 text-right font-mono font-bold text-cyan-300">
                            Rs {item.unitPrice * item.qty}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Order Footer: Address & Total */}
                <div className="flex flex-col md:flex-row justify-between items-stretch border-t border-white/10">
                  
                  {/* Address Section */}
                  <div className="p-6 flex-1 bg-white/[0.02]">
                    {order.delivery_address && (
                      <div className="text-sm text-slate-400 space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-2">
                          <FaTruck /> Delivery Details
                        </div>
                        <p className="font-medium text-white text-base">{order.delivery_address.name}</p>
                        <div className="flex items-start gap-2">
                          <FaMapMarkerAlt className="mt-1 shrink-0 text-cyan-500/70" />
                          <span>
                            {order.delivery_address.line1}, {order.delivery_address.city}, <br />
                            {order.delivery_address.state} - {order.delivery_address.postal_code}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhoneAlt className="text-cyan-500/70" />
                          <span>{order.delivery_address.phone}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Total Section */}
                  <div className="p-6 bg-[#020617]/30 min-w-[250px] flex flex-col justify-center items-end border-l border-white/5">
                     <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center gap-2">
                       <FaMoneyBillWave /> Total Amount
                     </div>
                     <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-sm">
                       Rs {order.total}
                     </div>
                     <div className="text-[10px] text-slate-500 mt-2 bg-white/5 px-2 py-0.5 rounded">
                       Includes all taxes
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}