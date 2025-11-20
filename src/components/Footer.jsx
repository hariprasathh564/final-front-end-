




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   const [bubbles, setBubbles] = useState([]);

//   // Generate bubbles inside footer
//   useEffect(() => {
//     const bubbleCount = 25;
//     const newBubbles = Array.from({ length: bubbleCount }).map((_, i) => ({
//       id: i,
//       size: Math.random() * 12 + 6,
//       left: Math.random() * 100,
//       delay: Math.random() * 5,
//       duration: Math.random() * 10 + 6,
//       opacity: Math.random() * 0.4 + 0.25,
//     }));

//     setBubbles(newBubbles);
//   }, []);

//   return (
//     <footer className="relative bg-[#241571] text-white pt-10 pb-6 overflow-hidden">

//       {/* ⭐ BACKGROUND EFFECTS — Bubbles + Milk swirl */}
//       <div className="absolute inset-0 pointer-events-none -z-10">

//         {/* Floating Bubbles */}
//         {bubbles.map((b) => (
//           <div
//             key={b.id}
//             className="absolute rounded-full bg-white"
//             style={{
//               width: `${b.size}px`,
//               height: `${b.size}px`,
//               left: `${b.left}%`,
//               bottom: `-${b.size * 2}px`,
//               opacity: b.opacity,
//               animation: `footerBubble ${b.duration}s ease-in-out ${b.delay}s infinite`,
//             }}
//           />
//         ))}

//         {/* Milk Swirl (big radial gradient) */}
//         <div className="absolute w-[200%] h-[200%] top-[-40%] left-[-50%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_70%)] animate-footerSwirl"></div>

//         {/* Animations */}
//         <style>
//           {`
//             @keyframes footerBubble {
//               0% { transform: translateY(0) scale(1); opacity: 0.4; }
//               50% { transform: translateY(-40vh) scale(1.3); opacity: 0.25; }
//               100% { transform: translateY(-80vh) scale(1); opacity: 0; }
//             }

//             @keyframes footerSwirl {
//               0% { transform: rotate(0deg) scale(1.2); }
//               100% { transform: rotate(360deg) scale(1.2); }
//             }

//             .animate-footerSwirl {
//               animation: footerSwirl 120s linear infinite;
//             }
//           `}
//         </style>
//       </div>

//       {/* ⭐ FOOTER CONTENT */}
//       <div className="container mx-auto px-4">

//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 border-b border-white/20 pb-6">
          
//           {/* Logo + description */}
//           <div className="flex flex-col items-start gap-2">
//             <Link
//               to=".."
//               className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition"
//             >
//               Milk Soda
//             </Link>
//             <p className="text-gray-300 text-sm max-w-xs">
//               Refreshing milk-based beverages delivered directly to you.
//               Healthy, tasty, and fizzy!
//             </p>
//           </div>

//           {/* Quick links */}
//           <div className="flex gap-6">

//             <div>
//               <h4 className="font-semibold mb-2">Products</h4>
//               <ul className="space-y-1 text-gray-300 text-sm">
//                 <li><Link to="/products" className="hover:text-cyan-300">All Products</Link></li>
//                 <li><Link to="/best-sellers" className="hover:text-cyan-300">Best Sellers</Link></li>
//                 <li><Link to="/new-arrivals" className="hover:text-cyan-300">New Arrivals</Link></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-2">Company</h4>
//               <ul className="space-y-1 text-gray-300 text-sm">
//                 <li><Link to="/about" className="hover:text-cyan-300">About Us</Link></li>
//                 <li><Link to="/contact" className="hover:text-cyan-300">Contact</Link></li>
//                 <li><Link to="/careers" className="hover:text-cyan-300">Careers</Link></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-2">Support</h4>
//               <ul className="space-y-1 text-gray-300 text-sm">
//                 <li><Link to="/faq" className="hover:text-cyan-300">FAQ</Link></li>
//                 <li><Link to="/help" className="hover:text-cyan-300">Help Center</Link></li>
//                 <li><Link to="/terms" className="hover:text-cyan-300">Terms & Privacy</Link></li>
//               </ul>
//             </div>

//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="text-center text-gray-300 text-sm">
//           © {new Date().getFullYear()} Milk Soda — B2C Demo. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }









import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function FooterFizzyWorking() {
  const [bubbles, setBubbles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [burstBubbles, setBurstBubbles] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  // Generate floating bubbles
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

  // Generate sparkles
  useEffect(() => {
    const sparkleCount = 20;
    setSparkles(
      Array.from({ length: sparkleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * 200, // floating above footer
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 4,
      }))
    );
  }, []);

  // Track mouse for cursor trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      const trailBubble = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        opacity: Math.random() * 0.5 + 0.3,
        life: 100,
      };
      setCursorTrail((prev) => [...prev, trailBubble]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate bubbles, bursts, and cursor trail
  useEffect(() => {
    const interval = setInterval(() => {
      // Update burst bubbles
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

      // Update cursor trail (fade and remove old)
      setCursorTrail((prev) =>
        prev
          .map((c) => ({ ...c, life: c.life - 3 }))
          .filter((c) => c.life > 0)
      );

      // Update sparkles (twinkle effect)
      setSparkles((prev) =>
        prev.map((s) => ({
          ...s,
          y: s.y + Math.sin(Date.now() / 500 + s.id) * 0.3,
          opacity: 0.3 + 0.5 * Math.abs(Math.sin(Date.now() / 400 + s.id)),
        }))
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Bubble burst on hover
  useEffect(() => {
    const handleMouseMove = (e) => {
      setBubbles((prev) =>
        prev.map((b) => {
          const dx = b.left * window.innerWidth / 100 - e.clientX;
          const dy = window.innerHeight - b.size - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (!b.isBurst && dist < 80) {
            const bursts = Array.from({ length: 5 }).map(() => ({
              id: Date.now() + Math.random(),
              x: b.left * window.innerWidth / 100,
              y: window.innerHeight - b.size,
              size: Math.random() * 10 + 4,
              opacity: 1,
              dx: (Math.random() - 0.5) * 6,
              dy: -(Math.random() * 5 + 3),
              life: 50,
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

  return (
    <footer className="relative text-white pt-16 pb-10 overflow-hidden bg-gradient-to-t from-[#1b0f3d] to-[#241571]">
      {/* Floating bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-white/70"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            bottom: `-${b.size * 2}px`,
            opacity: b.opacity,
            animation: `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}

      {/* Cursor trail */}
      {cursorTrail.map((t) => (
        <div
          key={t.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${t.size}px`,
            height: `${t.size}px`,
            left: `${t.x}px`,
            top: `${t.y}px`,
            opacity: t.opacity * (t.life / 100),
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Burst bubbles */}
      {burstBubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.x}px`,
            bottom: `${b.y}px`,
            opacity: b.opacity,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: `${s.x}px`,
            top: `${s.y}px`,
            opacity: s.opacity,
          }}
        />
      ))}

      {/* Milk swirl */}
      <div className="absolute w-[200%] h-[200%] top-[-40%] left-[-50%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_70%)] animate-swirl"></div>

      {/* Footer content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 border-b border-white/20 pb-8">
          <div className="flex flex-col items-start gap-3">
            <Link
              to="/"
              className="text-3xl font-extrabold text-cyan-400 hover:text-cyan-300 transition transform hover:scale-105 flex items-center gap-2"
            >
              <span className="inline-block text-4xl animate-bounce">🥛</span> Milk Soda
            </Link>
            <p className="text-gray-300 text-sm max-w-xs">
              Refreshing milk-based beverages delivered directly to you. Healthy, tasty, and fizzy!
            </p>
            <div className="flex gap-4 mt-2">
              <FaFacebookF className="hover:text-cyan-300 transition cursor-pointer" />
              <FaTwitter className="hover:text-cyan-300 transition cursor-pointer" />
              <FaInstagram className="hover:text-cyan-300 transition cursor-pointer" />
            </div>
          </div>

          <div className="flex gap-10 flex-wrap">
            <div>
              <h4 className="font-semibold mb-3">Products</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/products" className="hover:text-cyan-300">All Products</Link></li>
                <li><Link to="/best-sellers" className="hover:text-cyan-300">Best Sellers</Link></li>
                <li><Link to="/new-arrivals" className="hover:text-cyan-300">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/about" className="hover:text-cyan-300">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-300">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-cyan-300">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/faq" className="hover:text-cyan-300">FAQ</Link></li>
                <li><Link to="/help" className="hover:text-cyan-300">Help Center</Link></li>
                <li><Link to="/terms" className="hover:text-cyan-300">Terms & Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} Milk Soda — B2C Demo. All rights reserved.
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-45vh) scale(1.4); opacity: 0.25; }
          100% { transform: translateY(-90vh) scale(1); opacity: 0; }
        }
        @keyframes swirl {
          0% { transform: rotate(0deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1.2); }
        }
        .animate-swirl {
          animation: swirl 150s linear infinite;
        }
      `}</style>
    </footer>
  );
}

