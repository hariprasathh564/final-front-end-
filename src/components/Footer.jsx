

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

// export default function FooterFizzyWorking() {
//   const [bubbles, setBubbles] = useState([]);
//   const [cursorTrail, setCursorTrail] = useState([]);
//   const [burstBubbles, setBurstBubbles] = useState([]);
//   const [sparkles, setSparkles] = useState([]);
//   const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

//   // Generate floating bubbles
//   useEffect(() => {
//     const bubbleCount = 30;
//     setBubbles(
//       Array.from({ length: bubbleCount }).map((_, i) => ({
//         id: i,
//         size: Math.random() * 14 + 6,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: Math.random() * 10 + 5,
//         opacity: Math.random() * 0.5 + 0.2,
//         isBurst: false,
//       }))
//     );
//   }, []);

//   // Generate sparkles
//   useEffect(() => {
//     const sparkleCount = 20;
//     setSparkles(
//       Array.from({ length: sparkleCount }).map((_, i) => ({
//         id: i,
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * 200, // floating above footer
//         size: Math.random() * 4 + 2,
//         opacity: Math.random() * 0.8 + 0.2,
//         delay: Math.random() * 5,
//         duration: Math.random() * 8 + 4,
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
//         size: Math.random() * 8 + 4,
//         opacity: Math.random() * 0.5 + 0.3,
//         life: 100,
//       };
//       setCursorTrail((prev) => [...prev, trailBubble]);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Animate bubbles, bursts, and cursor trail
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update burst bubbles
//       setBurstBubbles((prev) =>
//         prev
//           .map((b) => ({
//             ...b,
//             x: b.x + b.dx,
//             y: b.y + b.dy,
//             dy: b.dy + 0.15,
//             opacity: b.opacity - 0.02,
//             life: b.life - 1,
//           }))
//           .filter((b) => b.life > 0)
//       );

//       // Update cursor trail (fade and remove old)
//       setCursorTrail((prev) =>
//         prev
//           .map((c) => ({ ...c, life: c.life - 3 }))
//           .filter((c) => c.life > 0)
//       );

//       // Update sparkles (twinkle effect)
//       setSparkles((prev) =>
//         prev.map((s) => ({
//           ...s,
//           y: s.y + Math.sin(Date.now() / 500 + s.id) * 0.3,
//           opacity: 0.3 + 0.5 * Math.abs(Math.sin(Date.now() / 400 + s.id)),
//         }))
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
//           const dy = window.innerHeight - b.size - e.clientY;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (!b.isBurst && dist < 80) {
//             const bursts = Array.from({ length: 5 }).map(() => ({
//               id: Date.now() + Math.random(),
//               x: b.left * window.innerWidth / 100,
//               y: window.innerHeight - b.size,
//               size: Math.random() * 10 + 4,
//               opacity: 1,
//               dx: (Math.random() - 0.5) * 6,
//               dy: -(Math.random() * 5 + 3),
//               life: 50,
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
//     <footer className="relative text-white pt-16 pb-10 overflow-hidden bg-gradient-to-t from-[#1b0f3d] to-[#241571]">
//       {/* Floating bubbles */}
//       {bubbles.map((b) => (
//         <div
//           key={b.id}
//           className="absolute rounded-full bg-white/70"
//           style={{
//             width: `${b.size}px`,
//             height: `${b.size}px`,
//             left: `${b.left}%`,
//             bottom: `-${b.size * 2}px`,
//             opacity: b.opacity,
//             animation: `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
//           }}
//         />
//       ))}

//       {/* Cursor trail */}
//       {cursorTrail.map((t) => (
//         <div
//           key={t.id}
//           className="absolute rounded-full bg-white"
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

//       {/* Burst bubbles */}
//       {burstBubbles.map((b) => (
//         <div
//           key={b.id}
//           className="absolute rounded-full bg-cyan-400"
//           style={{
//             width: `${b.size}px`,
//             height: `${b.size}px`,
//             left: `${b.x}px`,
//             bottom: `${b.y}px`,
//             opacity: b.opacity,
//           }}
//         />
//       ))}

//       {/* Sparkles */}
//       {sparkles.map((s) => (
//         <div
//           key={s.id}
//           className="absolute rounded-full bg-white"
//           style={{
//             width: `${s.size}px`,
//             height: `${s.size}px`,
//             left: `${s.x}px`,
//             top: `${s.y}px`,
//             opacity: s.opacity,
//           }}
//         />
//       ))}

//       {/* Milk swirl */}
//       <div className="absolute w-[200%] h-[200%] top-[-40%] left-[-50%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_70%)] animate-swirl"></div>

//       {/* Footer content */}
//       <div className="container mx-auto px-6 relative z-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 border-b border-white/20 pb-8">
//           <div className="flex flex-col items-start gap-3">
//             <Link
//               to="/"
//               className="text-3xl font-extrabold text-cyan-400 hover:text-cyan-300 transition transform hover:scale-105 flex items-center gap-2"
//             >
//               <span className="inline-block text-4xl animate-bounce">🥛</span> Milk Soda
//             </Link>
//             <p className="text-gray-300 text-sm max-w-xs">
//               Refreshing milk-based beverages delivered directly to you. Healthy, tasty, and fizzy!
//             </p>
//             <div className="flex gap-4 mt-2">
//               <FaFacebookF className="hover:text-cyan-300 transition cursor-pointer" />
//               <FaTwitter className="hover:text-cyan-300 transition cursor-pointer" />
//               <FaInstagram className="hover:text-cyan-300 transition cursor-pointer" />
//             </div>
//           </div>

//           <div className="flex gap-10 flex-wrap">
//             <div>
//               <h4 className="font-semibold mb-3">Products</h4>
//               <ul className="space-y-2 text-gray-300 text-sm">
//                 <li><Link to="/products" className="hover:text-cyan-300">All Products</Link></li>
//                 <li><Link to="/best-sellers" className="hover:text-cyan-300">Best Sellers</Link></li>
//                 <li><Link to="/new-arrivals" className="hover:text-cyan-300">New Arrivals</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3">Company</h4>
//               <ul className="space-y-2 text-gray-300 text-sm">
//                 <li><Link to="/about" className="hover:text-cyan-300">About Us</Link></li>
//                 <li><Link to="/contact" className="hover:text-cyan-300">Contact</Link></li>
//                 <li><Link to="/careers" className="hover:text-cyan-300">Careers</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3">Support</h4>
//               <ul className="space-y-2 text-gray-300 text-sm">
//                 <li><Link to="/faq" className="hover:text-cyan-300">FAQ</Link></li>
//                 <li><Link to="/help" className="hover:text-cyan-300">Help Center</Link></li>
//                 <li><Link to="/terms" className="hover:text-cyan-300">Terms & Privacy</Link></li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="text-center text-gray-300 text-sm">
//           © {new Date().getFullYear()} Milk Soda — B2C Demo. All rights reserved.
//         </div>
//       </div>

//       {/* Animations */}
//       <style>{`
//         @keyframes bubbleFloat {
//           0% { transform: translateY(0) scale(1); opacity: 0.4; }
//           50% { transform: translateY(-45vh) scale(1.4); opacity: 0.25; }
//           100% { transform: translateY(-90vh) scale(1); opacity: 0; }
//         }
//         @keyframes swirl {
//           0% { transform: rotate(0deg) scale(1.2); }
//           100% { transform: rotate(360deg) scale(1.2); }
//         }
//         .animate-swirl {
//           animation: swirl 150s linear infinite;
//         }
//       `}</style>
//     </footer>
//   );
// }








// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// export default function Footer() {
//   // ===========================================================
//   // 1. EXACT ORIGINAL ANIMATION LOGIC
//   // ===========================================================
//   const [bubbles, setBubbles] = useState([]);
//   const [cursorTrail, setCursorTrail] = useState([]);
//   const [burstBubbles, setBurstBubbles] = useState([]);
//   const [sparkles, setSparkles] = useState([]);
  
//   // Logic: Floating bubbles
//   useEffect(() => {
//     const bubbleCount = 30;
//     setBubbles(
//       Array.from({ length: bubbleCount }).map((_, i) => ({
//         id: i,
//         size: Math.random() * 14 + 6,
//         left: Math.random() * 100,
//         delay: Math.random() * 5,
//         duration: Math.random() * 10 + 5,
//         opacity: Math.random() * 0.5 + 0.2,
//         isBurst: false,
//       }))
//     );
//   }, []);

//   // Logic: Sparkles
//   useEffect(() => {
//     const sparkleCount = 20;
//     setSparkles(
//       Array.from({ length: sparkleCount }).map((_, i) => ({
//         id: i,
//         x: Math.random() * 100, // Changed to % for responsive width
//         y: Math.random() * 100, // Changed to % for responsive height
//         size: Math.random() * 4 + 2,
//         opacity: Math.random() * 0.8 + 0.2,
//         delay: Math.random() * 5,
//         duration: Math.random() * 8 + 4,
//       }))
//     );
//   }, []);

//   // Logic: Track mouse for cursor trail
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       // Only track if mouse is over the footer area specifically
//       const footer = document.getElementById('premium-footer');
//       if(footer) {
//         const rect = footer.getBoundingClientRect();
//         if(e.clientY >= rect.top && e.clientY <= rect.bottom) {
//              const trailBubble = {
//                 id: Date.now() + Math.random(),
//                 x: e.clientX, // Fixed to viewport
//                 y: e.clientY, // Fixed to viewport
//                 size: Math.random() * 8 + 4,
//                 opacity: Math.random() * 0.5 + 0.3,
//                 life: 100,
//             };
//             setCursorTrail((prev) => [...prev, trailBubble]);
//         }
//       }
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Logic: Animation Loop (Bursts, Trail, Sparkles)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update burst bubbles
//       setBurstBubbles((prev) =>
//         prev
//           .map((b) => ({
//             ...b,
//             x: b.x + b.dx,
//             y: b.y + b.dy,
//             dy: b.dy + 0.15,
//             opacity: b.opacity - 0.02,
//             life: b.life - 1,
//           }))
//           .filter((b) => b.life > 0)
//       );

//       // Update cursor trail
//       setCursorTrail((prev) =>
//         prev
//           .map((c) => ({ ...c, life: c.life - 3 }))
//           .filter((c) => c.life > 0)
//       );

//       // Update sparkles (twinkle)
//       setSparkles((prev) =>
//         prev.map((s) => ({
//           ...s,
//           opacity: 0.3 + 0.5 * Math.abs(Math.sin(Date.now() / 400 + s.id)),
//         }))
//       );
//     }, 30);

//     return () => clearInterval(interval);
//   }, []);

//   // Logic: Bubble burst on hover
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const footer = document.getElementById('premium-footer');
//       if(!footer) return;
//       const rect = footer.getBoundingClientRect();

//       setBubbles((prev) =>
//         prev.map((b) => {
//           // Calculate relative positions
//           const bubbleX = (b.left * window.innerWidth) / 100;
//           // Approximate Y based on animation (visual only) - Logic kept simple
//           const bubbleY = rect.bottom - 50; 

//           const dx = bubbleX - e.clientX;
//           const dy = bubbleY - e.clientY;
//           const dist = Math.sqrt(dx * dx + dy * dy);
          
//           // Interaction threshold
//           if (!b.isBurst && dist < 80 && e.clientY > rect.top) {
//             const bursts = Array.from({ length: 5 }).map(() => ({
//               id: Date.now() + Math.random(),
//               x: bubbleX,
//               y: e.clientY, // Burst at mouse height
//               size: Math.random() * 10 + 4,
//               opacity: 1,
//               dx: (Math.random() - 0.5) * 6,
//               dy: -(Math.random() * 5 + 3),
//               life: 50,
//             }));
//             setBurstBubbles((prev) => [...prev, ...bursts]);
//             return { ...b, isBurst: true };
//           }
//           // Reset burst occasionally
//           if(b.isBurst && Math.random() > 0.99) return { ...b, isBurst: false };
//           return b;
//         })
//       );
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // ===========================================================
//   // 2. PREMIUM STYLE RENDER
//   // ===========================================================
//   return (
//     <footer id="premium-footer" className="relative pt-20 pb-10 overflow-hidden bg-[#0a0f1c] border-t border-white/10">
      
//       {/* --- Background Effects --- */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Liquid Shimmer Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-[#0a0f1c]"></div>
//         {/* The Swirl (Dark Mode Version) */}
//         <div className="absolute w-[150%] h-[150%] top-[-50%] left-[-25%] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,rgba(0,0,0,0)_60%)] animate-swirl opacity-50"></div>
//       </div>

//       {/* --- Animation Layer --- */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//         {bubbles.map((b) => (
//           <div
//             key={b.id}
//             className="absolute rounded-full bg-gradient-to-t from-white/30 to-cyan-400/10 border border-white/10 shadow-[0_0_10px_rgba(6,182,212,0.2)] backdrop-blur-[1px]"
//             style={{
//               width: `${b.size}px`,
//               height: `${b.size}px`,
//               left: `${b.left}%`,
//               bottom: `-${b.size * 2}px`,
//               opacity: b.isBurst ? 0 : b.opacity,
//               animation: `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
//             }}
//           />
//         ))}

//         {/* Sparkles */}
//         {sparkles.map((s) => (
//           <div
//             key={s.id}
//             className="absolute rounded-full bg-cyan-200 shadow-[0_0_5px_white]"
//             style={{
//               width: `${s.size}px`,
//               height: `${s.size}px`,
//               left: `${s.x}%`,
//               top: `${s.y}%`,
//               opacity: s.opacity,
//               animation: `twinkle ${s.duration}s ease-in-out infinite`
//             }}
//           />
//         ))}
//       </div>

//       {/* --- Fixed Layer for Trails & Bursts (On top of background, below text) --- */}
//       <div className="fixed inset-0 pointer-events-none z-10">
//           {cursorTrail.map((t) => (
//             <div
//               key={t.id}
//               className="absolute rounded-full bg-cyan-400 blur-[2px]"
//               style={{
//                 width: `${t.size}px`,
//                 height: `${t.size}px`,
//                 left: `${t.x}px`,
//                 top: `${t.y}px`,
//                 opacity: t.opacity * (t.life / 100),
//               }}
//             />
//           ))}
//           {burstBubbles.map((b) => (
//             <div
//               key={b.id}
//               className="absolute rounded-full bg-white shadow-[0_0_8px_cyan]"
//               style={{
//                 width: `${b.size}px`,
//                 height: `${b.size}px`,
//                 left: `${b.x}px`,
//                 top: `${b.y}px`, // Changed to Top based on calculation logic
//                 opacity: b.opacity,
//               }}
//             />
//           ))}
//       </div>

//       {/* --- Main Content --- */}
//       <div className="container mx-auto px-6 relative z-20">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
//           {/* Brand Column */}
//           <div className="md:col-span-5 flex flex-col gap-6">
//             <Link to="/" className="group w-fit">
//                <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
//                  MILK SODA
//                </h2>
//                <div className="h-1 w-12 bg-cyan-500 rounded-full mt-1 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_cyan]"></div>
//             </Link>
//             <p className="text-slate-400 leading-relaxed max-w-md">
//               Experience the fizz of the future. Premium milk-based carbonated beverages delivered with style, health, and taste in every sip.
//             </p>
            
//             {/* Social Icons */}
//             <div className="flex gap-4 mt-2">
//               {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
//                 <a key={index} href="#" className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300">
//                   <Icon className="text-slate-300 group-hover:text-cyan-300 transition-colors" />
//                   <span className="absolute inset-0 rounded-full ring-2 ring-cyan-400/0 group-hover:ring-cyan-400/20 group-hover:scale-110 transition-all duration-300"></span>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Links Column 1 */}
//           <div className="md:col-span-2">
//             <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Shop</h4>
//             <ul className="space-y-4">
//               {['All Products', 'Best Sellers', 'New Arrivals', 'Bundles'].map((item) => (
//                 <li key={item}>
//                   <Link to="/products" className="text-slate-400 hover:text-cyan-300 transition-colors relative group inline-block">
//                     {item}
//                     <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_5px_cyan]"></span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Links Column 2 */}
//           <div className="md:col-span-2">
//             <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Company</h4>
//             <ul className="space-y-4">
//               {['About Us', 'Careers', 'Press', 'Affiliates'].map((item) => (
//                 <li key={item}>
//                   <Link to="/about" className="text-slate-400 hover:text-cyan-300 transition-colors relative group inline-block">
//                     {item}
//                     <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_5px_cyan]"></span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter Column */}
//           <div className="md:col-span-3">
//             <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Stay Fizzy</h4>
//             <p className="text-slate-400 text-sm mb-4">Subscribe for exclusive drops and discounts.</p>
//             <div className="relative">
//                 <input 
//                     type="email" 
//                     placeholder="Enter your email" 
//                     className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
//                 />
//                 <button className="absolute right-1.5 top-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white p-2 rounded-md shadow-lg shadow-cyan-500/20 transition-all">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//                     </svg>
//                 </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-slate-500 text-sm">
//             © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Milk Soda</span>. All rights reserved.
//           </p>
//           <div className="flex gap-6 text-sm text-slate-500">
//             <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
//             <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
//           </div>
//         </div>
//       </div>

//       {/* --- Styles & Keyframes --- */}
//       <style>{`
//         @keyframes bubbleFloat {
//           0% { transform: translateY(0) scale(1); opacity: 0.4; }
//           50% { transform: translateY(-45vh) scale(1.2) translateX(10px); opacity: 0.25; }
//           100% { transform: translateY(-90vh) scale(1); opacity: 0; }
//         }
//         @keyframes swirl {
//           0% { transform: rotate(0deg) scale(1.2); }
//           100% { transform: rotate(360deg) scale(1.2); }
//         }
//         @keyframes twinkle {
//             0%, 100% { opacity: 0.2; transform: scale(1); }
//             50% { opacity: 1; transform: scale(1.5); }
//         }
//         .animate-swirl {
//           animation: swirl 120s linear infinite;
//         }
//       `}</style>
//     </footer>
//   );
// }







import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  // ===========================================================
  // 1. EXACT ORIGINAL ANIMATION LOGIC
  // ===========================================================
  const [bubbles, setBubbles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [burstBubbles, setBurstBubbles] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  
  // Logic: Floating bubbles
  useEffect(() => {
    const bubbleCount = 30;
    setBubbles(
      Array.from({ length: bubbleCount }).map((_, i) => ({
        id: i,
        size: Math.random() * 14 + 6,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 5,
        opacity: Math.random() * 0.5 + 0.2,
        isBurst: false,
      }))
    );
  }, []);

  // Logic: Sparkles
  useEffect(() => {
    const sparkleCount = 20;
    setSparkles(
      Array.from({ length: sparkleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 4,
      }))
    );
  }, []);

  // Logic: Track mouse for cursor trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      const footer = document.getElementById('premium-footer');
      if(footer) {
        const rect = footer.getBoundingClientRect();
        if(e.clientY >= rect.top && e.clientY <= rect.bottom) {
             const trailBubble = {
                id: Date.now() + Math.random(),
                x: e.clientX, 
                y: e.clientY, 
                size: Math.random() * 8 + 4,
                opacity: Math.random() * 0.5 + 0.3,
                life: 100,
            };
            setCursorTrail((prev) => [...prev, trailBubble]);
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Logic: Animation Loop (Bursts, Trail, Sparkles)
  useEffect(() => {
    const interval = setInterval(() => {
      setBurstBubbles((prev) =>
        prev
          .map((b) => ({
            ...b,
            x: b.x + b.dx,
            y: b.y + b.dy,
            dy: b.dy + 0.15,
            opacity: b.opacity - 0.02,
            life: b.life - 1,
          }))
          .filter((b) => b.life > 0)
      );

      setCursorTrail((prev) =>
        prev
          .map((c) => ({ ...c, life: c.life - 3 }))
          .filter((c) => c.life > 0)
      );

      setSparkles((prev) =>
        prev.map((s) => ({
          ...s,
          opacity: 0.3 + 0.5 * Math.abs(Math.sin(Date.now() / 400 + s.id)),
        }))
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Logic: Bubble burst on hover
  useEffect(() => {
    const handleMouseMove = (e) => {
      const footer = document.getElementById('premium-footer');
      if(!footer) return;
      const rect = footer.getBoundingClientRect();

      setBubbles((prev) =>
        prev.map((b) => {
          const bubbleX = (b.left * window.innerWidth) / 100;
          const bubbleY = rect.bottom - 50; 
          const dx = bubbleX - e.clientX;
          const dy = bubbleY - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (!b.isBurst && dist < 80 && e.clientY > rect.top) {
            const bursts = Array.from({ length: 5 }).map(() => ({
              id: Date.now() + Math.random(),
              x: bubbleX,
              y: e.clientY, 
              size: Math.random() * 10 + 4,
              opacity: 1,
              dx: (Math.random() - 0.5) * 6,
              dy: -(Math.random() * 5 + 3),
              life: 50,
            }));
            setBurstBubbles((prev) => [...prev, ...bursts]);
            return { ...b, isBurst: true };
          }
          if(b.isBurst && Math.random() > 0.99) return { ...b, isBurst: false };
          return b;
        })
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ===========================================================
  // 2. PREMIUM STYLE RENDER
  // ===========================================================
  return (
    <footer id="premium-footer" className="relative pt-20 pb-10 overflow-hidden bg-[#0a0f1c] border-t border-white/10">
      
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-[#0a0f1c]"></div>
        <div className="absolute w-[150%] h-[150%] top-[-50%] left-[-25%] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,rgba(0,0,0,0)_60%)] animate-swirl opacity-50"></div>
      </div>

      {/* --- Animation Layer --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full bg-gradient-to-t from-white/30 to-cyan-400/10 border border-white/10 shadow-[0_0_10px_rgba(6,182,212,0.2)] backdrop-blur-[1px]"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              bottom: `-${b.size * 2}px`,
              opacity: b.isBurst ? 0 : b.opacity,
              animation: `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
            }}
          />
        ))}

        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-cyan-200 shadow-[0_0_5px_white]"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: `${s.x}%`,
              top: `${s.y}%`,
              opacity: s.opacity,
              animation: `twinkle ${s.duration}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* --- Fixed Layer for Trails & Bursts --- */}
      <div className="fixed inset-0 pointer-events-none z-10">
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
              }}
            />
          ))}
          {burstBubbles.map((b) => (
            <div
              key={b.id}
              className="absolute rounded-full bg-white shadow-[0_0_8px_cyan]"
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

      {/* --- Main Content --- */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* === UPDATED BRAND COLUMN (Left Side) === */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link to="/" className="group flex items-center gap-5">
               
               {/* The Large Animated Logo */}
               <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
                   {/* Backlight Glow */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-400/20 blur-2xl rounded-full opacity-40 group-hover:opacity-80 animate-pulse transition-opacity duration-500"></div>
                   
                   {/* The Image */}
                   <img 
                     src="https://varied-blush-qfjhsxatkx-7ugnp06lur.edgeone.dev/Gemini_Generated_Image_r7mwrdr7mwrdr7mw-removebg-preview.png"
                     alt="Milk Soda Logo"
                     className="relative z-10 w-full h-full object-contain animate-float drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform duration-500"
                   />
               </div>

               {/* The Text Title */}
               <div className="flex flex-col">
                  <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                    MILK SODA
                  </h2>
                  <div className="h-1 w-12 bg-cyan-500 rounded-full mt-1 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_cyan]"></div>
               </div>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-md">
              Experience the fizz of the future. Premium milk-based carbonated beverages delivered with style, health, and taste in every sip.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a key={index} href="#" className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300">
                  <Icon className="text-slate-300 group-hover:text-cyan-300 transition-colors" />
                  <span className="absolute inset-0 rounded-full ring-2 ring-cyan-400/0 group-hover:ring-cyan-400/20 group-hover:scale-110 transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 pt-4">
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Shop</h4>
            <ul className="space-y-4">
              {['All Products', 'Best Sellers', 'New Arrivals', 'Bundles'].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-slate-400 hover:text-cyan-300 transition-colors relative group inline-block">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_5px_cyan]"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 pt-4">
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Press', 'Affiliates'].map((item) => (
                <li key={item}>
                  <Link to="/about" className="text-slate-400 hover:text-cyan-300 transition-colors relative group inline-block">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_5px_cyan]"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 pt-4">
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Stay Fizzy</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe for exclusive drops and discounts.</p>
            <div className="relative">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
                <button className="absolute right-1.5 top-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white p-2 rounded-md shadow-lg shadow-cyan-500/20 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Milk Soda</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* --- Styles & Keyframes --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-45vh) scale(1.2) translateX(10px); opacity: 0.25; }
          100% { transform: translateY(-90vh) scale(1); opacity: 0; }
        }
        @keyframes swirl {
          0% { transform: rotate(0deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1.2); }
        }
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-swirl {
          animation: swirl 120s linear infinite;
        }
      `}</style>
    </footer>
  );
}