// //original code before adding profile img//
// // src/components/Navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import { FiShoppingCart } from "react-icons/fi";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const cart = useSelector((state) => state.cart);
//   const navigate = useNavigate();

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-[#041E42]/95 backdrop-blur-md shadow-lg">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center relative z-10">
//         {/* Logo and Navigation */}
//         <div className="flex items-center gap-6">
//           <Link
//             to="/"
//             className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//           >
//             Milk Soda
//           </Link>
//           <nav className="hidden md:flex gap-4">
//             <Link
//               to="/products"
//               className="text-white hover:text-cyan-300 transition-colors font-medium"
//             >
//               Products
//             </Link>
//             <Link
//               to="/chat"
//               className="text-white hover:text-cyan-300 transition-colors font-medium"
//             >
//               Chats
//             </Link>
//             <Link
//               to="/orders"
//               className="text-white hover:text-cyan-300 transition-colors font-medium"
//             >
//               My Orders
//             </Link>
//           </nav>
//         </div>

//         {/* User & Cart Section */}
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
//               <div className="hidden sm:block text-white text-sm">
//                 Hi, <span className="font-semibold">{user.name || user.email}</span>
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
//     </header>
//   );
// }





















// //working code////
// // src/components/Navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import { FiShoppingCart } from "react-icons/fi";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const cart = useSelector((state) => state.cart);
//   const navigate = useNavigate();

//   const profileImage = user?.profileImage
//     ? user.profileImage.startsWith("http")
//       ? user.profileImage
//       : `http://localhost:3000/uploads/${user.profileImage}`
//     : "https://i.ibb.co/1v2f8nC/default-avatar.png"; // default avatar

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900/90 to-cyan-900/80 backdrop-blur-md shadow-lg">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center relative z-10">
//         {/* Logo and Navigation */}
//         <div className="flex items-center gap-6">
//           <Link
//             to="/"
//             className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//           >
//             Milk Soda
//           </Link>
//           <nav className="hidden md:flex gap-4 font-medium">
//             <Link to="/products" className="text-white hover:text-cyan-300 transition-colors">
//               Products
//             </Link>
//             <Link to="/chat" className="text-white hover:text-cyan-300 transition-colors">
//               Chats
//             </Link>
//             <Link to="/orders" className="text-white hover:text-cyan-300 transition-colors">
//               My Orders
//             </Link>
//           </nav>
//         </div>

//         {/* User & Cart Section */}
//         <div className="flex items-center gap-4">
//           {/* Cart Icon */}
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

//           {/* User Profile */}
//           {user ? (
//             <>
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/20 transition">
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
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
//     </header>
//   );
// }




// // src/components/Navbar.jsx
// import React, { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import { FiShoppingCart } from "react-icons/fi";
// import API from "../api/axiosClient";

// export default function Navbar() {
//   const { user, logout, fetchProfile } = useAuth();
//   const cart = useSelector((state) => state.cart);
//   const navigate = useNavigate();
//   const [uploading, setUploading] = useState(false);

//   const fileInputRef = useRef(null);

//   const profileImage = user?.profileImage
//     ? user.profileImage.startsWith("http")
//       ? user.profileImage
//       : `http://localhost:3000/uploads/${user.profileImage}`
//     : "https://i.ibb.co/1v2f8nC/default-avatar.png"; // default avatar

//   // ✅ Profile image upload handler
//   const handleUpload = async (e) => {
//     if (!e.target.files || e.target.files.length === 0) return;
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("profileImage", file);

//     try {
//       setUploading(true);
//       await API.post("/auth/upload-profile-image", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (fetchProfile) await fetchProfile(); // Refresh user profile
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Failed to upload profile image");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✅ Trigger file input click when profile image is clicked
//   const handleProfileClick = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900/90 to-cyan-900/80 backdrop-blur-md shadow-lg">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center relative z-10">
//         {/* Logo and Navigation */}
//         <div className="flex items-center gap-6">
//           <Link
//             to="/"
//             className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//           >
//             Milk Soda
//           </Link>
//           <nav className="hidden md:flex gap-4 font-medium">
//             <Link to="/products" className="text-white hover:text-cyan-300 transition-colors">
//               Products
//             </Link>
//             <Link to="/chat" className="text-white hover:text-cyan-300 transition-colors">
//               Chats
//             </Link>
//             <Link to="/orders" className="text-white hover:text-cyan-300 transition-colors">
//               My Orders
//             </Link>
//           </nav>
//         </div>

//         {/* User & Cart Section */}
//         <div className="flex items-center gap-4">
//           {/* Cart Icon */}
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

//           {/* User Profile */}
//           {user ? (
//             <>
//               <div
//                 className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/20 transition cursor-pointer"
//                 onClick={handleProfileClick} // click triggers upload
//               >
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
//                 />
//                 <span className="text-white font-semibold text-sm hidden sm:inline-block">
//                   {user.name || user.email}
//                 </span>
//               </div>

//               {/* Hidden file input */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 ref={fileInputRef}
//                 onChange={handleUpload}
//                 disabled={uploading}
//               />

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
//     </header>
//   );
// }








// import React from "react";
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

//   // ✅ Handle profile image upload
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

//       // Refresh user to update Navbar image
//       if (fetchProfile) await fetchProfile();
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Failed to upload profile image");
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900/90 to-cyan-900/80 backdrop-blur-md shadow-lg">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center relative z-10">
//         {/* Logo and Navigation */}
//         <div className="flex items-center gap-6">
//           <Link
//             to="/"
//             className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
//           >
//             Milk Soda
//           </Link>
//           <nav className="hidden md:flex gap-4 font-medium">
//             <Link to="/products" className="text-white hover:text-cyan-300 transition-colors">
//               Products
//             </Link>
//             <Link to="/chat" className="text-white hover:text-cyan-300 transition-colors">
//               Chats
//             </Link>
//             <Link to="/orders" className="text-white hover:text-cyan-300 transition-colors">
//               My Orders
//             </Link>
//           </nav>
//         </div>

//         {/* User & Cart Section */}
//         <div className="flex items-center gap-4">
//           {/* Cart Icon */}
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

//           {/* User Profile */}
//           {user ? (
//             <>
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/20 transition">
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer"
//                   onClick={() => document.getElementById("profileUploadInput")?.click()}
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
//     </header>
//   );
// }





import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import API from "../api/axiosClient";

export default function Navbar() {
  const { user, logout, fetchProfile } = useAuth();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const profileImage = user?.profileImage
    ? user.profileImage.startsWith("http")
      ? user.profileImage
      : `http://localhost:3000/uploads/${user.profileImage}`
    : "https://i.ibb.co/1v2f8nC/default-avatar.png"; // default avatar

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

  // --- Animation states ---
  const [bubbles, setBubbles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [burstBubbles, setBurstBubbles] = useState([]);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  // Generate floating bubbles
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

  // Track mouse for cursor trail
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

  // Animate bubbles, bursts, cursor trail
  useEffect(() => {
    const interval = setInterval(() => {
      // Update burst bubbles
      setBurstBubbles((prev) =>
        prev
          .map((b) => ({
            ...b,
            x: b.x + b.dx,
            y: b.y + b.dy,
            dy: b.dy + 0.1,
            opacity: b.opacity - 0.02,
            life: b.life - 1,
          }))
          .filter((b) => b.life > 0)
      );

      // Update cursor trail (fade)
      setCursorTrail((prev) =>
        prev
          .map((c) => ({ ...c, life: c.life - 2 }))
          .filter((c) => c.life > 0)
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
          const dy = 50 - e.clientY; // navbar height ~50px
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (!b.isBurst && dist < 60) {
            const bursts = Array.from({ length: 4 }).map(() => ({
              id: Date.now() + Math.random(),
              x: b.left * window.innerWidth / 100,
              y: 50,
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

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900/90 to-cyan-900/80 backdrop-blur-md shadow-lg overflow-hidden">
      {/* --- Fizzy Animations Behind Navbar --- */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-white/60"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            top: `50%`,
            opacity: b.opacity,
            animation: `bubbleFloat ${b.duration}s ease-in-out ${b.delay}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
      {cursorTrail.map((t) => (
        <div
          key={t.id}
          className="absolute rounded-full bg-white/80"
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
      {burstBubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.x}px`,
            top: `${b.y}px`,
            opacity: b.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* --- Navbar content --- */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Milk Soda
          </Link>
          <nav className="hidden md:flex gap-4 font-medium">
            <Link
              to="/products"
              className="text-white hover:text-cyan-300 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/chat"
              className="text-white hover:text-cyan-300 transition-colors"
            >
              Chats
            </Link>
            <Link
              to="/orders"
              className="text-white hover:text-cyan-300 transition-colors"
            >
              My Orders
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            id="navbar-cart-icon"
            to="/cart"
            className="relative flex items-center gap-1 text-white hover:text-cyan-300 transition-colors"
          >
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white font-bold rounded-full px-1.5 py-0.5 shadow animate-pulse">
              {cart.items?.length || 0}
            </span>
          </Link>

          {user ? (
            <>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/20 transition">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer"
                  onClick={() =>
                    document.getElementById("profileUploadInput")?.click()
                  }
                />
                <input
                  type="file"
                  id="profileUploadInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
                <span className="text-white font-semibold text-sm hidden sm:inline-block">
                  {user.name || user.email}
                </span>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
              >
                Logout
              </button>

              {(user.role === "admin" || user.role === "manager") && (
                <Link
                  to="/admin"
                  className="ml-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-white px-3 py-1 rounded-lg font-medium shadow transition-colors"
                >
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-white hover:text-cyan-300 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-cyan-500 hover:bg-cyan-400 text-white px-3 py-1 rounded-lg font-medium shadow transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* --- Animations --- */}
      <style>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-60px) scale(1.3); opacity: 0.25; }
          100% { transform: translateY(-120px) scale(1); opacity: 0; }
        }
      `}</style>
    </header>
  );
}
