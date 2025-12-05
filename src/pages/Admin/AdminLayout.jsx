


// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaBox,
//   FaShoppingCart,
//   FaUsers,
//   FaAd,
//   FaComments,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";

// export default function AdminLayout({ children }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const isActive = (path) => location.pathname === path;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 relative">

//       {/* MOBILE TOGGLE */}
//       <button
//         className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md md:hidden hover:bg-blue-700 transition"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//       </button>

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed top-0 left-0 h-screen w-72 bg-gray-200/95 backdrop-blur-lg text-gray-900 shadow-xl p-6 flex flex-col
//         transform transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//         md:translate-x-0 z-40 border-r border-gray-300 rounded-r-2xl`}
//       >

//         {/* ⭐ NAVBAR HEADER */}
//         <div className="mb-10">
//           <h2 className="text-3xl font-extrabold tracking-wide text-white-500 drop-shadow">
//             Milk Soda Admin
//           </h2>
//         </div>

//         {/* ⭐ NAV LINKS */}
//         <nav className="space-y-4 mb-6 flex-1">
//           {[
//             { path: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
//             { path: "/admin/products", label: "Products", icon: <FaBox /> },
//             { path: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
//             { path: "/admin/users", label: "Users", icon: <FaUsers /> },
//             { path: "/admin/ads", label: "Ads", icon: <FaAd /> },
//             { path: "/admin/chats", label: "Chats", icon: <FaComments /> },
//           ].map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={`group flex items-center gap-4 p-4 rounded-xl font-semibold transition-all duration-300
//                 ${
//                   isActive(link.path)
//                     ? "bg-blue-500/30 shadow-inner scale-105"
//                     : "hover:bg-blue-500/20 hover:scale-105 hover:shadow-md"
//                 }`}
//               onClick={() => setSidebarOpen(false)}
//             >
//               <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110">
//                 {React.cloneElement(link.icon, { size: 22 })}
//               </span>
//               <span className="transition-all duration-300 text-gray-900 group-hover:text-blue-600">
//                 {link.label}
//               </span>
//             </Link>
//           ))}
//         </nav>

//         {/* ⭐ FOOTER (LOGOUT AT BOTTOM) */}
//         <div className="pt-4">
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl flex items-center gap-4 w-full font-semibold shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
//             onClick={handleLogout}
//           >
//             <FaSignOutAlt size={20} /> Logout
//           </button>
//         </div>

//       </aside>

//       {/* MAIN CONTENT */}
//       <main
//         className={`flex-1 p-10 transition-all duration-300 min-h-screen
//           ${sidebarOpen ? "ml-72" : "ml-0"}`}
//       >
//         {children}
//       </main>

//       {/* MOBILE OVERLAY */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 md:hidden z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaAd,
  FaComments,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // --- 1. ORIGINAL LOGIC ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // --- 2. ANIMATION LOGIC (Bubbles) ---
  const [bubbles, setBubbles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);

  useEffect(() => {
    setBubbles(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 10 + 4,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 4,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorTrail((prev) => [
        ...prev,
        { id: Date.now(), x: e.clientX, y: e.clientY, life: 100 },
      ].slice(-20));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail((prev) => prev.map(c => ({ ...c, life: c.life - 5 })).filter(c => c.life > 0));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0a0f1c] text-gray-100 relative">

      {/* --- BACKGROUND ANIMATIONS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px]"></div>
        {bubbles.map((b) => (
          <div key={b.id} className="absolute rounded-full bg-white/10" style={{
            width: `${b.size}px`, height: `${b.size}px`, left: `${b.left}%`, top: `100%`, opacity: b.opacity,
            animation: `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`
          }} />
        ))}
        {cursorTrail.map((t) => (
          <div key={t.id} className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-[1px]" style={{
            left: t.x, top: t.y, opacity: t.life / 100
          }} />
        ))}
      </div>

      {/* --- MOBILE TOGGLE (Fixed Top Left) --- */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#0f172a] border border-white/10 text-cyan-400 rounded-md shadow-md md:hidden hover:bg-white/10 transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* --- SIDEBAR (w-72, p-6) --- */}
      <aside
        className={`fixed top-10 bottom-3 left-0 h-screen w-72 bg-[#0f172a]/95 backdrop-blur-xl text-white shadow-2xl p-6 flex flex-col border-r border-white/10 z-40
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >

        {/* HEADER (mb-10) */}
        <div className="mb-10">
          <Link to="/" className="block group">
            <h2 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow group-hover:to-cyan-300 transition-all">
              Milk Soda
            </h2>
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Admin Panel</span>
          </Link>
        </div>

        {/* NAV LINKS (space-y-4, mb-6, p-4) */}
        <nav className="space-y-4 mb-6 flex-1 overflow-y-auto custom-scrollbar">
          {[
            { path: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
            { path: "/admin/products", label: "Products", icon: <FaBox /> },
            { path: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
            { path: "/admin/users", label: "Users", icon: <FaUsers /> },
            { path: "/admin/ads", label: "Ads", icon: <FaAd /> },
            { path: "/admin/chats", label: "Chats", icon: <FaComments /> },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`group flex items-center gap-4 p-4 rounded-xl font-semibold transition-all duration-300
                ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-105"
                    : "text-slate-400 hover:bg-white/5 hover:text-white hover:scale-105 hover:shadow-md"
                }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className={`transition-transform duration-300 ${isActive(link.path) ? "text-cyan-400" : "group-hover:text-cyan-200"}`}>
                {React.cloneElement(link.icon, { size: 22 })}
              </span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* FOOTER (pt-4) */}
        <div className="pt-4 border-t border-white/10">
          <button
            className="bg-gradient-to-r from-rose-900/50 to-red-900/50 border border-rose-500/20 mb-10 text-rose-200 hover:text-white p-4 rounded-xl flex items-center gap-4 w-full font-semibold shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={20} /> Logout
          </button>
        </div>

      </aside>

      {/* --- MAIN CONTENT (p-10) --- */}
      <main
        className={`flex-1 p-10 transition-all duration-300 min-h-screen relative z-10
          ${sidebarOpen ? "ml-5" : "ml-0"} 
          `}
      >
        {children}
      </main>

      {/* --- MOBILE OVERLAY --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-50vh) scale(1.2); opacity: 0.2; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
}