// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import { FiShoppingCart } from "react-icons/fi";
// import API from "../api/axiosClient";

// export default function Navbar() {
//   const { user, logout, fetchProfile } = useAuth();
//   const cart = useSelector((state) => state.cart);
//   const navigate = useNavigate();

//   const profileImage = user?.profileImage
//     ? user.profileImage.startsWith("http")
//       ? user.profileImage
//       : `http://localhost:3000/uploads/${user.profileImage}`
//     : "https://i.ibb.co/1v2f8nC/default-avatar.png"; // default avatar


// // const profileImage = user?.profileImage
// //   ? user.profileImage.startsWith("http")
// //     ? user.profileImage
// //     : `${import.meta.env.VITE_BACKEND_URL}/uploads/${user.profileImage}`
// //   : "https://i.ibb.co/1v2f8nC/default-avatar.png";

//   const handleUpload = async (e) => {
//     if (!e.target.files || e.target.files.length === 0) return;
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("profileImage", file);

//     try {
//       await API.post("/auth/upload-profile-image", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (fetchProfile) await fetchProfile();
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Failed to upload profile image");
//     }
//   };

//   // --- Animation states ---
//   const [bubbles, setBubbles] = useState([]);
//   const [cursorTrail, setCursorTrail] = useState([]);
//   const [burstBubbles, setBurstBubbles] = useState([]);
//   const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

//   // Generate floating bubbles
//   useEffect(() => {
//     const bubbleCount = 25;
//     setBubbles(
//       Array.from({ length: bubbleCount }).map((_, i) => ({
//         id: i,
//         size: Math.random() * 10 + 4,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: Math.random() * 8 + 4,
//         opacity: Math.random() * 0.5 + 0.2,
//         isBurst: false,
//       }))
//     );
//   }, []);

//   // Track mouse for cursor trail
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMouse({ x: e.clientX, y: e.clientY });
//       const trailBubble = {
//         id: Date.now() + Math.random(),
//         x: e.clientX,
//         y: e.clientY,
//         size: Math.random() * 6 + 3,
//         opacity: Math.random() * 0.5 + 0.3,
//         life: 100,
//       };
//       setCursorTrail((prev) => [...prev, trailBubble]);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Animate bubbles, bursts, cursor trail
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update burst bubbles
//       setBurstBubbles((prev) =>
//         prev
//           .map((b) => ({
//             ...b,
//             x: b.x + b.dx,
//             y: b.y + b.dy,
//             dy: b.dy + 0.1,
//             opacity: b.opacity - 0.02,
//             life: b.life - 1,
//           }))
//           .filter((b) => b.life > 0)
//       );

//       // Update cursor trail (fade)
//       setCursorTrail((prev) =>
//         prev
//           .map((c) => ({ ...c, life: c.life - 2 }))
//           .filter((c) => c.life > 0)
//       );
//     }, 30);

//     return () => clearInterval(interval);
//   }, []);

//   // Bubble burst on hover
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setBubbles((prev) =>
//         prev.map((b) => {
//           const dx = b.left * window.innerWidth / 100 - e.clientX;
//           const dy = 50 - e.clientY; // navbar height ~50px
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (!b.isBurst && dist < 60) {
//             const bursts = Array.from({ length: 4 }).map(() => ({
//               id: Date.now() + Math.random(),
//               x: b.left * window.innerWidth / 100,
//               y: 50,
//               size: Math.random() * 8 + 3,
//               opacity: 1,
//               dx: (Math.random() - 0.5) * 4,
//               dy: -(Math.random() * 4 + 2),
//               life: 40,
//             }));
//             setBurstBubbles((prev) => [...prev, ...bursts]);
//             return { ...b, isBurst: true };
//           }
//           return b;
//         })
//       );
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900/90 to-cyan-900/80 backdrop-blur-md shadow-lg overflow-hidden">
//       {/* --- Fizzy Animations Behind Navbar --- */}
//       {bubbles.map((b) => (
//         <div
//           key={b.id}
//           className="absolute rounded-full bg-white/60"
//           style={{
//             width: `${b.size}px`,
//             height: `${b.size}px`,
//             left: `${b.left}%`,
//             top: `50%`,
//             opacity: b.opacity,
//             animation: `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
//             pointerEvents: "none",
//           }}
//         />
//       ))}
//       {cursorTrail.map((t) => (
//         <div
//           key={t.id}
//           className="absolute rounded-full bg-white/80"
//           style={{
//             width: `${t.size}px`,
//             height: `${t.size}px`,
//             left: `${t.x}px`,
//             top: `${t.y}px`,
//             opacity: t.opacity * (t.life / 100),
//             pointerEvents: "none",
//           }}
//         />
//       ))}
//       {burstBubbles.map((b) => (
//         <div
//           key={b.id}
//           className="absolute rounded-full bg-cyan-400"
//           style={{
//             width: `${b.size}px`,
//             height: `${b.size}px`,
//             left: `${b.x}px`,
//             top: `${b.y}px`,
//             opacity: b.opacity,
//             pointerEvents: "none",
//           }}
//         />
//       ))}

//       {/* --- Navbar content --- */}
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center relative z-10">
//         <div className="flex items-center gap-6">
//           <Link
//             to="/"
//             className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//           >
//             Milk Soda
//           </Link>
//           <nav className="hidden md:flex gap-4 font-medium">
//             <Link
//               to="/products"
//               className="text-white hover:text-cyan-300 transition-colors"
//             >
//               Products
//             </Link>
//             <Link
//               to="/about"
//               className="text-white hover:text-cyan-300 transition-colors"
//             >
//               About
//             </Link>
//             <Link
//               to="/orders"
//               className="text-white hover:text-cyan-300 transition-colors"
//             >
//               My Orders
//             </Link>
//           </nav>
//         </div>

//         <div className="flex items-center gap-4">
//           <Link
//             id="navbar-cart-icon"
//             to="/cart"
//             className="relative flex items-center gap-1 text-white hover:text-cyan-300 transition-colors"
//           >
//             <FiShoppingCart className="text-xl" />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white font-bold rounded-full px-1.5 py-0.5 shadow animate-pulse">
//               {cart.items?.length || 0}
//             </span>
//           </Link>

//           {user ? (
//             <>
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/20 transition">
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer"
//                   onClick={() =>
//                     document.getElementById("profileUploadInput")?.click()
//                   }
//                 />
//                 <input
//                   type="file"
//                   id="profileUploadInput"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleUpload}
//                 />
//                 <span className="text-white font-semibold text-sm hidden sm:inline-block">
//                   {user.name || user.email}
//                 </span>
//               </div>

//               <button
//                 onClick={() => {
//                   logout();
//                   navigate("/");
//                 }}
//                 className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
//               >
//                 Logout
//               </button>

//               {(user.role === "admin" || user.role === "manager") && (
//                 <Link
//                   to="/admin"
//                   className="ml-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-white px-3 py-1 rounded-lg font-medium shadow transition-colors"
//                 >
//                   Admin
//                 </Link>
//               )}
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="text-sm text-white hover:text-cyan-300 transition-colors font-medium"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="text-sm bg-cyan-500 hover:bg-cyan-400 text-white px-3 py-1 rounded-lg font-medium shadow transition-colors"
//               >
//                 Sign up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//       {/* --- Animations --- */}
//       <style>{`
//         @keyframes bubbleFloat {
//           0% { transform: translateY(0) scale(1); opacity: 0.4; }
//           50% { transform: translateY(-60px) scale(1.3); opacity: 0.25; }
//           100% { transform: translateY(-120px) scale(1); opacity: 0; }
//         }
//       `}</style>
//     </header>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import { FiShoppingCart, FiCamera, FiLogOut, FiUser } from "react-icons/fi";
// import API from "../api/axiosClient";

// export default function Navbar() {
//   const { user, logout, fetchProfile } = useAuth();
//   const cart = useSelector((state) => state.cart);
//   const navigate = useNavigate();

//   // ===========================================================
//   // 1. ORIGINAL LOGIC: PROFILE IMAGE & UPLOAD
//   // ===========================================================
//   const profileImage = user?.profileImage
//     ? user.profileImage.startsWith("http")
//       ? user.profileImage
//       : `http://localhost:3000/uploads/${user.profileImage}`
//     : "https://i.ibb.co/1v2f8nC/default-avatar.png";

//   const handleUpload = async (e) => {
//     if (!e.target.files || e.target.files.length === 0) return;
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("profileImage", file);

//     try {
//       await API.post("/auth/upload-profile-image", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (fetchProfile) await fetchProfile();
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Failed to upload profile image");
//     }
//   };

//   // ===========================================================
//   // 2. ORIGINAL LOGIC: BUBBLES & ANIMATIONS
//   // ===========================================================
//   const [bubbles, setBubbles] = useState([]);
//   const [cursorTrail, setCursorTrail] = useState([]);
//   const [burstBubbles, setBurstBubbles] = useState([]);
//   const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

//   // Generate floating bubbles
//   useEffect(() => {
//     const bubbleCount = 25;
//     setBubbles(
//       Array.from({ length: bubbleCount }).map((_, i) => ({
//         id: i,
//         size: Math.random() * 10 + 4,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: Math.random() * 8 + 4,
//         opacity: Math.random() * 0.5 + 0.2,
//         isBurst: false,
//       }))
//     );
//   }, []);

//   // Track mouse
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMouse({ x: e.clientX, y: e.clientY });
//       const trailBubble = {
//         id: Date.now() + Math.random(),
//         x: e.clientX,
//         y: e.clientY,
//         size: Math.random() * 6 + 3,
//         opacity: Math.random() * 0.5 + 0.3,
//         life: 100,
//       };
//       setCursorTrail((prev) => [...prev, trailBubble]);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Animation Loop
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBurstBubbles((prev) =>
//         prev
//           .map((b) => ({
//             ...b,
//             x: b.x + b.dx,
//             y: b.y + b.dy,
//             dy: b.dy + 0.1,
//             opacity: b.opacity - 0.02,
//             life: b.life - 1,
//           }))
//           .filter((b) => b.life > 0)
//       );

//       setCursorTrail((prev) =>
//         prev
//           .map((c) => ({ ...c, life: c.life - 2 }))
//           .filter((c) => c.life > 0)
//       );
//     }, 30);

//     return () => clearInterval(interval);
//   }, []);

//   // Bubble Burst Physics
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setBubbles((prev) =>
//         prev.map((b) => {
//           const dx = (b.left * window.innerWidth) / 100 - e.clientX;
//           const dy = 50 - e.clientY;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (!b.isBurst && dist < 60) {
//             const bursts = Array.from({ length: 4 }).map(() => ({
//               id: Date.now() + Math.random(),
//               x: (b.left * window.innerWidth) / 100,
//               y: 50,
//               size: Math.random() * 8 + 3,
//               opacity: 1,
//               dx: (Math.random() - 0.5) * 4,
//               dy: -(Math.random() * 4 + 2),
//               life: 40,
//             }));
//             setBurstBubbles((prev) => [...prev, ...bursts]);
//             return { ...b, isBurst: true };
//           }
//           return b;
//         })
//       );
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // ===========================================================
//   // 3. RENDER
//   // ===========================================================
//   return (
//     <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      
//       {/* --- Background Container (The "Bottle" Glass Effect) --- */}
//       <div className="absolute inset-0 bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)]">
//         {/* Liquid Shimmer Effect */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-shimmer"></div>
//       </div>

//       {/* --- Animation Layer (Pointer Events None) --- */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {bubbles.map((b) => (
//           <div
//             key={b.id}
//             className="absolute rounded-full bg-gradient-to-t from-white/40 to-cyan-300/10 border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
//             style={{
//               width: `${b.size}px`,
//               height: `${b.size}px`,
//               left: `${b.left}%`,
//               top: `50%`,
//               opacity: b.opacity,
//               animation: `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
//               backdropFilter: "blur(2px)",
//             }}
//           />
//         ))}
//         {cursorTrail.map((t) => (
//           <div
//             key={t.id}
//             className="absolute rounded-full bg-cyan-400 blur-[2px]"
//             style={{
//               width: `${t.size}px`,
//               height: `${t.size}px`,
//               left: `${t.x}px`,
//               top: `${t.y}px`,
//               opacity: t.opacity * (t.life / 100),
//               boxShadow: "0 0 10px cyan",
//             }}
//           />
//         ))}
//         {burstBubbles.map((b) => (
//           <div
//             key={b.id}
//             className="absolute rounded-full bg-white shadow-[0_0_10px_cyan]"
//             style={{
//               width: `${b.size}px`,
//               height: `${b.size}px`,
//               left: `${b.x}px`,
//               top: `${b.y}px`,
//               opacity: b.opacity,
//             }}
//           />
//         ))}
//       </div>

//       {/* --- Content Container --- */}
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center relative z-10">
        
//         {/* --- Logo & Nav --- */}
//         <div className="flex items-center gap-10">
//           <Link to="/" className="group relative">
//             {/* Liquid Text Effect */}
//             <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 animate-gradient-x drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
//               MILK SODA
//             </h1>
//             {/* Fizz Dot */}
//             <div className="absolute -top-1 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
//           </Link>

//           <nav className="hidden md:flex gap-8 font-semibold text-sm tracking-wide">
//             {["Products", "About", "My Orders"].map((item) => {
//                 const path = item === "My Orders" ? "/orders" : `/${item.toLowerCase()}`;
//                 return (
//                   <Link
//                     key={item}
//                     to={path}
//                     className="relative text-slate-300 hover:text-white transition-colors duration-300 group py-2"
//                   >
//                     {item}
//                     {/* Hover Glow Line */}
//                     <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_cyan] transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
//                     {/* Top Shine */}
//                     <span className="absolute -top-2 left-1/2 w-0 h-[10px] bg-gradient-to-b from-cyan-400/20 to-transparent transform -translate-x-1/2 transition-all duration-300 group-hover:w-full blur-sm"></span>
//                   </Link>
//                 );
//             })}
//           </nav>
//         </div>

//         {/* --- Right Side Actions --- */}
//         <div className="flex items-center gap-6">
          
//           {/* Cart Icon */}
//           <Link
//             id="navbar-cart-icon"
//             to="/cart"
//             className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
//           >
//             <FiShoppingCart className="text-xl text-white group-hover:scale-110 transition-transform duration-300" />
//             {cart.items?.length > 0 && (
//               <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-bounce">
//                 {cart.items.length}
//               </span>
//             )}
//           </Link>

//           {user ? (
//             <>
//               {/* User Capsule */}
//               <div className="flex items-center gap-3 pl-1 pr-4 py-1 bg-[#0f172a]/60 backdrop-blur-md border border-white/10 rounded-full shadow-inner group hover:border-cyan-500/30 transition-all duration-300">
                
//                 {/* Profile Image with Overlay */}
//                 <div className="relative w-9 h-9 cursor-pointer" onClick={() => document.getElementById("profileUploadInput")?.click()}>
//                     <img
//                         src={profileImage}
//                         alt="User"
//                         className="w-full h-full rounded-full object-cover border-2 border-white/20 group-hover:border-cyan-400 transition-colors duration-300"
//                     />
//                     {/* Hover Overlay */}
//                     <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
//                         <FiCamera className="text-white text-xs" />
//                     </div>
//                     {/* Online Status */}
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#0f172a] rounded-full shadow-[0_0_5px_#4ade80]"></div>
//                 </div>

//                 <input
//                   type="file"
//                   id="profileUploadInput"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleUpload}
//                 />

//                 <div className="flex flex-col">
//                     <span className="text-white font-bold text-xs leading-tight max-w-[80px] truncate">
//                     {user.name || user.email.split('@')[0]}
//                     </span>
//                     <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">
//                     {user.role === 'admin' ? 'Admin' : 'Member'}
//                     </span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => { logout(); navigate("/"); }}
//                 className="group relative p-2 overflow-hidden rounded-full transition-transform hover:scale-105"
//               >
//                 <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/80 rounded-full transition-colors duration-300"></div>
//                 <FiLogOut className="relative text-red-400 group-hover:text-white text-lg transition-colors duration-300" />
//               </button>

//               {(user.role === "admin" || user.role === "manager") && (
//                 <Link
//                   to="/admin"
//                   className="hidden sm:block px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:-translate-y-0.5 transition-all"
//                 >
//                   DASHBOARD
//                 </Link>
//               )}
//             </>
//           ) : (
//             // Login / Register Buttons
//             <div className="flex items-center gap-3">
//               <Link
//                 to="/login"
//                 className="text-sm font-medium text-cyan-100 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all"
//               >
//                 Log In
//               </Link>
//               <Link
//                 to="/register"
//                 className="relative px-6 py-2 rounded-full group overflow-hidden"
//               >
//                 {/* Button Background Animation */}
//                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300"></div>
//                 <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                
//                 <span className="relative text-sm font-bold text-white tracking-wide">Sign Up</span>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- Global Animations --- */}
//       <style>{`
//         @keyframes bubbleFloat {
//           0% { transform: translateY(0) scale(1); opacity: 0.4; }
//           50% { transform: translateY(-60px) scale(1.1) translateX(5px); opacity: 0.6; }
//           100% { transform: translateY(-120px) scale(1); opacity: 0; }
//         }
//         @keyframes shimmer {
//             0% { background-position: 200% 0; }
//             100% { background-position: -200% 0; }
//         }
//         .animate-shimmer {
//             background-size: 200% 100%;
//             animation: shimmer 8s linear infinite;
//         }
//         .animate-gradient-x {
//             background-size: 200% 200%;
//             animation: gradient-move 3s ease infinite;
//         }
//         @keyframes gradient-move {
//             0%{background-position:0% 50%}
//             50%{background-position:100% 50%}
//             100%{background-position:0% 50%}
//         }
//       `}</style>
//     </header>
//   );
// }







// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import { FiShoppingCart, FiCamera, FiLogOut } from "react-icons/fi";
// import API from "../api/axiosClient";

// export default function Navbar() {
//   const { user, logout, fetchProfile } = useAuth();
//   const cart = useSelector((state) => state.cart);
//   const navigate = useNavigate();

//   // ===========================================================
//   // 1. LOGIC: PROFILE IMAGE & UPLOAD
//   // ===========================================================
//   const profileImage = user?.profileImage
//     ? user.profileImage.startsWith("http")
//       ? user.profileImage
//       : `http://localhost:3000/uploads/${user.profileImage}`
//     : "https://i.ibb.co/1v2f8nC/default-avatar.png";

//   const handleUpload = async (e) => {
//     if (!e.target.files || e.target.files.length === 0) return;
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("profileImage", file);

//     try {
//       await API.post("/auth/upload-profile-image", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (fetchProfile) await fetchProfile();
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Failed to upload profile image");
//     }
//   };

//   // ===========================================================
//   // 2. LOGIC: BUBBLES & ANIMATIONS
//   // ===========================================================
//   const [bubbles, setBubbles] = useState([]);
//   const [cursorTrail, setCursorTrail] = useState([]);
//   const [burstBubbles, setBurstBubbles] = useState([]);
//   const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

//   // Generate floating bubbles on mount
//   useEffect(() => {
//     const bubbleCount = 25;
//     setBubbles(
//       Array.from({ length: bubbleCount }).map((_, i) => ({
//         id: i,
//         size: Math.random() * 10 + 4,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: Math.random() * 8 + 4,
//         opacity: Math.random() * 0.5 + 0.2,
//         isBurst: false,
//       }))
//     );
//   }, []);

//   // Track mouse movement for trails and physics
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMouse({ x: e.clientX, y: e.clientY });
//       const trailBubble = {
//         id: Date.now() + Math.random(),
//         x: e.clientX,
//         y: e.clientY,
//         size: Math.random() * 6 + 3,
//         opacity: Math.random() * 0.5 + 0.3,
//         life: 100,
//       };
//       setCursorTrail((prev) => [...prev, trailBubble]);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Animation Loop (Physics Engine)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update burst particles
//       setBurstBubbles((prev) =>
//         prev
//           .map((b) => ({
//             ...b,
//             x: b.x + b.dx,
//             y: b.y + b.dy,
//             dy: b.dy + 0.1, // Gravity
//             opacity: b.opacity - 0.02,
//             life: b.life - 1,
//           }))
//           .filter((b) => b.life > 0)
//       );

//       // Fade cursor trail
//       setCursorTrail((prev) =>
//         prev
//           .map((c) => ({ ...c, life: c.life - 2 }))
//           .filter((c) => c.life > 0)
//       );
//     }, 30);

//     return () => clearInterval(interval);
//   }, []);

//   // Bubble Burst Physics Interaction
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setBubbles((prev) =>
//         prev.map((b) => {
//           const dx = (b.left * window.innerWidth) / 100 - e.clientX;
//           // Approximation of bubble height relative to viewport
//           const dy = 50 - e.clientY; 
//           const dist = Math.sqrt(dx * dx + dy * dy);
          
//           if (!b.isBurst && dist < 60) {
//             const bursts = Array.from({ length: 4 }).map(() => ({
//               id: Date.now() + Math.random(),
//               x: (b.left * window.innerWidth) / 100,
//               y: 50, // Reset burst Y to navbar height roughly
//               size: Math.random() * 8 + 3,
//               opacity: 1,
//               dx: (Math.random() - 0.5) * 4,
//               dy: -(Math.random() * 4 + 2),
//               life: 40,
//             }));
//             setBurstBubbles((prev) => [...prev, ...bursts]);
//             return { ...b, isBurst: true };
//           }
//           return b;
//         })
//       );
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // ===========================================================
//   // 3. RENDER
//   // ===========================================================
//   return (
//     <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      
//       {/* --- Glass Background Layer --- */}
//       <div className="absolute inset-0 bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)]">
//         {/* Shimmer Animation */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-shimmer pointer-events-none"></div>
//       </div>

//       {/* --- Animation Layer (Pointer Events None to allow clicking through) --- */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//         {/* Floating Bubbles */}
//         {bubbles.map((b) => (
//           <div
//             key={b.id}
//             className="absolute rounded-full bg-gradient-to-t from-white/40 to-cyan-300/10 border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
//             style={{
//               width: `${b.size}px`,
//               height: `${b.size}px`,
//               left: `${b.left}%`,
//               top: `50%`, // Start from middle/bottom of nav
//               opacity: b.isBurst ? 0 : b.opacity,
//               animation: b.isBurst ? 'none' : `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
//               backdropFilter: "blur(2px)",
//               transition: "opacity 0.2s",
//             }}
//           />
//         ))}
//         {/* Mouse Trail */}
//         {cursorTrail.map((t) => (
//           <div
//             key={t.id}
//             className="absolute rounded-full bg-cyan-400 blur-[2px]"
//             style={{
//               width: `${t.size}px`,
//               height: `${t.size}px`,
//               left: `${t.x}px`,
//               top: `${t.y}px`,
//               opacity: t.opacity * (t.life / 100),
//               boxShadow: "0 0 10px cyan",
//               pointerEvents: "none"
//             }}
//           />
//         ))}
//         {/* Burst Particles */}
//         {burstBubbles.map((b) => (
//           <div
//             key={b.id}
//             className="absolute rounded-full bg-white shadow-[0_0_10px_cyan]"
//             style={{
//               width: `${b.size}px`,
//               height: `${b.size}px`,
//               left: `${b.x}px`,
//               top: `${b.y}px`,
//               opacity: b.opacity,
//             }}
//           />
//         ))}
//       </div>

//       {/* --- Main Content Container --- */}
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center relative z-10">
        
//         {/* --- Logo & Nav Links --- */}
//         <div className="flex items-center gap-10">
//           {/* LOGO */}
//           <Link to="/" className="group relative">
//             <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 animate-gradient-x drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
//               MILK SODA
//             </h1>
//             <div className="absolute -top-1 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
//           </Link>

//           {/* NAVIGATION */}
//           <nav className="hidden md:flex gap-8 font-semibold text-sm tracking-wide">
//             {["Products", "About", "My Orders"].map((item) => {
//                 const path = item === "My Orders" ? "/orders" : `/${item.toLowerCase()}`;
//                 return (
//                   <Link
//                     key={item}
//                     to={path}
//                     className="relative text-slate-300 hover:text-white transition-colors duration-300 group py-2"
//                   >
//                     {item}
//                     <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_cyan] transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
//                     <span className="absolute -top-2 left-1/2 w-0 h-[10px] bg-gradient-to-b from-cyan-400/20 to-transparent transform -translate-x-1/2 transition-all duration-300 group-hover:w-full blur-sm"></span>
//                   </Link>
//                 );
//             })}
//           </nav>
//         </div>

//         {/* --- Right Side User/Cart Actions --- */}
//         <div className="flex items-center gap-6">
          
//           {/* CART ICON */}
//           <Link
//             to="/cart"
//             className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
//           >
//             <FiShoppingCart className="text-xl text-white group-hover:scale-110 transition-transform duration-300" />
//             {cart.items?.length > 0 && (
//               <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-bounce">
//                 {cart.items.length}
//               </span>
//             )}
//           </Link>

//           {user ? (
//             <>
//               {/* USER CAPSULE */}
//               <div className="flex items-center gap-3 pl-1 pr-4 py-1 bg-[#0f172a]/60 backdrop-blur-md border border-white/10 rounded-full shadow-inner group hover:border-cyan-500/30 transition-all duration-300">
                
//                 {/* Profile Image & Upload Trigger */}
//                 <div 
//                   className="relative w-9 h-9 cursor-pointer" 
//                   onClick={() => document.getElementById("profileUploadInput")?.click()}
//                   title="Change Profile Picture"
//                 >
//                     <img
//                         src={profileImage}
//                         alt="User"
//                         className="w-full h-full rounded-full object-cover border-2 border-white/20 group-hover:border-cyan-400 transition-colors duration-300"
//                     />
//                     {/* Overlay Icon */}
//                     <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
//                         <FiCamera className="text-white text-xs" />
//                     </div>
//                     {/* Status Dot */}
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#0f172a] rounded-full shadow-[0_0_5px_#4ade80]"></div>
//                 </div>

//                 {/* Hidden File Input */}
//                 <input
//                   type="file"
//                   id="profileUploadInput"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleUpload}
//                 />

//                 {/* User Info */}
//                 <div className="flex flex-col">
//                     <span className="text-white font-bold text-xs leading-tight max-w-[80px] truncate">
//                     {user.name || user.email?.split('@')[0]}
//                     </span>
//                     <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">
//                     {user.role === 'admin' ? 'Admin' : 'Member'}
//                     </span>
//                 </div>
//               </div>

//               {/* LOGOUT BUTTON */}
//               <button
//                 onClick={() => { logout(); navigate("/"); }}
//                 className="group relative p-2 overflow-hidden rounded-full transition-transform hover:scale-105"
//                 title="Logout"
//               >
//                 <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/80 rounded-full transition-colors duration-300"></div>
//                 <FiLogOut className="relative text-red-400 group-hover:text-white text-lg transition-colors duration-300" />
//               </button>

//               {/* ADMIN DASHBOARD LINK */}
//               {(user.role === "admin" || user.role === "manager") && (
//                 <Link
//                   to="/admin"
//                   className="hidden sm:block px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:-translate-y-0.5 transition-all"
//                 >
//                   DASHBOARD
//                 </Link>
//               )}
//             </>
//           ) : (
//             /* LOGIN / SIGNUP BUTTONS */
//             <div className="flex items-center gap-3">
//               <Link
//                 to="/login"
//                 className="text-sm font-medium text-cyan-100 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all"
//               >
//                 Log In
//               </Link>
//               <Link
//                 to="/register"
//                 className="relative px-6 py-2 rounded-full group overflow-hidden"
//               >
//                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300"></div>
//                 <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
//                 <span className="relative text-sm font-bold text-white tracking-wide">Sign Up</span>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- Styles for Keyframe Animations --- */}
//       <style>{`
//         @keyframes bubbleFloat {
//           0% { transform: translateY(0) scale(1); opacity: 0.4; }
//           50% { transform: translateY(-60px) scale(1.1) translateX(5px); opacity: 0.6; }
//           100% { transform: translateY(-120px) scale(1); opacity: 0; }
//         }
//         @keyframes shimmer {
//             0% { background-position: 200% 0; }
//             100% { background-position: -200% 0; }
//         }
//         .animate-shimmer {
//             background-size: 200% 100%;
//             animation: shimmer 8s linear infinite;
//         }
//         .animate-gradient-x {
//             background-size: 200% 200%;
//             animation: gradient-move 3s ease infinite;
//         }
//         @keyframes gradient-move {
//             0%{background-position:0% 50%}
//             50%{background-position:100% 50%}
//             100%{background-position:0% 50%}
//         }
//       `}</style>
//     </header>
//   );
// }






import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { FiShoppingCart, FiCamera, FiLogOut } from "react-icons/fi";
import API from "../api/axiosClient";

export default function Navbar() {
  const { user, logout, fetchProfile } = useAuth();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // ===========================================================
  // 1. LOGIC: PROFILE IMAGE & UPLOAD
  // ===========================================================
  const profileImage = user?.profileImage
    ? user.profileImage.startsWith("http")
      ? user.profileImage
      : `http://localhost:3000/uploads/${user.profileImage}`
    : "https://i.ibb.co/1v2f8nC/default-avatar.png";

  const handleUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      await API.post("/auth/upload-profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (fetchProfile) await fetchProfile();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload profile image");
    }
  };

  // ===========================================================
  // 2. LOGIC: BUBBLES & ANIMATIONS
  // ===========================================================
  const [bubbles, setBubbles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [burstBubbles, setBurstBubbles] = useState([]);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  // Generate floating bubbles on mount
  useEffect(() => {
    const bubbleCount = 25;
    setBubbles(
      Array.from({ length: bubbleCount }).map((_, i) => ({
        id: i,
        size: Math.random() * 10 + 4,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 4,
        opacity: Math.random() * 0.5 + 0.2,
        isBurst: false,
      }))
    );
  }, []);

  // Track mouse movement for trails and physics
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      const trailBubble = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.5 + 0.3,
        life: 100,
      };
      setCursorTrail((prev) => [...prev, trailBubble]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation Loop (Physics Engine)
  useEffect(() => {
    const interval = setInterval(() => {
      // Update burst particles
      setBurstBubbles((prev) =>
        prev
          .map((b) => ({
            ...b,
            x: b.x + b.dx,
            y: b.y + b.dy,
            dy: b.dy + 0.1, // Gravity
            opacity: b.opacity - 0.02,
            life: b.life - 1,
          }))
          .filter((b) => b.life > 0)
      );

      // Fade cursor trail
      setCursorTrail((prev) =>
        prev
          .map((c) => ({ ...c, life: c.life - 2 }))
          .filter((c) => c.life > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Bubble Burst Physics Interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      setBubbles((prev) =>
        prev.map((b) => {
          const dx = (b.left * window.innerWidth) / 100 - e.clientX;
          // Approximation of bubble height relative to viewport
          const dy = 50 - e.clientY; 
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (!b.isBurst && dist < 60) {
            const bursts = Array.from({ length: 4 }).map(() => ({
              id: Date.now() + Math.random(),
              x: (b.left * window.innerWidth) / 100,
              y: 50, // Reset burst Y to navbar height roughly
              size: Math.random() * 8 + 3,
              opacity: 1,
              dx: (Math.random() - 0.5) * 4,
              dy: -(Math.random() * 4 + 2),
              life: 40,
            }));
            setBurstBubbles((prev) => [...prev, ...bursts]);
            return { ...b, isBurst: true };
          }
          return b;
        })
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ===========================================================
  // 3. RENDER
  // ===========================================================
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      
      {/* --- Glass Background Layer (Applied #0a0f1c) --- */}
      <div className="absolute inset-0 bg-[#0a0f1c]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)]">
        {/* Shimmer Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-shimmer pointer-events-none"></div>
      </div>

      {/* --- Animation Layer (Pointer Events None to allow clicking through) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating Bubbles */}
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full bg-gradient-to-t from-white/40 to-cyan-300/10 border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              top: `50%`, // Start from middle/bottom of nav
              opacity: b.isBurst ? 0 : b.opacity,
              animation: b.isBurst ? 'none' : `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
              backdropFilter: "blur(2px)",
              transition: "opacity 0.2s",
            }}
          />
        ))}
        {/* Mouse Trail */}
        {cursorTrail.map((t) => (
          <div
            key={t.id}
            className="absolute rounded-full bg-cyan-400 blur-[2px]"
            style={{
              width: `${t.size}px`,
              height: `${t.size}px`,
              left: `${t.x}px`,
              top: `${t.y}px`,
              opacity: t.opacity * (t.life / 100),
              boxShadow: "0 0 10px cyan",
              pointerEvents: "none"
            }}
          />
        ))}
        {/* Burst Particles */}
        {burstBubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full bg-white shadow-[0_0_10px_cyan]"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.x}px`,
              top: `${b.y}px`,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      {/* --- Main Content Container --- */}
      <div className="container mx-auto px-6 py-3 flex justify-between items-center relative z-10">
        
        {/* --- Logo & Nav Links --- */}
        <div className="flex items-center gap-10">
          {/* LOGO */}
          <Link to="/" className="group relative">
            <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 animate-gradient-x drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
              MILK SODA
            </h1>
            <div className="absolute -top-1 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden md:flex gap-8 font-semibold text-sm tracking-wide">
            {["Products", "About", "My Orders"].map((item) => {
                const path = item === "My Orders" ? "/orders" : `/${item.toLowerCase()}`;
                return (
                  <Link
                    key={item}
                    to={path}
                    className="relative text-slate-300 hover:text-white transition-colors duration-300 group py-2"
                  >
                    {item}
                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_cyan] transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute -top-2 left-1/2 w-0 h-[10px] bg-gradient-to-b from-cyan-400/20 to-transparent transform -translate-x-1/2 transition-all duration-300 group-hover:w-full blur-sm"></span>
                  </Link>
                );
            })}
          </nav>
        </div>

        {/* --- Right Side User/Cart Actions --- */}
        <div className="flex items-center gap-6">
          
          {/* CART ICON */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
          >
            <FiShoppingCart className="text-xl text-white group-hover:scale-110 transition-transform duration-300" />
            {cart.items?.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-bounce">
                {cart.items.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              {/* USER CAPSULE */}
              <div className="flex items-center gap-3 pl-1 pr-4 py-1 bg-[#0f172a]/60 backdrop-blur-md border border-white/10 rounded-full shadow-inner group hover:border-cyan-500/30 transition-all duration-300">
                
                {/* Profile Image & Upload Trigger */}
                <div 
                  className="relative w-9 h-9 cursor-pointer" 
                  onClick={() => document.getElementById("profileUploadInput")?.click()}
                  title="Change Profile Picture"
                >
                    <img
                        src={profileImage}
                        alt="User"
                        className="w-full h-full rounded-full object-cover border-2 border-white/20 group-hover:border-cyan-400 transition-colors duration-300"
                    />
                    {/* Overlay Icon */}
                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                        <FiCamera className="text-white text-xs" />
                    </div>
                    {/* Status Dot */}
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#0f172a] rounded-full shadow-[0_0_5px_#4ade80]"></div>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="profileUploadInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />

                {/* User Info */}
                <div className="flex flex-col">
                    <span className="text-white font-bold text-xs leading-tight max-w-[80px] truncate">
                    {user.name || user.email?.split('@')[0]}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">
                    {user.role === 'admin' ? 'Admin' : 'Member'}
                    </span>
                </div>
              </div>

              {/* LOGOUT BUTTON */}
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="group relative p-2 overflow-hidden rounded-full transition-transform hover:scale-105"
                title="Logout"
              >
                <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/80 rounded-full transition-colors duration-300"></div>
                <FiLogOut className="relative text-red-400 group-hover:text-white text-lg transition-colors duration-300" />
              </button>

              {/* ADMIN DASHBOARD LINK */}
              {(user.role === "admin" || user.role === "manager") && (
                <Link
                  to="/admin"
                  className="hidden sm:block px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:-translate-y-0.5 transition-all"
                >
                  DASHBOARD
                </Link>
              )}
            </>
          ) : (
            /* LOGIN / SIGNUP BUTTONS */
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-cyan-100 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="relative px-6 py-2 rounded-full group overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300"></div>
                <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <span className="relative text-sm font-bold text-white tracking-wide">Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* --- Styles for Keyframe Animations --- */}
      <style>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-60px) scale(1.1) translateX(5px); opacity: 0.6; }
          100% { transform: translateY(-120px) scale(1); opacity: 0; }
        }
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        .animate-shimmer {
            background-size: 200% 100%;
            animation: shimmer 8s linear infinite;
        }
        .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-move 3s ease infinite;
        }
        @keyframes gradient-move {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
      `}</style>
    </header>
  );
}