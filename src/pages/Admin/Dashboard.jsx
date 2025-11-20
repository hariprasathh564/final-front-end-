// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [stats, setStats] = useState({ products: 0, orders: 0, users: 0,  ads:0});

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const p = await API.get("/products");
//         const payments = await API.get("/payments"); // admin route; will fail if not admin
//         setStats({ products: p.data.length, orders: 0, users: 0 });
//       } catch (err) {
//         // ignore
//       }
//     };
//     load();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="p-4 border rounded">
//           <div className="text-sm">Products</div>
//           <div className="text-2xl font-bold">{stats.products}</div>
//           <Link to="/admin/products" className="text-sky-600 text-sm">Manage</Link>
//         </div>

//         <div className="p-4 border rounded">
//           <div className="text-sm">Orders</div>
//           <div className="text-2xl font-bold">{stats.orders}</div>
//           <Link to="/admin/orders" className="text-sky-600 text-sm">Manage</Link>
//         </div>

//         <div className="p-4 border rounded">
//           <div className="text-sm">Users</div>
//           <div className="text-2xl font-bold">{stats.users}</div>
//           <Link to="/admin/users" className="text-sky-600 text-sm">Manage</Link>
//         </div>

//         <div className="p-4 border rounded">
//   <div className="text-sm">Homepage Ads</div>
//   <div className="text-2xl font-bold">{stats.users}</div>
//   <Link to="/admin/ads" className="text-sky-600 text-sm">Manage</Link>
// </div>

//       </div>
//     </div>
//   );
// }
















// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, ads: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadStats = async () => {
//       setLoading(true);

//       try {
//         // Fetch all stats in parallel, each wrapped in try/catch to avoid breaking all if one fails
//         const results = await Promise.allSettled([
//           API.get("/products"),
//           API.get("/orders"),
//           API.get("/users"),
//           API.get("/ads")
//         ]);

//         const [productsRes, ordersRes, usersRes, adsRes] = results;

//         setStats({
//           products: productsRes.status === "fulfilled" && Array.isArray(productsRes.value.data)
//             ? productsRes.value.data.length
//             : 0,
//           orders: ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value.data)
//             ? ordersRes.value.data.length
//             : 0,
//           users: usersRes.status === "fulfilled" && Array.isArray(usersRes.value.data)
//             ? usersRes.value.data.length
//             : 0,
//           ads: adsRes.status === "fulfilled" && Array.isArray(adsRes.value.data)
//             ? adsRes.value.data.length
//             : 0
//         });

//       } catch (err) {
//         console.error("Unexpected error loading stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadStats();
//   }, []);

//   if (loading) return <p className="p-6">Loading dashboard stats...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="p-4 border rounded">
//           <div className="text-sm">Products</div>
//           <div className="text-2xl font-bold">{stats.products}</div>
//           <Link to="/admin/products" className="text-sky-600 text-sm">Manage</Link>
//         </div>

//         <div className="p-4 border rounded">
//           <div className="text-sm">Orders</div>
//           <div className="text-2xl font-bold">{stats.orders}</div>
//           <Link to="/admin/orders" className="text-sky-600 text-sm">Manage</Link>
//         </div>

//         <div className="p-4 border rounded">
//           <div className="text-sm">Users</div>
//           <div className="text-2xl font-bold">{stats.users}</div>
//           <Link to="/admin/users" className="text-sky-600 text-sm">Manage</Link>
//         </div>

//         <div className="p-4 border rounded">
//           <div className="text-sm">Homepage Ads</div>
//           <div className="text-2xl font-bold">{stats.ads}</div>
//           <Link to="/admin/ads" className="text-sky-600 text-sm">Manage</Link>
//         </div>
//       </div>
//     </div>
//   );
// }










// frontend/src/pages/Admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import { Link } from "react-router-dom";
import { FaBox, FaShoppingCart, FaUsers, FaAd } from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, ads: 0 });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productsRes, ordersRes, usersRes, adsRes] = await Promise.allSettled([
          API.get("/products"),
          API.get("/orders"),
          API.get("/users"),
          API.get("/ads")
        ]);

        setStats({
          products: productsRes.status === "fulfilled" && Array.isArray(productsRes.value.data)
            ? productsRes.value.data.length : 0,
          orders: ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value.data)
            ? ordersRes.value.data.length : 0,
          users: usersRes.status === "fulfilled" && Array.isArray(usersRes.value.data)
            ? usersRes.value.data.length : 0,
          ads: adsRes.status === "fulfilled" && Array.isArray(adsRes.value.data)
            ? adsRes.value.data.length : 0
        });

        // Set recent orders and users for preview tables
        setRecentOrders(ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value.data)
          ? ordersRes.value.data.slice(-5).reverse() : []);

        setRecentUsers(usersRes.status === "fulfilled" && Array.isArray(usersRes.value.data)
          ? usersRes.value.data.slice(-5).reverse() : []);

      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p className="p-6 text-lg">Loading dashboard...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">Milk Soda Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Link to="/admin/products" className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Products</div>
              <div className="text-2xl font-bold">{stats.products}</div>
            </div>
            <FaBox size={36} />
          </div>
        </Link>

        <Link to="/admin/orders" className="bg-gradient-to-r from-green-400 to-teal-400 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Orders</div>
              <div className="text-2xl font-bold">{stats.orders}</div>
            </div>
            <FaShoppingCart size={36} />
          </div>
        </Link>

        <Link to="/admin/users" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Users</div>
              <div className="text-2xl font-bold">{stats.users}</div>
            </div>
            <FaUsers size={36} />
          </div>
        </Link>

        <Link to="/admin/ads" className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Ads</div>
              <div className="text-2xl font-bold">{stats.ads}</div>
            </div>
            <FaAd size={36} />
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 text-left">Order #</th>
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.order_number}</td>
                  <td className="p-3">{order.user_id}</td>
                  <td className="p-3">${order.total}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Users */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
