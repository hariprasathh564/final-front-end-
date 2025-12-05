// // src/pages/Orders.jsx
// import React, { useEffect, useState } from "react";
// import API from "../api/axiosClient";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const res = await API.get("/orders/myorders"); // fetch logged-in user orders
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 5000); // optional auto-refresh every 5s
//     return () => clearInterval(interval);
//   }, []);

//   if (loading)
//     return (
//       <div className="p-6 text-center font-semibold text-gray-600">
//         Loading orders...
//       </div>
//     );

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">My Orders</h2>

//       {orders.length === 0 && (
//         <div className="text-center text-gray-500">No orders found.</div>
//       )}

//       <div className="space-y-5">
//         {orders.map((o) => (
//           <div
//             key={o._id}
//             className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-semibold text-lg">
//                   Order #{o.order_number || o._id}
//                 </h3>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(o.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
//                 {o.status.replace(/_/g, " ")}
//               </span>
//             </div>

//             {/* Items */}
//             <div className="mt-4 border-t pt-3 text-sm">
//               <p className="font-medium mb-2">Items ({o.items?.length || 0})</p>

//               {o.items?.map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between py-1 border-b last:border-none"
//                 >
//                   <span className="text-gray-700">
//                     • {item.productId?.name || "Product"}
//                   </span>
//                   <span>
//                     {item.qty} × ₹{item.unitPrice}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Total */}
//             <div className="mt-4 border-t pt-3 flex justify-between text-base font-semibold">
//               <span>Total:</span>
//               <span className="text-green-600">₹ {o.total}</span>
//             </div>

//             {/* Address */}
//             {o.delivery_address && (
//               <div className="mt-3 text-sm text-gray-600">
//                 <p className="font-medium">Delivery Address</p>
//                 <p>
//                   {o.delivery_address.name}, {o.delivery_address.line1},{" "}
//                   {o.delivery_address.city}, {o.delivery_address.state},{" "}
//                   {o.delivery_address.postal_code}
//                 </p>
//                 <p>📞 {o.delivery_address.phone}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";
import { 
  FiBox, FiClock, FiMapPin, FiPackage, 
  FiShoppingBag, FiSmile, FiChevronDown, FiChevronUp 
} from "react-icons/fi";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track which order is expanded (to show/hide products)
  const [expandedOrders, setExpandedOrders] = useState({});

  // Static bubbles for background
  const [bubbles] = useState(Array.from({ length: 20 })); 

  // =================================================================
  // LOGIC (UNCHANGED)
  // =================================================================
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/myorders"); 
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, []);

  // NEW: Function to toggle the product visibility
  const toggleOrder = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // =================================================================
  // STYLING HELPERS
  // =================================================================
  const getStatusStyle = (status) => {
    const s = status.toLowerCase();
    if (s.includes("deliver") || s.includes("complete")) 
      return "bg-emerald-100 text-emerald-800 border-emerald-200 shadow-sm";
    if (s.includes("cancel")) 
      return "bg-rose-100 text-rose-800 border-rose-200";
    return "bg-blue-100 text-blue-900 border-blue-200 animate-pulse-soft";
  };

  // =================================================================
  // RENDER
  // =================================================================
  if (loading)
    return (
      <div className="min-h-screen bg-[#F0F8FF] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-50"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-blue-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl animate-bounce">🥤</div>
        </div>
        <p className="mt-6 text-blue-900 font-black tracking-widest animate-pulse uppercase">Fizzing Up Data...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F0F8FF] pt-28 pb-32 px-4 relative overflow-hidden font-sans text-slate-800 selection:bg-pink-200 selection:text-pink-900">
      
      {/* --- BACKGROUND ANIMATIONS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-blue-200/50 to-cyan-200/50 rounded-full blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/40 to-purple-200/40 rounded-full blur-[80px] animate-float-reverse"></div>
        {bubbles.map((_, i) => (
           <div key={i} className="absolute bg-white/80 rounded-full border border-blue-100/50"
             style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                bottom: '-50px',
                animation: `rise ${Math.random() * 10 + 10}s infinite linear`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.6
             }}
           />
        ))}
      </div>

      {/* --- CONTENT --- */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 drop-shadow-sm mb-2">
            YOUR ORDERS
            </h2>
            <div className="px-6 py-1 bg-white/60 backdrop-blur-md rounded-full border border-white shadow-sm">
                <span className="text-xs font-bold text-blue-900 tracking-[0.3em] uppercase">Freshly Brewed Records</span>
            </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-xl border-2 border-white rounded-[2rem] shadow-xl">
                <div className="bg-blue-50 p-8 rounded-full mb-6 border-4 border-white shadow-lg animate-bounce-slow">
                    <FiSmile className="text-6xl text-blue-400" />
                </div>
                <p className="text-2xl text-blue-950 font-bold tracking-tight">No bubbles here yet!</p>
            </div>
        )}

        {/* Order Cards */}
        <div className="space-y-8 perspective-1000">
            {orders.map((o, index) => {
                const isExpanded = expandedOrders[o._id];
                return (
                <div
                    key={o._id}
                    className="group relative bg-white/70 backdrop-blur-2xl border-2 border-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(30,58,138,0.15)] hover:-translate-y-1"
                    style={{ animation: `slideUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.15}s backwards` }}
                >
                    {/* --- Card Header --- */}
                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-blue-100 bg-gradient-to-r from-white/60 to-blue-50/40">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-white rounded-2xl border border-blue-100 shadow-sm flex items-center justify-center text-blue-600">
                                <FiPackage className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-blue-950 tracking-tight">
                                    #{o.order_number || o._id.slice(-6).toUpperCase()}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-bold uppercase tracking-wider">
                                    <FiClock /> {new Date(o.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        
                        <span className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border ${getStatusStyle(o.status)}`}>
                            {o.status.replace(/_/g, " ")}
                        </span>
                    </div>

                    {/* --- Middle: Toggle Button (Hiding the products) --- */}
                    <div className="bg-white/40 p-2 flex justify-center border-b border-white">
                        <button 
                            onClick={() => toggleOrder(o._id)}
                            className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-blue-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                        >
                            {isExpanded ? (
                                <>Close Bottle <FiChevronUp /></>
                            ) : (
                                <>Reveal {o.items?.length} Items <FiChevronDown className="animate-bounce" /></>
                            )}
                        </button>
                    </div>

                    {/* --- Hidden Content (Animated) --- */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-50'}`}>
                        <div className="p-7 bg-white/30">
                            <div className="mb-8 space-y-4">
                                <p className="text-[10px] text-blue-900 uppercase font-black tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <FiShoppingBag className="text-lg" /> Contents
                                </p>
                                {o.items?.map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-white border border-blue-50 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-md"></div>
                                        <span className="text-slate-900 font-bold text-sm">
                                            {item.productId?.name || "Mystery Item"}
                                        </span>
                                    </div>
                                    <span className="font-mono text-blue-900 font-bold bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                                        {item.qty} × ₹{item.unitPrice}
                                    </span>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Footer Info --- */}
                    <div className="p-6 flex flex-col md:flex-row justify-between items-end gap-6 border-t border-blue-100 bg-white/50">
                        
                        {/* Address */}
                        {o.delivery_address && (
                        <div className="flex-1 relative group cursor-default">
                            <div className="flex items-start gap-3">
                                <FiMapPin className="text-pink-500 mt-1" />
                                <div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Delivery To</p>
                                    <p className="text-sm text-slate-800 font-bold leading-relaxed">
                                        {o.delivery_address.name}, {o.delivery_address.city}
                                    </p>
                                    <p className="text-xs text-blue-600 font-mono font-semibold">{o.delivery_address.phone}</p>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* Total Price */}
                        <div className="text-right">
                            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Total Amount</p>
                            <div className="text-3xl font-black text-blue-900 drop-shadow-sm">
                                ₹ {o.total}
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}
        </div>
      </div>

      {/* --- STYLES --- */}
      <style>{`
        @keyframes rise {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            20% { opacity: 0.6; }
            50% { transform: translateY(-40vh) scale(1.2); opacity: 0.8; }
            100% { transform: translateY(-120vh) scale(0.5); opacity: 0; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes float-slow {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, -30px); }
        }
        @keyframes float-reverse {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-20px, 30px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse 3s infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
}