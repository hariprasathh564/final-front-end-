
// // frontend/src/pages/Admin/AdminAds.jsx
// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";

// export default function AdminAds() {
//   // Ads
//   const [ads, setAds] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     buttonText: "",
//     buttonLink: "",
//     link: "",
//     image: ""
//   });
//   const [editingId, setEditingId] = useState(null);

//   // Load ads
//   const loadAds = async () => {
//     try {
//       const res = await API.get("/ads");
//       setAds(res.data);
//     } catch (err) {
//       console.error("Failed to load ads", err);
//     }
//   };

//   useEffect(() => {
//     loadAds();
//   }, []);

//   // Upload image
//   const uploadImage = async () => {
//     if (!selectedFile) return alert("Select a file first");
//     const data = new FormData();
//     data.append("image", selectedFile);
//     try {
//       const res = await API.post("/ads/upload", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//           console.log("UPLOAD RESPONSE:", res.data);

//       setFormData({ ...formData, image: res.data.image });
//       alert("Image uploaded successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   // Create or update ad
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) return alert("Upload an image first");

//     try {
//       if (editingId) {
//         await API.put(`/ads/${editingId}`, formData);
//         setEditingId(null);
//       } else {
//         await API.post("/ads", formData);
//       }
//       setFormData({ title: "", subtitle: "", buttonText: "", buttonLink: "", link: "", image: "" });
//       setSelectedFile(null);
//       loadAds();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save ad");
//     }
//   };

//   // Delete ad
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this ad?")) return;
//     try {
//       await API.delete(`/ads/${id}`);
//       loadAds();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete ad");
//     }
//   };

//   // Edit ad
//   const handleEdit = (ad) => {
//     setEditingId(ad._id);
//     setFormData({
//       title: ad.title || "",
//       subtitle: ad.subtitle || "",
//       buttonText: ad.buttonText || "",
//       buttonLink: ad.buttonLink || "",
//       link: ad.link || "",
//       image: ad.image || ""
//     });
//   };

//   return (
//     <AdminLayout>
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 mr-0">Manage Homepage Ads</h2>

//       {/* Form */}
//       <form className="mb-6 space-y-2" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Subtitle"
//           value={formData.subtitle}
//           onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Button Text"
//           value={formData.buttonText}
//           onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Button Link"
//           value={formData.buttonLink}
//           onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Ad Link"
//           value={formData.link}
//           onChange={(e) => setFormData({ ...formData, link: e.target.value })}
//           className="border p-2 w-full rounded"
//         />

//         {/* Image Upload */}
//         <div className="flex items-center gap-2">
//           <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
//           <button type="button" onClick={uploadImage} className="px-4 py-2 bg-blue-500 text-white rounded">
//             Upload Image
//           </button>
//         </div>

//         {formData.image && (
//           <img src={formData.image} alt="Preview" className="w-64 h-32 object-cover mt-2 rounded" />
//         )}

//         <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded mt-2">
//           {editingId ? "Update Ad" : "Create Ad"}
//         </button>
//       </form>

//       {/* Ads List */}
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//         {ads.map((ad) => (
//           <div key={ad._id} className="border p-2 rounded shadow">
//             <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover rounded mb-2" />
//             <h4 className="font-bold">{ad.title}</h4>
//             <p className="text-sm">{ad.subtitle}</p>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => handleEdit(ad)} className="px-2 py-1 bg-yellow-400 rounded text-white">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(ad._id)} className="px-2 py-1 bg-red-500 rounded text-white">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </AdminLayout>
//   );
// }







// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";
// import { 
//   FaAd, 
//   FaCloudUploadAlt, 
//   FaEdit, 
//   FaTrash, 
//   FaHeading, 
//   FaParagraph, 
//   FaLink, 
//   FaMousePointer, 
//   FaSave, 
//   FaMagic, 
//   FaImage 
// } from "react-icons/fa";

// export default function AdminAds() {
//   // ==========================================
//   // 1. EXACT ORIGINAL LOGIC
//   // ==========================================
//   const [ads, setAds] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     buttonText: "",
//     buttonLink: "",
//     link: "",
//     image: ""
//   });
//   const [editingId, setEditingId] = useState(null);

//   // Load ads
//   const loadAds = async () => {
//     try {
//       const res = await API.get("/ads");
//       setAds(res.data);
//     } catch (err) {
//       console.error("Failed to load ads", err);
//     }
//   };

//   useEffect(() => {
//     loadAds();
//   }, []);

//   // Upload image
//   const uploadImage = async () => {
//     if (!selectedFile) return alert("Select a file first");
//     const data = new FormData();
//     data.append("image", selectedFile);
//     try {
//       const res = await API.post("/ads/upload", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       console.log("UPLOAD RESPONSE:", res.data);

//       setFormData({ ...formData, image: res.data.image });
//       alert("Image uploaded successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   // Create or update ad
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) return alert("Upload an image first");

//     try {
//       if (editingId) {
//         await API.put(`/ads/${editingId}`, formData);
//         setEditingId(null);
//       } else {
//         await API.post("/ads", formData);
//       }
//       setFormData({ title: "", subtitle: "", buttonText: "", buttonLink: "", link: "", image: "" });
//       setSelectedFile(null);
//       setEditingId(null); // Reset editing state
//       loadAds();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save ad");
//     }
//   };

//   // Delete ad
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this ad?")) return;
//     try {
//       await API.delete(`/ads/${id}`);
//       loadAds();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete ad");
//     }
//   };

//   // Edit ad
//   const handleEdit = (ad) => {
//     setEditingId(ad._id);
//     setFormData({
//       title: ad.title || "",
//       subtitle: ad.subtitle || "",
//       buttonText: ad.buttonText || "",
//       buttonLink: ad.buttonLink || "",
//       link: ad.link || "",
//       image: ad.image || ""
//     });
//     // Scroll to top to see form
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // --- STYLE SHORTHANDS ---
//   const inputGroupClass = "relative group";
//   const iconClass = "absolute top-3.5 left-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors z-10";
//   const inputClass = "w-full pl-10 pr-4 py-3 bg-[#020617]/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner";

//   // ==========================================
//   // 2. PREMIUM RENDER
//   // ==========================================
//   return (
//     <AdminLayout>
//                     <div className="fixed bg-no-repeat bg-center bg-cover h-screen inset-0 opacity-[1.07] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://img.freepik.com/premium-vector/abstract-blue-moving-line-design-black-background_392592-1737.jpg")` }}></div>

//       <div className="min-h-screen bg-[#0a0f1c] p-6 md:p-10 text-white relative overflow-hidden">
        
//         {/* Background Glows */}
//         <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>

//         <div className="max-w-7xl mx-auto relative z-10">
          
//           {/* Header */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6 gap-4">
//             <div>
//               <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
//                 MANAGE ADS
//               </h2>
//               <p className="text-slate-400 mt-1 text-sm">Control homepage banners and promotional content.</p>
//             </div>
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-bold shadow-sm">
//                <FaAd /> {ads.length} Active Campaigns
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
//             {/* --- FORM SECTION (Left Column) --- */}
//             <div className="lg:col-span-1">
//               <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-6">
//                 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                   {editingId ? <FaEdit className="text-amber-400" /> : <FaMagic className="text-cyan-400" />}
//                   {editingId ? "Update Campaign" : "Create New Ad"}
//                 </h3>

//                 <form className="space-y-4" onSubmit={handleSubmit}>
                  
//                   <div className={inputGroupClass}>
//                     <FaHeading className={iconClass} />
//                     <input
//                       type="text"
//                       placeholder="Headline Title"
//                       value={formData.title}
//                       onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                       className={inputClass}
//                     />
//                   </div>

//                   <div className={inputGroupClass}>
//                     <FaParagraph className={iconClass} />
//                     <input
//                       type="text"
//                       placeholder="Subtitle / Description"
//                       value={formData.subtitle}
//                       onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
//                       className={inputClass}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className={inputGroupClass}>
//                       <FaMousePointer className={iconClass} />
//                       <input
//                         type="text"
//                         placeholder="Btn Text"
//                         value={formData.buttonText}
//                         onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
//                         className={inputClass}
//                       />
//                     </div>
//                     <div className={inputGroupClass}>
//                       <FaLink className={iconClass} />
//                       <input
//                         type="text"
//                         placeholder="Btn URL"
//                         value={formData.buttonLink}
//                         onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
//                         className={inputClass}
//                       />
//                     </div>
//                   </div>

//                   <div className={inputGroupClass}>
//                     <FaLink className={iconClass} />
//                     <input
//                       type="text"
//                       placeholder="Main Ad Link (Optional)"
//                       value={formData.link}
//                       onChange={(e) => setFormData({ ...formData, link: e.target.value })}
//                       className={inputClass}
//                     />
//                   </div>

//                   {/* Image Upload Area */}
//                   <div className="p-4 rounded-xl bg-[#020617]/30 border border-dashed border-white/20">
//                     <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Banner Image</label>
                    
//                     <div className="flex flex-col gap-3">
//                         <input 
//                             type="file" 
//                             onChange={(e) => setSelectedFile(e.target.files[0])}
//                             className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-cyan-300 hover:file:bg-white/20" 
//                         />
                        
//                         <button 
//                             type="button" 
//                             onClick={uploadImage} 
//                             className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition flex items-center justify-center gap-2"
//                         >
//                             <FaCloudUploadAlt /> Upload to Server
//                         </button>
//                     </div>

//                     {formData.image && (
//                         <div className="mt-3 relative rounded-lg overflow-hidden border border-white/10 group">
//                             <img src={formData.image} alt="Preview" className="w-full h-32 object-cover" />
//                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <span className="text-xs text-white font-bold flex items-center gap-1"><FaImage /> Current</span>
//                             </div>
//                         </div>
//                     )}
//                   </div>

//                   <button 
//                     type="submit" 
//                     className={`w-full py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
//                         editingId 
//                         ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-900/20" 
//                         : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/20"
//                     }`}
//                   >
//                     <FaSave /> {editingId ? "Update Campaign" : "Launch Campaign"}
//                   </button>
                  
//                   {editingId && (
//                       <button
//                         type="button"
//                         onClick={() => { setEditingId(null); setFormData({ title: "", subtitle: "", buttonText: "", buttonLink: "", link: "", image: "" }); setSelectedFile(null); }}
//                         className="w-full py-2 text-xs text-slate-400 hover:text-white transition"
//                       >
//                           Cancel Editing
//                       </button>
//                   )}
//                 </form>
//               </div>
//             </div>

//             {/* --- LIST SECTION (Right Columns) --- */}
//             <div className="lg:col-span-2">
//                 <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
//                     {ads.map((ad) => (
//                     <div key={ad._id} className="group bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                        
//                         {/* Image Area */}
//                         <div className="relative h-48 overflow-hidden">
//                             <img 
//                                 src={ad.image} 
//                                 alt={ad.title} 
//                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90"></div>
                            
//                             {/* Badge */}
//                             <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
//                                 Active
//                             </div>
//                         </div>

//                         {/* Content Area */}
//                         <div className="p-6 flex-1 flex flex-col">
//                             <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-300 transition-colors">
//                                 {ad.title}
//                             </h4>
//                             <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
//                                 {ad.subtitle}
//                             </p>

//                             {/* Meta / Buttons */}
//                             <div className="space-y-3">
//                                 {(ad.buttonText || ad.link) && (
//                                     <div className="flex flex-wrap gap-2">
//                                         {ad.buttonText && (
//                                             <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-cyan-200 font-mono">
//                                                 Btn: {ad.buttonText}
//                                             </span>
//                                         )}
//                                         {ad.link && (
//                                             <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-purple-200 font-mono truncate max-w-[150px]">
//                                                 Link: {ad.link}
//                                             </span>
//                                         )}
//                                     </div>
//                                 )}

//                                 <div className="flex gap-3 pt-4 border-t border-white/10 mt-auto">
//                                     <button 
//                                         onClick={() => handleEdit(ad)} 
//                                         className="flex-1 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold"
//                                     >
//                                         <FaEdit /> Edit
//                                     </button>
//                                     <button 
//                                         onClick={() => handleDelete(ad._id)} 
//                                         className="flex-1 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold"
//                                     >
//                                         <FaTrash />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     ))}
                    
//                     {ads.length === 0 && (
//                         <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 border border-dashed border-white/10 rounded-3xl bg-white/5">
//                             <FaAd className="text-4xl mb-4 opacity-30" />
//                             <p>No active ads found. Create one to get started.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }






import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import AdminLayout from "./AdminLayout";
import { 
  FaAd, 
  FaCloudUploadAlt, 
  FaEdit, 
  FaTrash, 
  FaHeading, 
  FaParagraph, 
  FaLink, 
  FaMousePointer, 
  FaSave, 
  FaMagic, 
  FaImage 
} from "react-icons/fa";

export default function AdminAds() {
  // ==========================================
  // 1. EXACT ORIGINAL LOGIC
  // ==========================================
  const [ads, setAds] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    link: "",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Load ads
  const loadAds = async () => {
    try {
      const res = await API.get("/ads");
      setAds(res.data);
    } catch (err) {
      console.error("Failed to load ads", err);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  // Upload image
  const uploadImage = async () => {
    if (!selectedFile) return alert("Select a file first");
    const data = new FormData();
    data.append("image", selectedFile);
    try {
      const res = await API.post("/ads/upload", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("UPLOAD RESPONSE:", res.data);

      setFormData({ ...formData, image: res.data.image });
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Create or update ad
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Upload an image first");

    try {
      if (editingId) {
        await API.put(`/ads/${editingId}`, formData);
        setEditingId(null);
      } else {
        await API.post("/ads", formData);
      }
      setFormData({ title: "", subtitle: "", buttonText: "", buttonLink: "", link: "", image: "" });
      setSelectedFile(null);
      setEditingId(null); // Reset editing state
      loadAds();
    } catch (err) {
      console.error(err);
      alert("Failed to save ad");
    }
  };

  // Delete ad
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ad?")) return;
    try {
      await API.delete(`/ads/${id}`);
      loadAds();
    } catch (err) {
      console.error(err);
      alert("Failed to delete ad");
    }
  };

  // Edit ad
  const handleEdit = (ad) => {
    setEditingId(ad._id);
    setFormData({
      title: ad.title || "",
      subtitle: ad.subtitle || "",
      buttonText: ad.buttonText || "",
      buttonLink: ad.buttonLink || "",
      link: ad.link || "",
      image: ad.image || ""
    });
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- STYLE SHORTHANDS ---
  const inputGroupClass = "relative group";
  const iconClass = "absolute top-3.5 left-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors z-10";
  const inputClass = "w-full pl-10 pr-4 py-3 bg-[#020617]/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner";

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
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>


        {/* --- CONTENT CONTAINER --- */}
        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6 gap-4">
            <div>
              <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                MANAGE ADS
              </h2>
              <p className="text-slate-400 mt-1 text-sm">Control homepage banners and promotional content.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-bold shadow-sm backdrop-blur-sm">
               <FaAd /> {ads.length} Active Campaigns
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- FORM SECTION (Left Column) --- */}
            <div className="lg:col-span-1">
              <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  {editingId ? <FaEdit className="text-amber-400" /> : <FaMagic className="text-cyan-400" />}
                  {editingId ? "Update Campaign" : "Create New Ad"}
                </h3>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  
                  <div className={inputGroupClass}>
                    <FaHeading className={iconClass} />
                    <input
                      type="text"
                      placeholder="Headline Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className={inputGroupClass}>
                    <FaParagraph className={iconClass} />
                    <input
                      type="text"
                      placeholder="Subtitle / Description"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={inputGroupClass}>
                      <FaMousePointer className={iconClass} />
                      <input
                        type="text"
                        placeholder="Btn Text"
                        value={formData.buttonText}
                        onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className={inputGroupClass}>
                      <FaLink className={iconClass} />
                      <input
                        type="text"
                        placeholder="Btn URL"
                        value={formData.buttonLink}
                        onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className={inputGroupClass}>
                    <FaLink className={iconClass} />
                    <input
                      type="text"
                      placeholder="Main Ad Link (Optional)"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Image Upload Area */}
                  <div className="p-4 rounded-xl bg-[#020617]/30 border border-dashed border-white/20">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Banner Image</label>
                    
                    <div className="flex flex-col gap-3">
                        <input 
                            type="file" 
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-cyan-300 hover:file:bg-white/20" 
                        />
                        
                        <button 
                            type="button" 
                            onClick={uploadImage} 
                            className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition flex items-center justify-center gap-2"
                        >
                            <FaCloudUploadAlt /> Upload to Server
                        </button>
                    </div>

                    {formData.image && (
                        <div className="mt-3 relative rounded-lg overflow-hidden border border-white/10 group">
                            <img src={formData.image} alt="Preview" className="w-full h-32 object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-white font-bold flex items-center gap-1"><FaImage /> Current</span>
                            </div>
                        </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className={`w-full py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                        editingId 
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-900/20" 
                        : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/20"
                    }`}
                  >
                    <FaSave /> {editingId ? "Update Campaign" : "Launch Campaign"}
                  </button>
                  
                  {editingId && (
                      <button
                        type="button"
                        onClick={() => { setEditingId(null); setFormData({ title: "", subtitle: "", buttonText: "", buttonLink: "", link: "", image: "" }); setSelectedFile(null); }}
                        className="w-full py-2 text-xs text-slate-400 hover:text-white transition"
                      >
                          Cancel Editing
                      </button>
                  )}
                </form>
              </div>
            </div>

            {/* --- LIST SECTION (Right Columns) --- */}
            <div className="lg:col-span-2 pb-20">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                    {ads.map((ad) => (
                    <div key={ad._id} className="group bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                        
                        {/* Image Area */}
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={ad.image} 
                                alt={ad.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90"></div>
                            
                            {/* Badge */}
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                                Active
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-300 transition-colors">
                                {ad.title}
                            </h4>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                                {ad.subtitle}
                            </p>

                            {/* Meta / Buttons */}
                            <div className="space-y-3">
                                {(ad.buttonText || ad.link) && (
                                    <div className="flex flex-wrap gap-2">
                                        {ad.buttonText && (
                                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-cyan-200 font-mono">
                                                Btn: {ad.buttonText}
                                            </span>
                                        )}
                                        {ad.link && (
                                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-purple-200 font-mono truncate max-w-[150px]">
                                                Link: {ad.link}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4 border-t border-white/10 mt-auto">
                                    <button 
                                        onClick={() => handleEdit(ad)} 
                                        className="flex-1 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(ad._id)} 
                                        className="flex-1 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                    
                    {ads.length === 0 && (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 border border-dashed border-white/10 rounded-3xl bg-white/5">
                            <FaAd className="text-4xl mb-4 opacity-30" />
                            <p>No active ads found. Create one to get started.</p>
                        </div>
                    )}
                </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}