
// ///finally working full code///
// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import { Link } from "react-router-dom";
// import AdminLayout from "./AdminLayout";
// import {
//   FaBox,
//   FaShoppingCart,
//   FaUsers,
//   FaAd,
//   FaArrowUp,
//   FaArrowDown,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import dayjs from "dayjs";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     products: 0,
//     orders: 0,
//     users: 0,
//     ads: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [recentUsers, setRecentUsers] = useState([]);

//   const [monthlyOrders, setMonthlyOrders] = useState([]);
//   const [monthlyUsers, setMonthlyUsers] = useState([]);
//   const [monthlyProducts, setMonthlyProducts] = useState([]);
//   const [monthlyAds, setMonthlyAds] = useState([]);

//   const [trends, setTrends] = useState({
//     orders: 0,
//     users: 0,
//     products: 0,
//     ads: 0,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);

//       try {
//         const [productsRes, ordersRes, usersRes, adsRes] =
//           await Promise.allSettled([
//             API.get("/products"),
//             API.get("/orders/all"),
//             API.get("/users"),
//             API.get("/ads"),
//           ]);

//         const productsArray =
//           productsRes.status === "fulfilled" &&
//           Array.isArray(productsRes.value.data)
//             ? productsRes.value.data
//             : [];

//         const ordersArray =
//           ordersRes.status === "fulfilled" &&
//           Array.isArray(ordersRes.value.data)
//             ? ordersRes.value.data
//             : [];

//         const usersArray =
//           usersRes.status === "fulfilled" &&
//           Array.isArray(usersRes.value.data)
//             ? usersRes.value.data
//             : [];

//         const adsArray =
//           adsRes.status === "fulfilled" &&
//           Array.isArray(adsRes.value.data)
//             ? adsRes.value.data
//             : [];

//         // SET STATS
//         setStats({
//           products: productsArray.length,
//           orders: ordersArray.length,
//           users: usersArray.length,
//           ads: adsArray.length,
//         });

//         setRecentOrders(ordersArray.slice(-50).reverse());
//         setRecentUsers(usersArray.slice(-50).reverse());

//         // -----------------------------
//         // MONTHLY DATA CALCULATION
//         // -----------------------------
//         const generateMonthlyData = (array) => {
//           const months = Array(12).fill(0);
//           array.forEach((item) => {
//             months[dayjs(item.createdAt).month()]++;
//           });
//           return months.map((count, idx) => ({
//             month: dayjs().month(idx).format("MMM"),
//             value: count,
//           }));
//         };

//         const orderCounts = generateMonthlyData(ordersArray);
//         const userCounts = generateMonthlyData(usersArray);
//         const productCounts = generateMonthlyData(productsArray);
//         const adsCounts = generateMonthlyData(adsArray);

//         setMonthlyOrders(orderCounts);
//         setMonthlyUsers(userCounts);
//         setMonthlyProducts(productCounts);
//         setMonthlyAds(adsCounts);

//         // --------------------------------
//         // TREND % CALCULATION
//         // --------------------------------
//         const calcTrend = (arr) => {
//           const current = arr[dayjs().month()]?.value || 0;
//           const last = arr[(dayjs().month() + 11) % 12]?.value || 0;
//           return last === 0 ? 100 : Math.round(((current - last) / last) * 100);
//         };

//         setTrends({
//           orders: calcTrend(orderCounts),
//           users: calcTrend(userCounts),
//           products: calcTrend(productCounts),
//           ads: calcTrend(adsCounts),
//         });
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   // -----------------------------------------------------
//   // ORDER STATUS CHANGE
//   // -----------------------------------------------------
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const res = await API.put(`/orders/${orderId}/status`, {
//         status: newStatus,
//       });

//       setRecentOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );

//       alert(res.data.message);
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert(err.response?.data?.message || "Failed to update order status");
//     }
//   };

//   if (loading)
//     return (
//       <AdminLayout>
//         <div className="text-center text-xl font-semibold animate-pulse text-purple-600 mt-20">
//           Loading dashboard...
//         </div>
//       </AdminLayout>
//     );

//   // FIX REAL STATUS NAMES
//   const completedOrders = recentOrders.filter((o) => o.status === "Delivered")
//     .length;

//   const pendingOrders = recentOrders.filter((o) => o.status === "Pending")
//     .length;

//   const newUsersThisMonth = monthlyUsers[dayjs().month()]?.value || 0;

//   // -----------------------------------------------------
//   // KPI CARDS
//   // -----------------------------------------------------
//   const kpis = [
//     {
//       title: "Completed Orders",
//       value: completedOrders,
//       icon: FaShoppingCart,
//       color: "text-green-500",
//       bgColor: "bg-green-100/50",
//     },
//     {
//       title: "Pending Orders",
//       value: pendingOrders,
//       icon: FaShoppingCart,
//       color: "text-orange-500",
//       bgColor: "bg-orange-100/50",
//     },
//     {
//       title: "New Users",
//       value: newUsersThisMonth,
//       icon: FaUsers,
//       color: "text-yellow-500",
//       bgColor: "bg-yellow-100/50",
//     },
//     {
//       title: "Total Products",
//       value: stats.products,
//       icon: FaBox,
//       color: "text-purple-500",
//       bgColor: "bg-purple-100/50",
//     },
//   ];

//   // -----------------------------------------------------
//   // TOP STATS CARDS WITH TRENDS & SPARKLINES
//   // -----------------------------------------------------
//   const statCards = [
//     {
//       title: "Products",
//       value: stats.products,
//       icon: FaBox,
//       gradient: "from-purple-600 to-pink-500",
//       trend: trends.products,
//       sparkline: monthlyProducts,
//     },
//     {
//       title: "Orders",
//       value: stats.orders,
//       icon: FaShoppingCart,
//       gradient: "from-green-500 to-teal-600",
//       trend: trends.orders,
//       sparkline: monthlyOrders,
//     },
//     {
//       title: "Users",
//       value: stats.users,
//       icon: FaUsers,
//       gradient: "from-yellow-400 to-orange-500",
//       trend: trends.users,
//       sparkline: monthlyUsers,
//     },
//     {
//       title: "Ads",
//       value: stats.ads,
//       icon: FaAd,
//       gradient: "from-blue-500 to-indigo-600",
//       trend: trends.ads,
//       sparkline: monthlyAds,
//     },
//   ];

//   return (
//     <AdminLayout>
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
//           Dashboard Overview
//         </h2>
//         <p className="text-gray-500 text-sm md:text-base">
//           Overview of your platform stats and activity
//         </p>
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//         {statCards.map((card, idx) => {
//           const Icon = card.icon;
//           const isPositive = card.trend >= 0;

//           return (
//             <Link
//               key={idx}
//               to={`/admin/${card.title.toLowerCase()}`}
//               className={`group relative p-6 rounded-3xl shadow-2xl text-white transform transition duration-300 hover:scale-105 bg-gradient-to-br ${card.gradient}`}
//             >
//               <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/20 blur-3xl animate-pulse"></div>

//               <div className="flex justify-between items-center relative z-10 mb-2">
//                 <div>
//                   <p className="text-sm opacity-90">{card.title}</p>
//                   <h3 className="text-5xl font-extrabold drop-shadow">
//                     {card.value}
//                   </h3>

//                   <div
//                     className={`flex items-center mt-1 text-sm font-semibold ${
//                       isPositive ? "text-green-400" : "text-red-400"
//                     }`}
//                   >
//                     {isPositive ? (
//                       <FaArrowUp className="mr-1" />
//                     ) : (
//                       <FaArrowDown className="mr-1" />
//                     )}
//                     {Math.abs(card.trend)}% this month
//                   </div>
//                 </div>

//                 <Icon
//                   size={50}
//                   className="opacity-80 group-hover:scale-110 transition"
//                 />
//               </div>

//               <div className="mt-4 h-12 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={card.sparkline}>
//                     <Line
//                       type="monotone"
//                       dataKey="value"
//                       stroke="white"
//                       strokeWidth={2}
//                       dot={false}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//         {/* Monthly Orders Chart */}
//         <div className="bg-white/80 backdrop-blur-xl p-6 shadow-2xl rounded-3xl border border-white/30">
//           <h3 className="text-2xl font-bold mb-4 text-gray-700">Monthly Orders</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={monthlyOrders}>
//               <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
//               <XAxis dataKey="month" stroke="#555" />
//               <YAxis stroke="#555" />
//               <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: "8px" }} />
//               <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={{ r: 5 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Monthly Users Chart */}
//         <div className="bg-white/80 backdrop-blur-xl p-6 shadow-2xl rounded-3xl border border-white/30">
//           <h3 className="text-2xl font-bold mb-4 text-gray-700">Monthly Users</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={monthlyUsers}>
//               <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
//               <XAxis dataKey="month" stroke="#555" />
//               <YAxis stroke="#555" />
//               <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: "8px" }} />
//               <Bar dataKey="value" fill="#facc15" barSize={30} radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* KPI SUMMARY */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         {kpis.map((kpi, idx) => (
//           <div
//             key={idx}
//             className={`flex items-center justify-between p-6 rounded-3xl shadow-lg ${kpi.bgColor} backdrop-blur-xl transition transform hover:scale-105`}
//           >
//             <div>
//               <p className="text-sm font-semibold text-gray-600">
//                 {kpi.title}
//               </p>
//               <h3 className={`text-2xl md:text-3xl font-bold ${kpi.color}`}>
//                 {kpi.value}
//               </h3>
//             </div>
//             <kpi.icon size={36} className={`${kpi.color} opacity-80`} />
//           </div>
//         ))}
//       </div>

//       {/* RECENT ORDERS */}
//       <div className="mb-12">
//         <h3 className="text-3xl font-bold text-gray-800 mb-4">
//           Recent Orders
//         </h3>
//         <div className="bg-white/70 p-6 shadow-xl rounded-3xl border backdrop-blur-xl overflow-x-auto">
//           <table className="w-full min-w-[700px]">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="p-4 text-left">Order #</th>
//                 <th className="p-4 text-left">User</th>
//                 <th className="p-4 text-left">Total</th>
//                 <th className="p-4 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentOrders.map((order) => (
//                 <tr
//                   key={order._id}
//                   className="border-b hover:bg-purple-50 transition"
//                 >
//                   <td className="p-4 font-semibold">
//                     {order.order_number}
//                   </td>

//                   <td className="p-4">
//                     {order.user_id?.name || "Unknown User"}
//                     <br />
//                     <span className="text-sm text-gray-500">
//                       {order.user_id?.email}
//                     </span>
//                   </td>

//                   <td className="p-4 text-green-600 font-bold">
//                     ${order.total}
//                   </td>

//                   <td className="p-4">
//                     <select
//                       value={order.status}
//                       onChange={(e) =>
//                         handleStatusChange(order._id, e.target.value)
//                       }
//                       className="border rounded px-2 py-1 text-sm font-semibold cursor-pointer"
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Confirmed">Confirmed</option>
//                       <option value="Packed">Packed</option>
//                       <option value="Out_for_delivery">
//                         Out for Delivery
//                       </option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Canceled">Canceled</option>
//                       <option value="Refunded">Refunded</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* RECENT USERS */}
//       <div>
//         <h3 className="text-3xl font-bold text-gray-800 mb-4">
//           Recent Users
//         </h3>
//         <div className="bg-white/70 p-6 shadow-xl rounded-3xl border backdrop-blur-xl overflow-x-auto">
//           <table className="w-full min-w-[600px]">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="p-4 text-left">Name</th>
//                 <th className="p-4 text-left">Email</th>
//                 <th className="p-4 text-left">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentUsers.map((user) => (
//                 <tr
//                   key={user._id}
//                   className="border-b hover:bg-purple-50 transition"
//                 >
//                   <td className="p-4 font-semibold">{user.name}</td>
//                   <td className="p-4">{user.email}</td>
//                   <td className="p-4 capitalize font-bold text-purple-700">
//                     {user.role}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }






// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import { Link } from "react-router-dom";
// import AdminLayout from "./AdminLayout";
// import {
//   FaBox,
//   FaShoppingCart,
//   FaUsers,
//   FaAd,
//   FaArrowUp,
//   FaArrowDown,
// } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import dayjs from "dayjs";

// export default function Dashboard() {
//   // ==========================================
//   // 1. EXACT ORIGINAL LOGIC & STATE
//   // ==========================================
//   const [stats, setStats] = useState({
//     products: 0,
//     orders: 0,
//     users: 0,
//     ads: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [recentUsers, setRecentUsers] = useState([]);

//   const [monthlyOrders, setMonthlyOrders] = useState([]);
//   const [monthlyUsers, setMonthlyUsers] = useState([]);
//   const [monthlyProducts, setMonthlyProducts] = useState([]);
//   const [monthlyAds, setMonthlyAds] = useState([]);

//   const [trends, setTrends] = useState({
//     orders: 0,
//     users: 0,
//     products: 0,
//     ads: 0,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);

//       try {
//         const [productsRes, ordersRes, usersRes, adsRes] =
//           await Promise.allSettled([
//             API.get("/products"),
//             API.get("/orders/all"),
//             API.get("/users"),
//             API.get("/ads"),
//           ]);

//         const productsArray =
//           productsRes.status === "fulfilled" &&
//           Array.isArray(productsRes.value.data)
//             ? productsRes.value.data
//             : [];

//         const ordersArray =
//           ordersRes.status === "fulfilled" &&
//           Array.isArray(ordersRes.value.data)
//             ? ordersRes.value.data
//             : [];

//         const usersArray =
//           usersRes.status === "fulfilled" &&
//           Array.isArray(usersRes.value.data)
//             ? usersRes.value.data
//             : [];

//         const adsArray =
//           adsRes.status === "fulfilled" &&
//           Array.isArray(adsRes.value.data)
//             ? adsRes.value.data
//             : [];

//         // SET STATS
//         setStats({
//           products: productsArray.length,
//           orders: ordersArray.length,
//           users: usersArray.length,
//           ads: adsArray.length,
//         });

//         setRecentOrders(ordersArray.slice(-50).reverse());
//         setRecentUsers(usersArray.slice(-50).reverse());

//         // MONTHLY DATA CALCULATION
//         const generateMonthlyData = (array) => {
//           const months = Array(12).fill(0);
//           array.forEach((item) => {
//             months[dayjs(item.createdAt).month()]++;
//           });
//           return months.map((count, idx) => ({
//             month: dayjs().month(idx).format("MMM"),
//             value: count,
//           }));
//         };

//         const orderCounts = generateMonthlyData(ordersArray);
//         const userCounts = generateMonthlyData(usersArray);
//         const productCounts = generateMonthlyData(productsArray);
//         const adsCounts = generateMonthlyData(adsArray);

//         setMonthlyOrders(orderCounts);
//         setMonthlyUsers(userCounts);
//         setMonthlyProducts(productCounts);
//         setMonthlyAds(adsCounts);

//         // TREND % CALCULATION
//         const calcTrend = (arr) => {
//           const current = arr[dayjs().month()]?.value || 0;
//           const last = arr[(dayjs().month() + 11) % 12]?.value || 0;
//           return last === 0 ? 100 : Math.round(((current - last) / last) * 100);
//         };

//         setTrends({
//           orders: calcTrend(orderCounts),
//           users: calcTrend(userCounts),
//           products: calcTrend(productCounts),
//           ads: calcTrend(adsCounts),
//         });
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   // ORDER STATUS CHANGE
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const res = await API.put(`/orders/${orderId}/status`, {
//         status: newStatus,
//       });

//       setRecentOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );

//       alert(res.data.message);
//     } catch (err) {
//       console.error("Failed to update order status:", err);
//       alert(err.response?.data?.message || "Failed to update order status");
//     }
//   };

//   if (loading)
//     return (
//       <AdminLayout>
//         <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center">
//             <div className="text-center">
//                 <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
//                 <div className="text-xl font-bold text-cyan-400 animate-pulse">
//                 Loading Dashboard...
//                 </div>
//             </div>
//         </div>
//       </AdminLayout>
//     );

//   // CALCULATIONS
//   const completedOrders = recentOrders.filter((o) => o.status === "Delivered").length;
//   const pendingOrders = recentOrders.filter((o) => o.status === "Pending").length;
//   const newUsersThisMonth = monthlyUsers[dayjs().month()]?.value || 0;

//   // ==========================================
//   // 2. STYLE CONFIGURATIONS (Premium Dark Theme)
//   // ==========================================

//   // Stat Cards Data
//   const statCards = [
//     {
//       title: "Products",
//       value: stats.products,
//       icon: FaBox,
//       // Updated Gradients for Dark Theme
//       gradient: "from-purple-900/80 to-purple-600/20 border-purple-500/30", 
//       glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
//       trend: trends.products,
//       sparkline: monthlyProducts,
//       lineColor: "#d8b4fe" // purple-300
//     },
//     {
//       title: "Orders",
//       value: stats.orders,
//       icon: FaShoppingCart,
//       gradient: "from-emerald-900/80 to-teal-600/20 border-emerald-500/30",
//       glow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
//       trend: trends.orders,
//       sparkline: monthlyOrders,
//       lineColor: "#6ee7b7" // emerald-300
//     },
//     {
//       title: "Users",
//       value: stats.users,
//       icon: FaUsers,
//       gradient: "from-amber-900/80 to-orange-600/20 border-amber-500/30",
//       glow: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
//       trend: trends.users,
//       sparkline: monthlyUsers,
//       lineColor: "#fcd34d" // amber-300
//     },
//     {
//       title: "Ads",
//       value: stats.ads,
//       icon: FaAd,
//       gradient: "from-blue-900/80 to-cyan-600/20 border-cyan-500/30",
//       glow: "shadow-[0_0_20px_rgba(34,211,238,0.15)]",
//       trend: trends.ads,
//       sparkline: monthlyAds,
//       lineColor: "#67e8f9" // cyan-300
//     },
//   ];

//   // KPI Cards Data
//   const kpis = [
//     {
//       title: "Completed Orders",
//       value: completedOrders,
//       icon: FaShoppingCart,
//       color: "text-emerald-400",
//       bgColor: "bg-emerald-500/10 border-emerald-500/20",
//     },
//     {
//       title: "Pending Orders",
//       value: pendingOrders,
//       icon: FaShoppingCart,
//       color: "text-orange-400",
//       bgColor: "bg-orange-500/10 border-orange-500/20",
//     },
//     {
//       title: "New Users",
//       value: newUsersThisMonth,
//       icon: FaUsers,
//       color: "text-yellow-400",
//       bgColor: "bg-yellow-500/10 border-yellow-500/20",
//     },
//     {
//       title: "Total Products",
//       value: stats.products,
//       icon: FaBox,
//       color: "text-purple-400",
//       bgColor: "bg-purple-500/10 border-purple-500/20",
//     },
//   ];

//   // ==========================================
//   // 3. RENDER (Dark Glass UI)
//   // ==========================================
//   return (
//     <AdminLayout>
//                     <div className="fixed bg-no-repeat bg-center bg-cover h-screen inset-0 opacity-[1.07] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://img.freepik.com/premium-vector/abstract-blue-moving-line-design-black-background_392592-1737.jpg")` }}></div>

//       {/* Background wrapper for dashboard content only */}
//       <div className="min-h-screen bg-[#0a0f1c] p-6 md:p-10 text-white font-sans relative overflow-hidden">
        
//         {/* Ambient Background Glows */}
//         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

//         {/* HEADER */}
//         <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 border-b border-white/10 pb-6">
//           <div>
//             <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
//               DASHBOARD
//             </h2>
//             <p className="text-slate-400 text-sm md:text-base mt-1">
//               Real-time overview of Milk Soda platform activity
//             </p>
//           </div>
//           <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
//              Live Data
//           </div>
//         </div>

//         {/* STATS CARDS */}
//         <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {statCards.map((card, idx) => {
//             const Icon = card.icon;
//             const isPositive = card.trend >= 0;

//             return (
//               <Link
//                 key={idx}
//                 to={`/admin/${card.title.toLowerCase()}`}
//                 className={`group relative p-6 rounded-2xl border backdrop-blur-md bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 ${card.gradient} ${card.glow}`}
//               >
//                 <div className="flex justify-between items-start relative z-10 mb-4">
//                   <div>
//                     <p className="text-slate-300 text-sm font-medium tracking-wide uppercase">{card.title}</p>
//                     <h3 className="text-4xl font-bold text-white mt-1 shadow-sm">
//                       {card.value}
//                     </h3>

//                     <div className={`flex items-center mt-2 text-xs font-bold px-2 py-1 rounded-md w-fit ${
//                         isPositive ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
//                       }`}>
//                       {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
//                       {Math.abs(card.trend)}% <span className="opacity-60 ml-1 font-normal">vs last month</span>
//                     </div>
//                   </div>

//                   <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition">
//                     <Icon size={24} className="text-white opacity-90" />
//                   </div>
//                 </div>

//                 {/* Sparkline Area */}
//                 <div className="h-16 w-full mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={card.sparkline}>
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke={card.lineColor}
//                         strokeWidth={2}
//                         dot={false}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* CHARTS SECTION */}
//         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
//           {/* Monthly Orders Chart */}
//           <div className="bg-[#0f172a]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
//             <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
//                 <span className="w-2 h-8 bg-emerald-400 rounded-full"></span>
//                 Monthly Orders
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={monthlyOrders}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
//                 <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                 <Tooltip 
//                     contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff", borderRadius: "12px" }}
//                     itemStyle={{ color: "#fff" }}
//                 />
//                 <Line 
//                     type="monotone" 
//                     dataKey="value" 
//                     stroke="#34d399" 
//                     strokeWidth={3} 
//                     dot={{ r: 4, fill: "#34d399", strokeWidth: 0 }} 
//                     activeDot={{ r: 6, fill: "#fff" }} 
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Monthly Users Chart */}
//           <div className="bg-[#0f172a]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
//             <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
//                 <span className="w-2 h-8 bg-yellow-400 rounded-full"></span>
//                 Monthly Users
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={monthlyUsers}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
//                 <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                 <Tooltip 
//                     cursor={{fill: 'rgba(255,255,255,0.05)'}}
//                     contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff", borderRadius: "12px" }}
//                 />
//                 <Bar dataKey="value" fill="#facc15" barSize={20} radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* KPI SUMMARY */}
//         <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {kpis.map((kpi, idx) => (
//             <div
//               key={idx}
//               className={`flex items-center justify-between p-5 rounded-2xl border backdrop-blur-sm hover:bg-white/5 transition-colors ${kpi.bgColor}`}
//             >
//               <div>
//                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
//                   {kpi.title}
//                 </p>
//                 <h3 className={`text-2xl font-bold ${kpi.color}`}>
//                   {kpi.value}
//                 </h3>
//               </div>
//               <div className={`p-3 rounded-full bg-black/20 ${kpi.color}`}>
//                  <kpi.icon size={20} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* RECENT ORDERS TABLE */}
//         <div className="relative z-10 mb-10">
//           <h3 className="text-2xl font-bold text-white mb-4 pl-2">Recent Orders</h3>
//           <div className="bg-[#0f172a]/60 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[800px]">
//                 <thead className="bg-white/5 border-b border-white/10">
//                   <tr className="text-slate-300 text-sm uppercase tracking-wider">
//                     <th className="p-5 text-left font-semibold">Order ID</th>
//                     <th className="p-5 text-left font-semibold">Customer</th>
//                     <th className="p-5 text-left font-semibold">Total</th>
//                     <th className="p-5 text-left font-semibold">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5 text-sm text-slate-300">
//                   {recentOrders.map((order) => (
//                     <tr key={order._id} className="hover:bg-white/5 transition-colors group">
//                       <td className="p-5 font-mono text-cyan-400 group-hover:text-cyan-300">
//                         #{order.order_number}
//                       </td>
//                       <td className="p-5">
//                         <div className="font-semibold text-white">{order.user_id?.name || "Unknown"}</div>
//                         <div className="text-xs text-slate-500">{order.user_id?.email}</div>
//                       </td>
//                       <td className="p-5 font-bold text-emerald-400">
//                         ${order.total}
//                       </td>
//                       <td className="p-5">
//                         <select
//                           value={order.status}
//                           onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                           className="bg-[#020617] border border-white/20 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Confirmed">Confirmed</option>
//                           <option value="Packed">Packed</option>
//                           <option value="Out_for_delivery">Out for Delivery</option>
//                           <option value="Delivered">Delivered</option>
//                           <option value="Canceled">Canceled</option>
//                           <option value="Refunded">Refunded</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* RECENT USERS TABLE */}
//         <div className="relative z-10 pb-10">
//           <h3 className="text-2xl font-bold text-white mb-4 pl-2">Recent Users</h3>
//           <div className="bg-[#0f172a]/60 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[600px]">
//                 <thead className="bg-white/5 border-b border-white/10">
//                   <tr className="text-slate-300 text-sm uppercase tracking-wider">
//                     <th className="p-5 text-left font-semibold">Name</th>
//                     <th className="p-5 text-left font-semibold">Email</th>
//                     <th className="p-5 text-left font-semibold">Role</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5 text-sm text-slate-300">
//                   {recentUsers.map((user) => (
//                     <tr key={user._id} className="hover:bg-white/5 transition-colors">
//                       <td className="p-5 font-medium text-white">{user.name}</td>
//                       <td className="p-5 text-slate-400">{user.email}</td>
//                       <td className="p-5">
//                         <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
//                             user.role === 'admin' 
//                             ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
//                             : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
//                         }`}>
//                             {user.role}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }









import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaAd,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import dayjs from "dayjs";

export default function Dashboard() {
  // ==========================================
  // 1. EXACT ORIGINAL LOGIC & STATE
  // ==========================================
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    ads: 0,
  });

  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [monthlyProducts, setMonthlyProducts] = useState([]);
  const [monthlyAds, setMonthlyAds] = useState([]);

  const [trends, setTrends] = useState({
    orders: 0,
    users: 0,
    products: 0,
    ads: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const [productsRes, ordersRes, usersRes, adsRes] =
          await Promise.allSettled([
            API.get("/products"),
            API.get("/orders/all"),
            API.get("/users"),
            API.get("/ads"),
          ]);

        const productsArray =
          productsRes.status === "fulfilled" &&
          Array.isArray(productsRes.value.data)
            ? productsRes.value.data
            : [];

        const ordersArray =
          ordersRes.status === "fulfilled" &&
          Array.isArray(ordersRes.value.data)
            ? ordersRes.value.data
            : [];

        const usersArray =
          usersRes.status === "fulfilled" &&
          Array.isArray(usersRes.value.data)
            ? usersRes.value.data
            : [];

        const adsArray =
          adsRes.status === "fulfilled" &&
          Array.isArray(adsRes.value.data)
            ? adsRes.value.data
            : [];

        // SET STATS
        setStats({
          products: productsArray.length,
          orders: ordersArray.length,
          users: usersArray.length,
          ads: adsArray.length,
        });

        setRecentOrders(ordersArray.slice(-50).reverse());
        setRecentUsers(usersArray.slice(-50).reverse());

        // MONTHLY DATA CALCULATION
        const generateMonthlyData = (array) => {
          const months = Array(12).fill(0);
          array.forEach((item) => {
            months[dayjs(item.createdAt).month()]++;
          });
          return months.map((count, idx) => ({
            month: dayjs().month(idx).format("MMM"),
            value: count,
          }));
        };

        const orderCounts = generateMonthlyData(ordersArray);
        const userCounts = generateMonthlyData(usersArray);
        const productCounts = generateMonthlyData(productsArray);
        const adsCounts = generateMonthlyData(adsArray);

        setMonthlyOrders(orderCounts);
        setMonthlyUsers(userCounts);
        setMonthlyProducts(productCounts);
        setMonthlyAds(adsCounts);

        // TREND % CALCULATION
        const calcTrend = (arr) => {
          const current = arr[dayjs().month()]?.value || 0;
          const last = arr[(dayjs().month() + 11) % 12]?.value || 0;
          return last === 0 ? 100 : Math.round(((current - last) / last) * 100);
        };

        setTrends({
          orders: calcTrend(orderCounts),
          users: calcTrend(userCounts),
          products: calcTrend(productCounts),
          ads: calcTrend(adsCounts),
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ORDER STATUS CHANGE
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await API.put(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      setRecentOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      alert(res.data.message);
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="min-h-screen w-full bg-[#0a0f1c] flex items-center justify-center relative overflow-hidden">
            {/* Fixed Background to fill whole page */}
            <div className="fixed inset-0 bg-[#0a0f1c] z-0"></div>
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] z-0 pointer-events-none"></div>
            
            <div className="text-center relative z-10">
                <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.4)]"></div>
                <div className="text-xl font-bold text-cyan-400 animate-pulse tracking-widest uppercase text-sm">
                Loading Dashboard...
                </div>
            </div>
        </div>
      </AdminLayout>
    );

  // CALCULATIONS
  const completedOrders = recentOrders.filter((o) => o.status === "Delivered").length;
  const pendingOrders = recentOrders.filter((o) => o.status === "Pending").length;
  const newUsersThisMonth = monthlyUsers[dayjs().month()]?.value || 0;

  // ==========================================
  // 2. STYLE CONFIGURATIONS (Premium Dark Theme)
  // ==========================================

  // Stat Cards Data
  const statCards = [
    {
      title: "Products",
      value: stats.products,
      icon: FaBox,
      gradient: "from-purple-900/80 to-purple-600/20 border-purple-500/30", 
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      trend: trends.products,
      sparkline: monthlyProducts,
      lineColor: "#d8b4fe" // purple-300
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: FaShoppingCart,
      gradient: "from-emerald-900/80 to-teal-600/20 border-emerald-500/30",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
      trend: trends.orders,
      sparkline: monthlyOrders,
      lineColor: "#6ee7b7" // emerald-300
    },
    {
      title: "Users",
      value: stats.users,
      icon: FaUsers,
      gradient: "from-amber-900/80 to-orange-600/20 border-amber-500/30",
      glow: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
      trend: trends.users,
      sparkline: monthlyUsers,
      lineColor: "#fcd34d" // amber-300
    },
    {
      title: "Ads",
      value: stats.ads,
      icon: FaAd,
      gradient: "from-blue-900/80 to-cyan-600/20 border-cyan-500/30",
      glow: "shadow-[0_0_20px_rgba(34,211,238,0.15)]",
      trend: trends.ads,
      sparkline: monthlyAds,
      lineColor: "#67e8f9" // cyan-300
    },
  ];

  // KPI Cards Data
  const kpis = [
    {
      title: "Completed Orders",
      value: completedOrders,
      icon: FaShoppingCart,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: FaShoppingCart,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "New Users",
      value: newUsersThisMonth,
      icon: FaUsers,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10 border-yellow-500/20",
    },
    {
      title: "Total Products",
      value: stats.products,
      icon: FaBox,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  // ==========================================
  // 3. RENDER (Dark Glass UI + Fixed Background)
  // ==========================================
  return (
    <AdminLayout>
      {/* 
          MAIN WRAPPER 
          - min-h-screen: ensures it covers at least the viewport.
          - bg-[#0a0f1c]: sets the base color.
          - isolate: creates stacking context
      */}
      <div className="min-h-screen w-full bg-[#0a0f1c] relative font-sans text-white isolate">
        
        {/* --- FIXED BACKGROUND LAYERS (Consistent with ManageOrders) --- */}
        <div className="fixed inset-0 bg-[#0a0f1c] -z-20"></div>
        
        {/* 1. Tech Grid Pattern */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
        
        {/* 2. Spotlight Gradient at Top */}
        <div className="fixed top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(6,182,212,0.15),transparent)] pointer-events-none -z-10"></div>

        {/* 3. Ambient Glows (Specific to Dashboard, kept behind content) */}
        <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>


        {/* --- CONTENT CONTAINER --- */}
        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 border-b border-white/10 pb-6">
            <div>
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                DASHBOARD
                </h2>
                <p className="text-slate-400 text-sm md:text-base mt-1 font-medium">
                Real-time overview of Milk Soda platform activity
                </p>
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)] backdrop-blur-sm">
                Live Data
            </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((card, idx) => {
                const Icon = card.icon;
                const isPositive = card.trend >= 0;

                return (
                <Link
                    key={idx}
                    to={`/admin/${card.title.toLowerCase()}`}
                    className={`group relative p-6 rounded-2xl border backdrop-blur-md bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 ${card.gradient} ${card.glow}`}
                >
                    <div className="flex justify-between items-start relative z-10 mb-4">
                    <div>
                        <p className="text-slate-300 text-sm font-medium tracking-wide uppercase">{card.title}</p>
                        <h3 className="text-4xl font-bold text-white mt-1 shadow-sm">
                        {card.value}
                        </h3>

                        <div className={`flex items-center mt-2 text-xs font-bold px-2 py-1 rounded-md w-fit ${
                            isPositive ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                        }`}>
                        {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                        {Math.abs(card.trend)}% <span className="opacity-60 ml-1 font-normal">vs last month</span>
                        </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition">
                        <Icon size={24} className="text-white opacity-90" />
                    </div>
                    </div>

                    {/* Sparkline Area */}
                    <div className="h-16 w-full mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={card.sparkline}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={card.lineColor}
                            strokeWidth={2}
                            dot={false}
                        />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                </Link>
                );
            })}
            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            
            {/* Monthly Orders Chart */}
            <div className="bg-[#0f172a]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl hover:border-cyan-500/20 transition-colors">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="w-2 h-8 bg-emerald-400 rounded-full"></span>
                    Monthly Orders
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyOrders}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff", borderRadius: "12px" }}
                        itemStyle={{ color: "#fff" }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#34d399" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: "#34d399", strokeWidth: 0 }} 
                        activeDot={{ r: 6, fill: "#fff" }} 
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Users Chart */}
            <div className="bg-[#0f172a]/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl hover:border-yellow-500/20 transition-colors">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="w-2 h-8 bg-yellow-400 rounded-full"></span>
                    Monthly Users
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyUsers}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff", borderRadius: "12px" }}
                    />
                    <Bar dataKey="value" fill="#facc15" barSize={20} radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
            </div>

            {/* KPI SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {kpis.map((kpi, idx) => (
                <div
                key={idx}
                className={`flex items-center justify-between p-5 rounded-2xl border backdrop-blur-sm hover:bg-white/5 transition-colors ${kpi.bgColor}`}
                >
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {kpi.title}
                    </p>
                    <h3 className={`text-2xl font-bold ${kpi.color}`}>
                    {kpi.value}
                    </h3>
                </div>
                <div className={`p-3 rounded-full bg-black/20 ${kpi.color}`}>
                    <kpi.icon size={20} />
                </div>
                </div>
            ))}
            </div>

            {/* RECENT ORDERS TABLE */}
            <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-4 pl-2">Recent Orders</h3>
            <div className="bg-[#0f172a]/60 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-white/5 border-b border-white/10">
                    <tr className="text-slate-300 text-sm uppercase tracking-wider">
                        <th className="p-5 text-left font-semibold">Order ID</th>
                        <th className="p-5 text-left font-semibold">Customer</th>
                        <th className="p-5 text-left font-semibold">Total</th>
                        <th className="p-5 text-left font-semibold">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                    {recentOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-5 font-mono text-cyan-400 group-hover:text-cyan-300">
                            #{order.order_number}
                        </td>
                        <td className="p-5">
                            <div className="font-semibold text-white">{order.user_id?.name || "Unknown"}</div>
                            <div className="text-xs text-slate-500">{order.user_id?.email}</div>
                        </td>
                        <td className="p-5 font-bold text-emerald-400">
                            ${order.total}
                        </td>
                        <td className="p-5">
                            <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="bg-[#020617] border border-white/20 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                            >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Packed">Packed</option>
                            <option value="Out_for_delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Refunded">Refunded</option>
                            </select>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* RECENT USERS TABLE */}
            <div className="pb-10">
            <h3 className="text-2xl font-bold text-white mb-4 pl-2">Recent Users</h3>
            <div className="bg-[#0f172a]/60 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-white/5 border-b border-white/10">
                    <tr className="text-slate-300 text-sm uppercase tracking-wider">
                        <th className="p-5 text-left font-semibold">Name</th>
                        <th className="p-5 text-left font-semibold">Email</th>
                        <th className="p-5 text-left font-semibold">Role</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                    {recentUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-white/5 transition-colors">
                        <td className="p-5 font-medium text-white">{user.name}</td>
                        <td className="p-5 text-slate-400">{user.email}</td>
                        <td className="p-5">
                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                user.role === 'admin' 
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                                {user.role}
                            </span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}