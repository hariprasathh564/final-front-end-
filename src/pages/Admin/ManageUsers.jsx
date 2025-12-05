
// // frontend/src/pages/Admin/ManageUsers.jsx
// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({ name: "", email: "", role: "user" });
//   const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

//   useEffect(() => { loadUsers(); }, []);

//   const loadUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to load users:", err);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredUsers = users.filter((u) => {
//     const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
//     const matchRole = roleFilter === "all" || u.role === roleFilter;
//     return matchSearch && matchRole;
//   });

//   const openModal = (user) => {
//     setEditingId(user._id);
//     setFormData({ name: user.name, email: user.email, role: user.role });
//     setModalOpen(true);
//   };

//   const closeModal = () => { setModalOpen(false); setEditingId(null); }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/users/${editingId}`, formData);
//       closeModal();
//       loadUsers();
//     } catch (err) { console.error(err); alert("Failed to save user"); }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user?")) return;
//     try { await API.delete(`/users/${id}`); loadUsers(); } catch (err) { console.error(err); alert("Failed to delete user"); }
//   };

//   const roleColors = { admin: "bg-red-500", customer: "bg-blue-500" };

//   return (
//     <AdminLayout>
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
//           <h2 className="text-3xl font-bold">Manage Users</h2>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setViewMode("table")}
//               className={`px-4 py-2 rounded-lg ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//             >
//               Table View
//             </button>
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`px-4 py-2 rounded-lg ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//             >
//               Grid View
//             </button>
//           </div>
//         </div>

//         {/* Search + Filter */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition"
//           />
//           <select
//             value={roleFilter}
//             onChange={(e) => setRoleFilter(e.target.value)}
//             className="border p-3 rounded-lg shadow-sm transition"
//           >
//             <option value="all">All Roles</option>
//             <option value="customer">customer</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         {/* Users Display */}
//         {loading ? (
//           <p className="p-6">Loading users...</p>
//         ) : filteredUsers.length === 0 ? (
//           <p className="p-6">No matching users found.</p>
//         ) : viewMode === "table" ? (
//           <div className="bg-white shadow-lg rounded-xl border overflow-x-auto">
//             <table className="min-w-full border-collapse">
//               <thead className="bg-gray-100 sticky top-0">
//                 <tr>
//                   <th className="p-3 text-left font-semibold">User</th>
//                   <th className="p-3 text-left font-semibold">Email</th>
//                   <th className="p-3 text-left font-semibold">Role</th>
//                   <th className="p-3 text-center font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map((u) => (
//                   <tr key={u._id} className="border-t hover:bg-gray-50 transition">
//                     <td className="p-3 flex items-center gap-3">
//                       <img
//                         src={u.profileImage ? `http://localhost:3000/uploads/${u.profileImage}` : "https://i.ibb.co/1v2f8nC/default-avatar.png"}
//                         alt="avatar"
//                         className="w-10 h-10 rounded-full border"
//                       />
//                       {u.name}
//                     </td>
//                     <td className="p-3">{u.email}</td>
//                     <td className="p-3 capitalize">{u.role}</td>
//                     <td className="p-3 text-center space-x-2">
//                       <button
//                         onClick={() => openModal(u)}
//                         className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(u._id)}
//                         className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredUsers.map((u) => (
//               <div key={u._id} className="bg-white shadow-xl rounded-xl p-4 flex flex-col items-center text-center hover:scale-105 transition-transform">
//                 <img
//                   src={u.profileImage ? `http://localhost:3000/uploads/${u.profileImage}` : "https://i.ibb.co/1v2f8nC/default-avatar.png"}
//                   alt="avatar"
//                   className="w-20 h-20 rounded-full border-2 border-gray-200 mb-4 object-cover hover:scale-110 transition-transform"
//                 />
//                 <h3 className="text-xl font-semibold">{u.name}</h3>
//                 <p className="text-gray-500 mb-2">{u.email}</p>
//                 <span className={`text-white px-3 py-1 rounded-full mb-4 ${roleColors[u.role] || "bg-gray-400"}`}>
//                   {u.role}
//                 </span>
//                 <div className="flex gap-2">
//                   <button onClick={() => openModal(u)} className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition">
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(u._id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Modal */}
//         {modalOpen && (
//           <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 transition-opacity duration-300">
//             <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-transform duration-300 scale-100">
//               <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={closeModal}>X</button>
//               <h3 className="text-2xl font-bold mb-4">Edit User</h3>
//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border p-3 rounded-lg" required />
//                 <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border p-3 rounded-lg" required />
//                 <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full border p-3 rounded-lg">
//                   <option value="customer">customer</option>
//                   <option value="admin">Admin</option>
//                 </select>
//                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">Update User</button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// }






// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";
// import { 
//   FaUserEdit, 
//   FaTrash, 
//   FaTable, 
//   FaThLarge, 
//   FaSearch, 
//   FaTimes, 
//   FaSave, 
//   FaUserCircle 
// } from "react-icons/fa";

// export default function ManageUsers() {
//   // ==========================================
//   // 1. EXACT ORIGINAL LOGIC
//   // ==========================================
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({ name: "", email: "", role: "user" });
//   const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

//   useEffect(() => { loadUsers(); }, []);

//   const loadUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to load users:", err);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredUsers = users.filter((u) => {
//     const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
//     const matchRole = roleFilter === "all" || u.role === roleFilter;
//     return matchSearch && matchRole;
//   });

//   const openModal = (user) => {
//     setEditingId(user._id);
//     setFormData({ name: user.name, email: user.email, role: user.role });
//     setModalOpen(true);
//   };

//   const closeModal = () => { setModalOpen(false); setEditingId(null); }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/users/${editingId}`, formData);
//       closeModal();
//       loadUsers();
//     } catch (err) { console.error(err); alert("Failed to save user"); }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user?")) return;
//     try { await API.delete(`/users/${id}`); loadUsers(); } catch (err) { console.error(err); alert("Failed to delete user"); }
//   };

//   // Updated for Dark Theme visuals
//   const roleColors = { 
//     admin: "bg-purple-500/20 text-purple-300 border-purple-500/50", 
//     customer: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50" 
//   };

//   // Helper for Image Logic
//   const getUserImage = (u) => 
//     u.profileImage 
//       ? (u.profileImage.startsWith("http") ? u.profileImage : `http://localhost:3000/uploads/${u.profileImage}`)
//       : "https://i.ibb.co/1v2f8nC/default-avatar.png";

//   // ==========================================
//   // 2. PREMIUM RENDER
//   // ==========================================
//   return (
//     <AdminLayout>
//                     <div className="fixed bg-no-repeat bg-center bg-cover h-screen inset-0 opacity-[1.07] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://img.freepik.com/premium-vector/abstract-blue-moving-line-design-black-background_392592-1737.jpg")` }}></div>

//       <div className="min-h-screen bg-[#0a0f1c] p-6 md:p-10 text-white relative overflow-hidden">
        
//         {/* Background Glows */}
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>

//         <div className="max-w-7xl mx-auto relative z-10">

//           {/* Header */}
//           <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-6 border-b border-white/10 pb-6">
//             <div>
//               <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
//                 MANAGE USERS
//               </h2>
//               <p className="text-slate-400 mt-1 text-sm">Administrate customer accounts and permissions.</p>
//             </div>
            
//             {/* View Toggles */}
//             <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
//               <button
//                 onClick={() => setViewMode("table")}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
//                   viewMode === "table" 
//                     ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30" 
//                     : "text-slate-400 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 <FaTable /> Table
//               </button>
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
//                   viewMode === "grid" 
//                     ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30" 
//                     : "text-slate-400 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 <FaThLarge /> Grid
//               </button>
//             </div>
//           </div>

//           {/* Search + Filter */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="md:col-span-2 relative group">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <FaSearch className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search users by name or email..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-11 pr-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner backdrop-blur-sm"
//               />
//             </div>
//             <div className="relative">
//               <select
//                 value={roleFilter}
//                 onChange={(e) => setRoleFilter(e.target.value)}
//                 className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all cursor-pointer appearance-none shadow-inner backdrop-blur-sm"
//               >
//                 <option value="all">All Roles</option>
//                 <option value="customer">Customer</option>
//                 <option value="admin">Admin</option>
//               </select>
//               {/* Custom Arrow */}
//               <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
//               </div>
//             </div>
//           </div>

//           {/* Users Display */}
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20">
//                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
//                <div className="text-cyan-400 animate-pulse font-bold">Loading Users...</div>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-slate-400">
//               <FaUserCircle className="mx-auto text-5xl mb-4 opacity-30" />
//               No matching users found.
//             </div>
//           ) : viewMode === "table" ? (
//             // TABLE VIEW
//             <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="bg-white/5 border-b border-white/10">
//                     <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider text-left">
//                       <th className="p-5">User Profile</th>
//                       <th className="p-5">Email Contact</th>
//                       <th className="p-5">Access Role</th>
//                       <th className="p-5 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/5">
//                     {filteredUsers.map((u) => (
//                       <tr key={u._id} className="hover:bg-white/5 transition-colors group">
//                         <td className="p-5">
//                           <div className="flex items-center gap-4">
//                             <div className="relative w-10 h-10">
//                                 <img
//                                   src={getUserImage(u)}
//                                   alt="avatar"
//                                   className="w-full h-full rounded-full object-cover border border-white/20 group-hover:border-cyan-400 transition-colors"
//                                 />
//                                 <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0f172a] ${u.role === 'admin' ? 'bg-purple-500' : 'bg-cyan-500'}`}></div>
//                             </div>
//                             <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{u.name}</span>
//                           </div>
//                         </td>
//                         <td className="p-5 text-slate-400 font-mono text-sm">{u.email}</td>
//                         <td className="p-5">
//                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${roleColors[u.role] || "bg-slate-700 text-slate-300"}`}>
//                             {u.role}
//                           </span>
//                         </td>
//                         <td className="p-5 text-center">
//                           <div className="flex items-center justify-center gap-2">
//                             <button
//                               onClick={() => openModal(u)}
//                               className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
//                               title="Edit"
//                             >
//                               <FaUserEdit />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(u._id)}
//                               className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
//                               title="Delete"
//                             >
//                               <FaTrash />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             // GRID VIEW
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredUsers.map((u) => (
//                 <div key={u._id} className="group bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  
//                   <div className="relative mb-4">
//                     <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
//                     <img
//                       src={getUserImage(u)}
//                       alt="avatar"
//                       className="relative w-24 h-24 rounded-full border-2 border-white/10 object-cover group-hover:scale-105 transition-transform"
//                     />
//                     <span className={`absolute bottom-1 right-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-white border shadow-sm ${roleColors[u.role]}`}>
//                         {u.role}
//                     </span>
//                   </div>

//                   <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">{u.name}</h3>
//                   <p className="text-slate-400 text-sm mb-6 break-all">{u.email}</p>

//                   <div className="flex gap-3 w-full mt-auto">
//                     <button onClick={() => openModal(u)} className="flex-1 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold">
//                       <FaUserEdit /> Edit
//                     </button>
//                     <button onClick={() => handleDelete(u._id)} className="flex-1 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold">
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Modal */}
//           {modalOpen && (
//             <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
//                 {/* Backdrop */}
//               <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
              
//               {/* Modal Content */}
//               <div className="relative bg-[#0f172a] border border-white/20 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md transform transition-all scale-100 animate-fadeIn">
//                 <button 
//                     className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors" 
//                     onClick={closeModal}
//                 >
//                     <FaTimes size={20} />
//                 </button>

//                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
//                     <FaUserEdit className="text-cyan-400" /> Edit User
//                 </h3>

//                 <form className="space-y-5" onSubmit={handleSubmit}>
//                   <div>
//                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
//                       <input 
//                         type="text" 
//                         value={formData.name} 
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50" 
//                         required 
//                       />
//                   </div>

//                   <div>
//                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
//                       <input 
//                         type="email" 
//                         value={formData.email} 
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50" 
//                         required 
//                       />
//                   </div>

//                   <div>
//                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role Permission</label>
//                       <select 
//                         value={formData.role} 
//                         onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
//                         className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 cursor-pointer"
//                       >
//                         <option value="customer" className="bg-slate-900">Customer</option>
//                         <option value="admin" className="bg-slate-900">Admin</option>
//                       </select>
//                   </div>

//                   <button 
//                     type="submit" 
//                     className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
//                   >
//                     <FaSave /> Update User
//                   </button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }






import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import AdminLayout from "./AdminLayout";
import { 
  FaUserEdit, 
  FaTrash, 
  FaTable, 
  FaThLarge, 
  FaSearch, 
  FaTimes, 
  FaSave, 
  FaUserCircle 
} from "react-icons/fa";

export default function ManageUsers() {
  // ==========================================
  // 1. EXACT ORIGINAL LOGIC
  // ==========================================
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user" });
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const openModal = (user) => {
    setEditingId(user._id);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditingId(null); }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/users/${editingId}`, formData);
      closeModal();
      loadUsers();
    } catch (err) { console.error(err); alert("Failed to save user"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try { await API.delete(`/users/${id}`); loadUsers(); } catch (err) { console.error(err); alert("Failed to delete user"); }
  };

  // Updated for Dark Theme visuals
  const roleColors = { 
    admin: "bg-purple-500/20 text-purple-300 border-purple-500/50", 
    customer: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50" 
  };

  // Helper for Image Logic
  const getUserImage = (u) => 
    u.profileImage 
      ? (u.profileImage.startsWith("http") ? u.profileImage : `http://localhost:3000/uploads/${u.profileImage}`)
      : "https://i.ibb.co/1v2f8nC/default-avatar.png";

  // ==========================================
  // 2. PREMIUM RENDER (Fixed Background)
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
        
        {/* --- FIXED BACKGROUND LAYERS --- */}
        <div className="fixed inset-0 bg-[#0a0f1c] -z-20"></div>
        
        {/* 1. Tech Grid Pattern */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
        
        {/* 2. Spotlight Gradient at Top */}
        <div className="fixed top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(6,182,212,0.15),transparent)] pointer-events-none -z-10"></div>

        {/* 3. Ambient Glows (Fixed) */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>


        {/* --- CONTENT CONTAINER --- */}
        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-6 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                MANAGE USERS
              </h2>
              <p className="text-slate-400 mt-1 text-sm">Administrate customer accounts and permissions.</p>
            </div>
            
            {/* View Toggles */}
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  viewMode === "table" 
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FaTable /> Table
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  viewMode === "grid" 
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FaThLarge /> Grid
              </button>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner backdrop-blur-sm"
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all cursor-pointer appearance-none shadow-inner backdrop-blur-sm"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              {/* Custom Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </div>

          {/* Users Display */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
               <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4 shadow-[0_0_20px_rgba(6,182,212,0.4)]"></div>
               <div className="text-cyan-400 animate-pulse font-bold tracking-widest">Loading Users...</div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-slate-400 backdrop-blur-sm">
              <FaUserCircle className="mx-auto text-5xl mb-4 opacity-30" />
              No matching users found.
            </div>
          ) : viewMode === "table" ? (
            // TABLE VIEW
            <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider text-left">
                      <th className="p-5">User Profile</th>
                      <th className="p-5">Email Contact</th>
                      <th className="p-5">Access Role</th>
                      <th className="p-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-5">
                          <div className="flex items-center gap-4">
                            <div className="relative w-10 h-10">
                                <img
                                  src={getUserImage(u)}
                                  alt="avatar"
                                  className="w-full h-full rounded-full object-cover border border-white/20 group-hover:border-cyan-400 transition-colors"
                                />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0f172a] ${u.role === 'admin' ? 'bg-purple-500' : 'bg-cyan-500'}`}></div>
                            </div>
                            <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{u.name}</span>
                          </div>
                        </td>
                        <td className="p-5 text-slate-400 font-mono text-sm">{u.email}</td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${roleColors[u.role] || "bg-slate-700 text-slate-300"}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openModal(u)}
                              className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
                              title="Edit"
                            >
                              <FaUserEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(u._id)}
                              className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // GRID VIEW
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map((u) => (
                <div key={u._id} className="group bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <img
                      src={getUserImage(u)}
                      alt="avatar"
                      className="relative w-24 h-24 rounded-full border-2 border-white/10 object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className={`absolute bottom-1 right-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-white border shadow-sm ${roleColors[u.role]}`}>
                        {u.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">{u.name}</h3>
                  <p className="text-slate-400 text-sm mb-6 break-all">{u.email}</p>

                  <div className="flex gap-3 w-full mt-auto">
                    <button onClick={() => openModal(u)} className="flex-1 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold">
                      <FaUserEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(u._id)} className="flex-1 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
                {/* Backdrop */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
              
              {/* Modal Content */}
              <div className="relative bg-[#0f172a] border border-white/20 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md transform transition-all scale-100 animate-fadeIn">
                <button 
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors" 
                    onClick={closeModal}
                >
                    <FaTimes size={20} />
                </button>

                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaUserEdit className="text-cyan-400" /> Edit User
                </h3>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50" 
                        required 
                      />
                  </div>

                  <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50" 
                        required 
                      />
                  </div>

                  <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role Permission</label>
                      <select 
                        value={formData.role} 
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 cursor-pointer"
                      >
                        <option value="customer" className="bg-slate-900">Customer</option>
                        <option value="admin" className="bg-slate-900">Admin</option>
                      </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <FaSave /> Update User
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}