

// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AdminChats() {
//   const [chats, setChats] = useState([]);

//   // Load all chats
//   const load = async () => {
//     try {
//       const res = await API.get("/chats/admin/all");
//       setChats(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Delete a chat
//   const handleDelete = async (chatId) => {
//     if (!window.confirm("Are you sure you want to delete this chat?")) return;

//     try {
//       await API.delete(`/chats/admin/${chatId}`);
//       setChats(chats.filter((c) => c._id !== chatId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete chat.");
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="">
//         <h1 className="text-3xl font-extrabold mb-6 text-blue-600 drop-shadow-lg">
//           All User Chats
//         </h1>

//         {chats.length === 0 && (
//           <p className="text-gray-500 text-center py-10 text-lg">
//             No chats available.
//           </p>
//         )}

//         <AnimatePresence>
//           {chats.map((c) => (
//             <motion.div
//               key={c._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.3 }}
//               className="mb-5 p-4 bg-white rounded-2xl shadow-lg relative hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
//             >
//               <p className="text-sm text-gray-500 mb-2">
//                 <strong>User:</strong> {c.user_id?.name} ({c.user_id?.email})
//               </p>

//               {/* Chat Bubbles */}
//               <div className="flex flex-col gap-2">
//                 {/* User Message (left) */}
//                 <div className="self-start bg-blue-100 text-blue-900 p-3 rounded-xl max-w-[70%] shadow-sm">
//                   <strong>User:</strong> {c.message}
//                 </div>

//                 {/* Bot Reply (right) */}
//                 <div className="self-end bg-gray-100 text-gray-800 p-3 rounded-xl max-w-[70%] shadow-sm">
//                   <strong>Bot:</strong> {c.response}
//                 </div>
//               </div>

//               <div className="text-xs text-gray-400 mt-2">
//                 {new Date(c.createdAt).toLocaleString()}
//               </div>

//               {/* Delete Button */}
//               <button
//                 onClick={() => handleDelete(c._id)}
//                 className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-bold"
//                 title="Delete Chat"
//               >
//                 ✕
//               </button>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </AdminLayout>
//   );
// }







// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import AdminLayout from "./AdminLayout";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaRobot, FaUser, FaTrash, FaCommentDots, FaClock } from "react-icons/fa";

// export default function AdminChats() {
//   // ==========================================
//   // 1. EXACT ORIGINAL LOGIC
//   // ==========================================
//   const [chats, setChats] = useState([]);

//   // Load all chats
//   const load = async () => {
//     try {
//       const res = await API.get("/chats/admin/all");
//       setChats(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Delete a chat
//   const handleDelete = async (chatId) => {
//     if (!window.confirm("Are you sure you want to delete this chat?")) return;

//     try {
//       await API.delete(`/chats/admin/${chatId}`);
//       setChats(chats.filter((c) => c._id !== chatId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete chat.");
//     }
//   };

//   // ==========================================
//   // 2. PREMIUM RENDER
//   // ==========================================
//   return (
//     <AdminLayout>
//                     <div className="fixed bg-no-repeat bg-center bg-cover h-screen inset-0 opacity-[1.07] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://img.freepik.com/premium-vector/abstract-blue-moving-line-design-black-background_392592-1737.jpg")` }}></div>

//       <div className="min-h-screen bg-[#0a0f1c] p-6 md:p-10 text-white relative overflow-hidden">
        
//         {/* Background Glows */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

//         <div className="max-w-5xl mx-auto relative z-10">
            
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-6 gap-4">
//             <div>
//                 <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
//                 USER CHAT HISTORY
//                 </h1>
//                 <p className="text-slate-400 mt-1 text-sm">Monitor AI interactions and user queries.</p>
//             </div>
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-bold shadow-sm">
//                 <FaCommentDots /> {chats.length} Interactions
//             </div>
//           </div>

//           {/* Empty State */}
//           {chats.length === 0 && (
//              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
//                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
//                     <FaCommentDots className="text-4xl text-slate-600" />
//                 </div>
//                 <p className="text-slate-400 text-lg font-medium">
//                     No chat history available.
//                 </p>
//             </div>
//           )}

//           {/* Chat Grid */}
//           <AnimatePresence>
//             <div className="grid grid-cols-1 gap-6">
//                 {chats.map((c) => (
//                 <motion.div
//                     key={c._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 0.3 }}
//                     className="group relative p-6 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl hover:border-cyan-500/30 transition-all duration-300"
//                 >
//                     {/* Top Row: User Info & Delete */}
//                     <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
//                         <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
//                                 <FaUser className="text-white text-sm" />
//                             </div>
//                             <div>
//                                 <p className="text-white font-bold text-sm">
//                                     {c.user_id?.name || "Unknown User"}
//                                 </p>
//                                 <p className="text-slate-500 text-xs font-mono">
//                                     {c.user_id?.email}
//                                 </p>
//                             </div>
//                         </div>

//                         <button
//                             onClick={() => handleDelete(c._id)}
//                             className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all border border-transparent hover:border-rose-500/30"
//                             title="Delete Chat"
//                         >
//                             <FaTrash size={14} />
//                         </button>
//                     </div>

//                     {/* Chat Bubbles */}
//                     <div className="flex flex-col gap-4">
//                         {/* User Message (Left) */}
//                         <div className="flex items-end gap-3 self-start max-w-[85%] md:max-w-[70%]">
//                             <div className="w-6 h-6 rounded-full bg-cyan-900/50 border border-cyan-500/30 flex items-center justify-center shrink-0 mb-1">
//                                 <FaUser className="text-[10px] text-cyan-400" />
//                             </div>
//                             <div className="bg-[#020617]/80 border border-cyan-500/20 text-cyan-100 p-4 rounded-2xl rounded-bl-none shadow-inner">
//                                 <p className="text-sm leading-relaxed">{c.message}</p>
//                             </div>
//                         </div>

//                         {/* Bot Reply (Right) */}
//                         <div className="flex items-end gap-3 self-end max-w-[85%] md:max-w-[70%] flex-row-reverse">
//                             <div className="w-6 h-6 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center shrink-0 mb-1">
//                                 <FaRobot className="text-[10px] text-purple-400" />
//                             </div>
//                             <div className="bg-white/5 border border-white/10 text-slate-300 p-4 rounded-2xl rounded-br-none shadow-lg">
//                                 <p className="text-sm leading-relaxed">{c.response}</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Footer: Timestamp */}
//                     <div className="mt-4 pt-4 border-t border-white/5 flex justify-end items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
//                         <FaClock />
//                         {new Date(c.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
//                     </div>

//                 </motion.div>
//                 ))}
//             </div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }






import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import AdminLayout from "./AdminLayout";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaUser, FaTrash, FaCommentDots, FaClock } from "react-icons/fa";

export default function AdminChats() {
  // ==========================================
  // 1. EXACT ORIGINAL LOGIC
  // ==========================================
  const [chats, setChats] = useState([]);

  // Load all chats
  const load = async () => {
    try {
      const res = await API.get("/chats/admin/all");
      setChats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Delete a chat
  const handleDelete = async (chatId) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;

    try {
      await API.delete(`/chats/admin/${chatId}`);
      setChats(chats.filter((c) => c._id !== chatId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete chat.");
    }
  };

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
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>


        {/* --- CONTENT CONTAINER --- */}
        <div className="relative z-10 p-6 md:p-10 max-w-5xl mx-auto">
            
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-6 gap-4">
            <div>
                <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                USER CHAT HISTORY
                </h1>
                <p className="text-slate-400 mt-1 text-sm">Monitor AI interactions and user queries.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-bold shadow-sm backdrop-blur-sm">
                <FaCommentDots /> {chats.length} Interactions
            </div>
          </div>

          {/* Empty State */}
          {chats.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <FaCommentDots className="text-4xl text-slate-600" />
                </div>
                <p className="text-slate-400 text-lg font-medium">
                    No chat history available.
                </p>
            </div>
          )}

          {/* Chat Grid */}
          <AnimatePresence>
            <div className="grid grid-cols-1 gap-6 pb-20">
                {chats.map((c) => (
                <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group relative p-6 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl hover:border-cyan-500/30 transition-all duration-300"
                >
                    {/* Top Row: User Info & Delete */}
                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <FaUser className="text-white text-sm" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">
                                    {c.user_id?.name || "Unknown User"}
                                </p>
                                <p className="text-slate-500 text-xs font-mono">
                                    {c.user_id?.email}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleDelete(c._id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all border border-transparent hover:border-rose-500/30"
                            title="Delete Chat"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>

                    {/* Chat Bubbles */}
                    <div className="flex flex-col gap-4">
                        {/* User Message (Left) */}
                        <div className="flex items-end gap-3 self-start max-w-[85%] md:max-w-[70%]">
                            <div className="w-6 h-6 rounded-full bg-cyan-900/50 border border-cyan-500/30 flex items-center justify-center shrink-0 mb-1">
                                <FaUser className="text-[10px] text-cyan-400" />
                            </div>
                            <div className="bg-[#020617]/80 border border-cyan-500/20 text-cyan-100 p-4 rounded-2xl rounded-bl-none shadow-inner">
                                <p className="text-sm leading-relaxed">{c.message}</p>
                            </div>
                        </div>

                        {/* Bot Reply (Right) */}
                        <div className="flex items-end gap-3 self-end max-w-[85%] md:max-w-[70%] flex-row-reverse">
                            <div className="w-6 h-6 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center shrink-0 mb-1">
                                <FaRobot className="text-[10px] text-purple-400" />
                            </div>
                            <div className="bg-white/5 border border-white/10 text-slate-300 p-4 rounded-2xl rounded-br-none shadow-lg">
                                <p className="text-sm leading-relaxed">{c.response}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer: Timestamp */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-end items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                        <FaClock />
                        {new Date(c.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>

                </motion.div>
                ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
}