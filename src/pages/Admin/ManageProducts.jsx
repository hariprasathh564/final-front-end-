// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";

// export default function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: "", price: 0, description: "", category: "Milk", images: [] });
//   const [editing, setEditing] = useState(null);

//   const load = async () => {
//     const res = await API.get("/products");
//     setProducts(res.data);
//   };

//   useEffect(() => { load(); }, []);

//   const create = async () => {
//     try {
//       await API.post("/products", form);
//       setForm({ name: "", price: 0, description: "", category: "Milk", images: [] });
//       load();
//     } catch (err) {
//       alert(err.response?.data?.message || "Create failed");
//     }
//   };

//   const del = async (id) => {
//     if (!confirm("Delete product?")) return;
//     await API.delete(`/products/${id}`);
//     load();
//   };

//   const startEdit = (p) => {
//     setEditing(p);
//     setForm({ name: p.name, price: p.price, description: p.description, category: p.category, images: p.images || [] });
//   };

//   const update = async () => {
//     await API.put(`/products/${editing._id}`, form);
//     setEditing(null);
//     load();
//   };

//   // --- STYLE SHORTHANDS ---
//   const inputClass =
//     "w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all";

//   const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

//   return (
//     <AdminLayout>
//       <div className="max-w-6xl mx-auto p-6">

//         {/* Top Section */}
//         <div className="flex justify-between items-center mb-10">
//           <div>
//             <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Manage Products</h2>
//             <p className="text-gray-500 mt-1">Create, update and manage store products with ease.</p>
//           </div>

//           <span className="px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold shadow-sm border border-sky-200">
//             {products.length} Products
//           </span>
//         </div>

//         {/* FORM CARD */}
//         <div className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl shadow-gray-200/50 rounded-3xl p-8 mb-12">
//           <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
//             {editing ? "Update Product" : "Create New Product"}
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             <div>
//               <label className={labelClass}>Product Name</label>
//               <input
//                 value={form.name}
//                 placeholder="Ex: Fresh Organic Milk"
//                 onChange={e => setForm({ ...form, name: e.target.value })}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Price (Rs)</label>
//               <input
//                 type="number"
//                 value={form.price}
//                 placeholder="0.00"
//                 onChange={e => setForm({ ...form, price: Number(e.target.value) })}
//                 className={inputClass}
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className={labelClass}>Images (comma separated)</label>
//               <input
//                 value={(form.images || []).join(",")}
//                 placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
//                 onChange={e =>
//                   setForm({ ...form, images: e.target.value.split(",").map(s => s.trim()) })
//                 }
//                 className={inputClass}
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className={labelClass}>Description</label>
//               <textarea
//                 rows="3"
//                 value={form.description}
//                 placeholder="Detailed product description..."
//                 onChange={e => setForm({ ...form, description: e.target.value })}
//                 className={inputClass}
//               />
//             </div>

//           </div>

//           {/* Buttons */}
//           <div className="mt-8 flex justify-end gap-4">
//             {editing && (
//               <button
//                 onClick={() => {
//                   setEditing(null);
//                   setForm({ name: "", price: 0, description: "", category: "Milk", images: [] });
//                 }}
//                 className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow-sm transition"
//               >
//                 Cancel
//               </button>
//             )}

//             {editing ? (
//               <button
//                 onClick={update}
//                 className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-300/40 transition"
//               >
//                 Update Product
//               </button>
//             ) : (
//               <button
//                 onClick={create}
//                 className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-lg shadow-sky-300/40 transition"
//               >
//                 Create Product
//               </button>
//             )}
//           </div>
//         </div>

//         {/* PRODUCT LIST */}
//         <div className="space-y-4">
//           {products.length === 0 && (
//             <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-400">
//               No products found. Create one above.
//             </div>
//           )}

//           {products.map(p => (
//             <div
//               key={p._id}
//               className="group bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
//             >
//               {/* LEFT */}
//               <div className="flex items-start gap-5">
//                 <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
//                   {p.images?.[0] ? (
//                     <img
//                       src={p.images[0]}
//                       className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                   ) : (
//                     <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <h4 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition">
//                     {p.name}
//                   </h4>
//                   <p className="text-emerald-600 font-semibold mt-1">₹ {p.price.toLocaleString()}</p>
//                   <p className="text-gray-500 text-sm mt-1 line-clamp-1 max-w-lg">{p.description}</p>
//                 </div>
//               </div>

//               {/* RIGHT BUTTONS */}
//               <div className="flex gap-3 self-end sm:self-center">
//                 <button
//                   onClick={() => startEdit(p)}
//                   className="px-4 py-2 text-sm font-medium rounded-xl bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => del(p._id)}
//                   className="px-4 py-2 text-sm font-medium rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition"
//                 >
//                   Delete
//                 </button>
//               </div>

//             </div>
//           ))}
//         </div>

//       </div>
//     </AdminLayout>
//   );
// }





// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";
// import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave, FaBoxOpen } from "react-icons/fa"; // Added icons for visual flare

// export default function ManageProducts() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: "", price: 0, description: "", category: "Milk", images: [] });
//   const [editing, setEditing] = useState(null);

//   const load = async () => {
//     const res = await API.get("/products");
//     setProducts(res.data);
//   };

//   useEffect(() => { load(); }, []);

//   const create = async () => {
//     try {
//       await API.post("/products", form);
//       setForm({ name: "", price: 0, description: "", category: "Milk", images: [] });
//       load();
//     } catch (err) {
//       alert(err.response?.data?.message || "Create failed");
//     }
//   };

//   const del = async (id) => {
//     if (!confirm("Delete product?")) return;
//     await API.delete(`/products/${id}`);
//     load();
//   };

//   const startEdit = (p) => {
//     setEditing(p);
//     setForm({ name: p.name, price: p.price, description: p.description, category: p.category, images: p.images || [] });
//   };

//   const update = async () => {
//     await API.put(`/products/${editing._id}`, form);
//     setEditing(null);
//     load();
//   };

//   // --- PREMIUM STYLE SHORTHANDS ---
//   const inputClass =
//     "w-full px-4 py-3 border border-white/10 rounded-xl bg-[#020617]/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner";

//   const labelClass = "block text-xs font-bold uppercase tracking-wider text-cyan-300/80 mb-2";

//   return (
//     <AdminLayout>
//       {/* Page Background Wrapper */}
//                     <div className="fixed bg-no-repeat bg-center bg-cover h-screen inset-0 opacity-[1.07] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://img.freepik.com/premium-vector/abstract-blue-moving-line-design-black-background_392592-1737.jpg")` }}></div>

//       <div className="min-h-screen bg-[#0a0f1c] p-6 md:p-10 text-white relative overflow-hidden">
        
//         {/* Ambient Glows */}
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

//         {/* Max Width Container */}
//         <div className="max-w-6xl mx-auto relative z-10">

//           {/* Top Section */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-6 gap-4">
//             <div>
//               <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
//                 MANAGE PRODUCTS
//               </h2>
//               <p className="text-slate-400 mt-1 text-sm">Create, update and manage your inventory.</p>
//             </div>

//             <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center gap-2">
//               <FaBoxOpen />
//               {products.length} Items
//             </div>
//           </div>

//           {/* FORM CARD */}
//           <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 mb-12 relative overflow-hidden group">
//             {/* Card decoration line */}
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50"></div>

//             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//               {editing ? (
//                 <span className="text-amber-400 flex items-center gap-2"><FaEdit /> Update Product</span>
//               ) : (
//                 <span className="text-cyan-400 flex items-center gap-2"><FaPlus /> Create New Product</span>
//               )}
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               <div>
//                 <label className={labelClass}>Product Name</label>
//                 <input
//                   value={form.name}
//                   placeholder="Ex: Neon Fizzy Milk"
//                   onChange={e => setForm({ ...form, name: e.target.value })}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Price (Rs)</label>
//                 <input
//                   type="number"
//                   value={form.price}
//                   placeholder="0.00"
//                   onChange={e => setForm({ ...form, price: Number(e.target.value) })}
//                   className={inputClass}
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className={labelClass}>Images (comma separated URLs)</label>
//                 <input
//                   value={(form.images || []).join(",")}
//                   placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
//                   onChange={e =>
//                     setForm({ ...form, images: e.target.value.split(",").map(s => s.trim()) })
//                   }
//                   className={inputClass}
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className={labelClass}>Description</label>
//                 <textarea
//                   rows="3"
//                   value={form.description}
//                   placeholder="Describe the flavor profile..."
//                   onChange={e => setForm({ ...form, description: e.target.value })}
//                   className={inputClass}
//                 />
//               </div>

//             </div>

//             {/* Buttons */}
//             <div className="mt-8 flex justify-end gap-4">
//               {editing && (
//                 <button
//                   onClick={() => {
//                     setEditing(null);
//                     setForm({ name: "", price: 0, description: "", category: "Milk", images: [] });
//                   }}
//                   className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold border border-white/10 transition flex items-center gap-2"
//                 >
//                   <FaTimes /> Cancel
//                 </button>
//               )}

//               {editing ? (
//                 <button
//                   onClick={update}
//                   className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold shadow-lg shadow-amber-900/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
//                 >
//                   <FaSave /> Update Product
//                 </button>
//               ) : (
//                 <button
//                   onClick={create}
//                   className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
//                 >
//                   <FaPlus /> Create Product
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* PRODUCT LIST */}
//           <div className="space-y-4">
//             {products.length === 0 && (
//               <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-slate-400">
//                 <FaBoxOpen className="mx-auto text-4xl mb-4 opacity-30" />
//                 No products found. Create one above.
//               </div>
//             )}

//             {products.map(p => (
//               <div
//                 key={p._id}
//                 className="group bg-[#0f172a]/40 border border-white/5 p-5 rounded-2xl hover:bg-[#0f172a]/80 hover:border-cyan-500/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg"
//               >
//                 {/* LEFT */}
//                 <div className="flex items-start gap-5">
//                   <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-black/20 relative group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
//                     {p.images?.[0] ? (
//                       <img
//                         src={p.images[0]}
//                         alt={p.name}
//                         className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
//                       />
//                     ) : (
//                       <div className="h-full w-full flex items-center justify-center text-slate-600 text-xs flex-col gap-1">
//                         <FaBoxOpen size={20}/> No Img
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
//                       {p.name}
//                     </h4>
//                     <p className="text-cyan-400 font-mono font-bold mt-1 text-lg">₹ {p.price.toLocaleString()}</p>
//                     <p className="text-slate-400 text-sm mt-2 line-clamp-1 max-w-lg leading-relaxed">{p.description}</p>
//                   </div>
//                 </div>

//                 {/* RIGHT BUTTONS */}
//                 <div className="flex gap-3 self-end sm:self-center">
//                   <button
//                     onClick={() => startEdit(p)}
//                     className="px-4 py-2.5 text-sm font-bold rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/50 transition flex items-center gap-2"
//                   >
//                     <FaEdit /> Edit
//                   </button>

//                   <button
//                     onClick={() => del(p._id)}
//                     className="px-4 py-2.5 text-sm font-bold rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/50 transition flex items-center gap-2"
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </div>

//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </AdminLayout>
//   );
// }








import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import AdminLayout from "./AdminLayout";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave, FaBoxOpen } from "react-icons/fa";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: 0, description: "", category: "Milk", images: [] });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      await API.post("/products", form);
      setForm({ name: "", price: 0, description: "", category: "Milk", images: [] });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const del = async (id) => {
    if (!confirm("Delete product?")) return;
    await API.delete(`/products/${id}`);
    load();
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price, description: p.description, category: p.category, images: p.images || [] });
  };

  const update = async () => {
    await API.put(`/products/${editing._id}`, form);
    setEditing(null);
    load();
  };

  // --- PREMIUM STYLE SHORTHANDS ---
  const inputClass =
    "w-full px-4 py-3 border border-white/10 rounded-xl bg-[#020617]/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner";

  const labelClass = "block text-xs font-bold uppercase tracking-wider text-cyan-300/80 mb-2";

  return (
    <AdminLayout>
      {/* 
          MAIN WRAPPER 
          - min-h-screen: ensures it covers at least the viewport.
          - bg-[#0a0f1c]: sets the base color.
          - isolate: creates stacking context
      */}
      <div className="min-h-screen w-full bg-[#0a0f1c] relative font-sans text-white isolate">
        
        {/* --- FIXED BACKGROUND LAYERS (Consistent with Dashboard) --- */}
        <div className="fixed inset-0 bg-[#0a0f1c] -z-20"></div>
        
        {/* 1. Tech Grid Pattern */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
        
        {/* 2. Spotlight Gradient at Top */}
        <div className="fixed top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(6,182,212,0.15),transparent)] pointer-events-none -z-10"></div>

        {/* 3. Ambient Glows */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        {/* --- CONTENT CONTAINER --- */}
        <div className="relative z-10 p-6 md:p-10 max-w-6xl mx-auto">

          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-6 gap-4">
            <div>
              <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                MANAGE PRODUCTS
              </h2>
              <p className="text-slate-400 mt-1 text-sm">Create, update and manage your inventory.</p>
            </div>

            <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center gap-2 backdrop-blur-sm">
              <FaBoxOpen />
              {products.length} Items
            </div>
          </div>

          {/* FORM CARD */}
          <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 mb-12 relative overflow-hidden group">
            {/* Card decoration line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50"></div>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              {editing ? (
                <span className="text-amber-400 flex items-center gap-2"><FaEdit /> Update Product</span>
              ) : (
                <span className="text-cyan-400 flex items-center gap-2"><FaPlus /> Create New Product</span>
              )}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className={labelClass}>Product Name</label>
                <input
                  value={form.name}
                  placeholder="Ex: Neon Fizzy Milk"
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Price (Rs)</label>
                <input
                  type="number"
                  value={form.price}
                  placeholder="0.00"
                  onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Images (comma separated URLs)</label>
                <input
                  value={(form.images || []).join(",")}
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  onChange={e =>
                    setForm({ ...form, images: e.target.value.split(",").map(s => s.trim()) })
                  }
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  rows="3"
                  value={form.description}
                  placeholder="Describe the flavor profile..."
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className={inputClass}
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              {editing && (
                <button
                  onClick={() => {
                    setEditing(null);
                    setForm({ name: "", price: 0, description: "", category: "Milk", images: [] });
                  }}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold border border-white/10 transition flex items-center gap-2"
                >
                  <FaTimes /> Cancel
                </button>
              )}

              {editing ? (
                <button
                  onClick={update}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold shadow-lg shadow-amber-900/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <FaSave /> Update Product
                </button>
              ) : (
                <button
                  onClick={create}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <FaPlus /> Create Product
                </button>
              )}
            </div>
          </div>

          {/* PRODUCT LIST */}
          <div className="space-y-4 pb-20">
            {products.length === 0 && (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-slate-400">
                <FaBoxOpen className="mx-auto text-4xl mb-4 opacity-30" />
                No products found. Create one above.
              </div>
            )}

            {products.map(p => (
              <div
                key={p._id}
                className="group bg-[#0f172a]/40 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:bg-[#0f172a]/80 hover:border-cyan-500/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg"
              >
                {/* LEFT */}
                <div className="flex items-start gap-5">
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-black/20 relative group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-600 text-xs flex-col gap-1">
                        <FaBoxOpen size={20}/> No Img
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                      {p.name}
                    </h4>
                    <p className="text-cyan-400 font-mono font-bold mt-1 text-lg">LKR {p.price.toLocaleString()}</p>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-1 max-w-lg leading-relaxed">{p.description}</p>
                  </div>
                </div>

                {/* RIGHT BUTTONS */}
                <div className="flex gap-3 self-end sm:self-center">
                  <button
                    onClick={() => startEdit(p)}
                    className="px-4 py-2.5 text-sm font-bold rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/50 transition flex items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => del(p._id)}
                    className="px-4 py-2.5 text-sm font-bold rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/50 transition flex items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}