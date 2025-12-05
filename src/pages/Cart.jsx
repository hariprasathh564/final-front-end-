// // src/pages/Cart.jsx
// import React, { useEffect, useState } from "react";
// import API from "../api/axiosClient";
// import { useSelector, useDispatch } from "react-redux";
// import { setCart } from "../store/cartSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext";

// export default function Cart() {
//   const reduxCart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, fetchProfile } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [sadCowIds, setSadCowIds] = useState([]);
//   const [confirmRemove, setConfirmRemove] = useState({ show: false, productId: null }); // Modal state

//   const formatImage = (img) =>
//     img ? (img.startsWith("http") ? img : `http://localhost:3000/uploads/${img}`) : "https://via.placeholder.com/150";

//   const token = localStorage.getItem("token");

//   const loadCart = async () => {
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await API.get("/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const formatted = {
//         items: data.items.map((i) => ({
//           _id: i.productId._id,
//           name: i.productId.name,
//           price: i.productId.price,
//           image: formatImage(i.productId.images?.[0]),
//           quantity: i.quantity,
//         })),
//         total: data.totalPrice,
//       };

//       dispatch(setCart(formatted));
//     } catch (err) {
//       console.error(err);
//       dispatch(setCart({ items: [], total: 0 }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       if (!user && token) {
//         try {
//           await fetchProfile();
//         } catch {
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           navigate("/login");
//           return;
//         }
//       } else if (!token) {
//         navigate("/login");
//         return;
//       }
//       await loadCart();
//     };
//     init();
//   }, [user, fetchProfile, navigate]);

//   const handleUpdate = async (productId, quantity) => {
//     try {
//       const { data } = await API.put(
//         "/cart/update",
//         { productId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const formatted = {
//         items: data.items.map((i) => ({
//           _id: i.productId._id,
//           name: i.productId.name,
//           price: i.productId.price,
//           image: formatImage(i.productId.images?.[0]),
//           quantity: i.quantity,
//         })),
//         total: data.totalPrice,
//       };

//       dispatch(setCart(formatted));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Show modal instead of default confirm
//   const requestRemove = (productId) => {
//     setConfirmRemove({ show: true, productId });
//   };

//   const handleRemoveConfirmed = async () => {
//     const productId = confirmRemove.productId;
//     setConfirmRemove({ show: false, productId: null });

//     // Show sad cow animation
//     setSadCowIds((prev) => [...prev, productId]);

//     setTimeout(() => {
//       setSadCowIds((prev) => prev.filter((id) => id !== productId));
//     }, 3000);

//     try {
//       const { data } = await API.delete(`/cart/remove/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const formatted = {
//         items: data.items.map((i) => ({
//           _id: i.productId._id,
//           name: i.productId.name,
//           price: i.productId.price,
//           image: formatImage(i.productId.images?.[0]),
//           quantity: i.quantity,
//         })),
//         total: data.totalPrice,
//       };

//       dispatch(setCart(formatted));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Stripe Checkout Handler (NEW)
//   const handleCheckout = async () => {
//     try {
//       if (!reduxCart.items?.length) return;

//       const res = await API.post(
//         "/payments",
//         { amount: reduxCart.total }, // total cart amount
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = res.data;

//       if (data.success && data.checkoutUrl) {
//         // Redirect to Stripe Checkout
//         window.location.href = data.checkoutUrl;
//       } else {
//         alert("Failed to create checkout session");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong while creating checkout session");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-10">
//         <h2 className="text-xl text-gray-500">Loading your cart...</h2>
//         <Link
//           to="/"
//           className="mt-4 inline-block text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4">
//       <h2 className="text-3xl font-bold mb-8 text-purple-700">Your Cart</h2>

//       {reduxCart.items?.length ? (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {reduxCart.items.map((item) => (
//             <AnimatePresence key={item._id}>
//               <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
//                 {sadCowIds.includes(item._id) ? (
//                   <motion.div
//                     className="bg-white-100 p-4 rounded-xl shadow flex justify-center items-center h-64"
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1, rotate: [0, -5, 5, -5, 5, 0] }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.8 }}
//                   >
//                     <motion.img
//                       src="https://t4.ftcdn.net/jpg/14/74/87/29/360_F_1474872915_Tquu4NA4ejb43FhlnBLjCJcsneXZM7pT.jpg"
//                       alt="Sad Cow"
//                       className="w-64 h-64"
//                       animate={{ y: [0, -10, 10, -10, 10, 0] }}
//                       transition={{ repeat: Infinity, duration: 0.8 }}
//                     />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition flex flex-col"
//                     whileHover={{ scale: 1.03 }}
//                   >
//                     <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
//                     <div className="flex-1 flex flex-col justify-between">
//                       <div>
//                         <h3 className="font-semibold text-lg text-purple-700 mb-1">{item.name}</h3>
//                         <p className="text-gray-600 mb-2">₹ {item.price}</p>
//                       </div>
//                       <div className="flex items-center justify-between mt-2">
//                         <input
//                           type="number"
//                           min="1"
//                           value={item.quantity}
//                           onChange={(e) => handleUpdate(item._id, Number(e.target.value))}
//                           className="w-20 p-2 border rounded-lg text-center focus:ring-2 focus:ring-purple-400"
//                         />
//                         <button
//                           onClick={() => requestRemove(item._id)}
//                           className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center mt-10">
//           <h2 className="text-2xl font-bold text-purple-700 mb-4">Your cart is empty</h2>
//         </div>
//       )}

//       {/* Subtotal & Checkout */}
//       {reduxCart.items?.length > 0 && (
//         <div className="mt-10 flex flex-col md:flex-row justify-between items-center bg-purple-50 p-6 rounded-xl shadow">
//           <div className="mb-4 md:mb-0">
//             <div className="text-gray-600 text-sm">Subtotal</div>
//             <motion.div
//               key={reduxCart.total}
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className="text-3xl font-bold text-purple-700"
//             >
//               ₹ {reduxCart.total?.toFixed(2) || 0}
//             </motion.div>
//           </div>
//           <button
//             onClick={handleCheckout} // ✅ Stripe checkout handler
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       )}

//       {/* Always show Continue Shopping */}
//       <div className="mt-6 text-center">
//         <Link
//           to="/products"
//           className="text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
//         >
//           Continue Shopping
//         </Link>
//       </div>

//       {/* ✅ Custom Remove Confirmation Modal */}
//       <AnimatePresence>
//         {confirmRemove.show && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//             >
//               <h2 className="text-xl font-bold mb-4 text-red-600">🛑 Remove Item?</h2>
//               <p className="mb-6 text-gray-700">would you like to miss this flavor?</p>
//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={() => setConfirmRemove({ show: false, productId: null })}
//                   className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleRemoveConfirmed}
//                   className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
//                 >
//                   Yes, Remove
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }







//last added//
// src/pages/Cart.jsx
import React, { useEffect, useState, useRef } from "react";
import API from "../api/axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform,
  LayoutGroup,
  useScroll
} from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { 
  FaTrash, FaArrowRight, FaShieldAlt, FaLock, FaMinus, FaPlus, FaCreditCard,
  FaTruck, FaStar
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

/* =========================================
   SCROLL PROGRESS INDICATOR
   ========================================= */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

/* =========================================
   FLOATING PARTICLES
   ========================================= */
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://lh5.googleusercontent.com/proxy/-Ql87aj4ncu7ftHATMlvlMCQGCQyZr2ImdORINowHys02yqFOUnrionntO31Eu5NLnyorcYSftKmRenFEBiNZ4ym7SWlDn38ls0hEK8zLf-wksgFn8o")` }}></div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* =========================================
   GRADIENT TEXT
   ========================================= */
const GradientText = ({ children, className = "" }) => (
  <span className={`bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

/* =========================================
   ANIMATED BADGE
   ========================================= */
const AnimatedBadge = ({ children, variant = "primary" }) => {
  const variants = {
    primary: "from-indigo-500 to-purple-500",
    success: "from-green-400 to-emerald-500",
    warning: "from-amber-400 to-orange-500",
    premium: "from-yellow-400 via-amber-500 to-yellow-600",
  };

  return (
    <motion.span
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${variants[variant]} shadow-lg`}
    >
      {children}
    </motion.span>
  );
};

/* =========================================
   MAGNETIC BUTTON
   ========================================= */
const MagneticButton = ({ children, onClick, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

/* =========================================
   3D TILT CARD
   ========================================= */
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

/* =========================================
   ITEM BADGE
   ========================================= */
const ItemBadge = ({ type }) => {
  const badges = {
    bestseller: { text: "Bestseller", color: "from-amber-400 to-orange-500", icon: <FaStar size={10} /> },
    new: { text: "New", color: "from-green-400 to-emerald-500", icon: <HiSparkles size={12} /> },
    limited: { text: "Limited", color: "from-purple-400 to-pink-500", icon: <HiLightningBolt size={12} /> },
  };

  const badge = badges[type] || badges.bestseller;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      className={`absolute -top-2 -left-2 px-2 py-1 rounded-lg bg-gradient-to-r ${badge.color} text-white text-xs font-bold flex items-center gap-1 shadow-lg z-10`}
    >
      {badge.icon}
      {badge.text}
    </motion.div>
  );
};

/* =========================================
   QUANTITY SELECTOR
   ========================================= */
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
  <motion.div
    className="flex items-center gap-1 bg-gradient-to-r from-slate-50 to-white rounded-2xl p-1 border border-slate-100"
    whileHover={{ scale: 1.02 }}
  >
    <motion.button
      onClick={onDecrease}
      whileHover={{ backgroundColor: "#EEF2FF" }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-indigo-600 transition-all"
    >
      <FaMinus size={10} />
    </motion.button>
    <motion.span
      key={quantity}
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="font-black w-8 text-center text-slate-700 text-lg"
    >
      {quantity}
    </motion.span>
    <motion.button
      onClick={onIncrease}
      whileHover={{ backgroundColor: "#EEF2FF" }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-indigo-600 transition-all"
    >
      <FaPlus size={10} />
    </motion.button>
  </motion.div>
);

/* =========================================
   TRUST BADGES
   ========================================= */
const TrustBadges = () => {
  const badges = [
    { icon: <FaShieldAlt />, label: "Secure" },
    { icon: <FaTruck />, label: "Fast Delivery" },
    { icon: <FaLock />, label: "Protected" },
  ];

  return (
    <div className="flex justify-center gap-6 mt-8">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5, scale: 1.05 }}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors cursor-default"
        >
          <motion.div
            className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-xl shadow-lg border border-white/50"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {badge.icon}
          </motion.div>
          <span className="text-xs font-bold">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* =========================================
   FLOATING NOTIFICATION
   ========================================= */
const FloatingNotification = ({ show, message }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <HiSparkles className="text-yellow-400" />
        </motion.div>
        <span className="font-medium">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

/* =========================================
   SKELETON LOADER
   ========================================= */
const SkeletonCart = () => (
  <div className="space-y-6 w-full max-w-7xl mx-auto pt-12 px-4">
    <div className="flex items-center gap-4 mb-8">
      <div className="h-16 w-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl animate-pulse" />
      <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse" />
    </div>
    <div className="grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-[2.5rem] animate-pulse"
          />
        ))}
      </div>
      <div className="lg:col-span-4 h-96 bg-gradient-to-br from-gray-100 to-gray-50 rounded-[2.5rem] animate-pulse" />
    </div>
  </div>
);

/* =========================================
   STAGGER ANIMATION VARIANTS
   ========================================= */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

/* =========================================
   MAIN CART COMPONENT
   ========================================= */
export default function Cart() {
  const reduxCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, fetchProfile } = useAuth();

  const [loading, setLoading] = useState(true);
  const [sadCowIds, setSadCowIds] = useState([]);
  const [confirmRemove, setConfirmRemove] = useState({ show: false, productId: null });
  const [notification, setNotification] = useState({ show: false, message: "" });

  const token = localStorage.getItem("token");

  const formatImage = (img) =>
    img
      ? img.startsWith("http")
        ? img
        : `http://localhost:3000/uploads/${img}`
      : "https://via.placeholder.com/150";

  // Show notification helper
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 2000);
  };

  // --- LOAD CART ---
  const loadCart = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formatted = {
        items: data.items.map((i) => ({
          _id: i.productId._id,
          name: i.productId.name,
          price: i.productId.price,
          image: formatImage(i.productId.images?.[0]),
          quantity: i.quantity,
        })),
        total: data.totalPrice,
      };
      dispatch(setCart(formatted));
    } catch (err) {
      console.error(err);
      dispatch(setCart({ items: [], total: 0 }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!user && token) {
        try {
          await fetchProfile();
        } catch {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
      } else if (!token) {
        navigate("/login");
        return;
      }
      await loadCart();
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- HANDLERS ---
  const handleUpdate = async (productId, quantity) => {
    try {
      const { data } = await API.put(
        "/cart/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const formatted = {
        items: data.items.map((i) => ({
          _id: i.productId._id,
          name: i.productId.name,
          price: i.productId.price,
          image: formatImage(i.productId.images?.[0]),
          quantity: i.quantity,
        })),
        total: data.totalPrice,
      };
      dispatch(setCart(formatted));
      showNotification("Cart updated! ✨");
    } catch (err) {
      console.error(err);
    }
  };

  const requestRemove = (productId) => {
    setConfirmRemove({ show: true, productId });
  };

  const handleRemoveConfirmed = async () => {
    const productId = confirmRemove.productId;
    setConfirmRemove({ show: false, productId: null });

    setSadCowIds((prev) => [...prev, productId]);

    setTimeout(async () => {
      try {
        const { data } = await API.delete(`/cart/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formatted = {
          items: data.items.map((i) => ({
            _id: i.productId._id,
            name: i.productId.name,
            price: i.productId.price,
            image: formatImage(i.productId.images?.[0]),
            quantity: i.quantity,
          })),
          total: data.totalPrice,
        };
        dispatch(setCart(formatted));
        setSadCowIds((prev) => prev.filter((id) => id !== productId));
        showNotification("Item removed 🥺");
      } catch (err) {
        console.error(err);
      }
    }, 2500);
  };

  const handleCheckout = async () => {
    try {
      if (!reduxCart.items?.length) return;

      const res = await API.post(
        "/payments",
        { amount: reduxCart.total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success && res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        alert("Failed to init Stripe.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- CALCULATE FREE SHIPPING ---
  const freeShippingThreshold = 500;
  const progress = Math.min((reduxCart.total / freeShippingThreshold) * 100, 100);

  if (loading) return <SkeletonCart />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-900">
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Floating Notification */}
      <FloatingNotification show={notification.show} message={notification.message} />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* BACKGROUND ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32 relative z-10">
        {/* HEADER & PROGRESS BAR */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 mb-4"
              >
                <AnimatedBadge variant="premium">
                  <HiSparkles className="mr-1" /> Premium Collection
                </AnimatedBadge>
                <AnimatedBadge variant="success">
                  <FaTruck className="mr-1" /> Fast Shipping
                </AnimatedBadge>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2">
                <span className="text-slate-900">Your </span>
                <GradientText>Bag.</GradientText>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 font-medium text-lg flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                Secure your flavors before they vanish.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 md:mt-0"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50">
                <p className="text-sm font-bold text-indigo-600 mb-3 flex items-center gap-2">
                  {progress === 100 ? (
                    <>
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        🎉
                      </motion.span>
                      You've unlocked Free Shipping!
                    </>
                  ) : (
                    <>
                      <FaTruck className="text-indigo-400" />
                      Add ₹{(freeShippingThreshold - reduxCart.total).toFixed(0)} for Free
                      Shipping
                    </>
                  )}
                </p>
                <div className="w-56 h-3 bg-gray-100 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                  />
                  {progress === 100 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 -top-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {reduxCart.items?.length ? (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* --- LEFT: ITEM LIST --- */}
            <motion.div
              className="lg:col-span-8 space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <LayoutGroup>
                <AnimatePresence mode="popLayout">
                  {reduxCart.items.map((item, index) => {
                    const isSad = sadCowIds.includes(item._id);

                    return (
                      <motion.div
                        layout
                        key={item._id}
                        variants={staggerItem}
                        exit={{ opacity: 0, scale: 0.9, x: -100, transition: { duration: 0.4 } }}
                        className="relative"
                      >
                        <AnimatePresence mode="wait">
                          {isSad ? (
                            // === SAD COW MODE ===
                            <motion.div
                              key="sad"
                              initial={{ opacity: 0, height: 0, scale: 0.8 }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                                scale: 1,
                                transition: { duration: 0.4 },
                              }}
                              exit={{ opacity: 0, height: 0, scale: 0.8 }}
                              className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden"
                            >
                              <motion.div
                                animate={{
                                  rotate: [0, -10, 10, -10, 0],
                                  y: [0, -10, 0],
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="text-8xl mb-4 relative"
                              >
                                🐮
                                <motion.div
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="absolute -top-2 -right-2 text-2xl"
                                >
                                  💧
                                </motion.div>
                              </motion.div>
                              <h3 className="text-2xl font-black text-red-400">Don't go!</h3>
                              <p className="text-red-300 font-medium text-sm mt-2">
                                Removing item from your stash...
                              </p>

                              {/* Progress bar */}
                              <div className="w-32 h-1 bg-red-100 rounded-full mt-4 overflow-hidden">
                                <motion.div
                                  className="h-full bg-red-400"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 2.5 }}
                                />
                              </div>
                            </motion.div>
                          ) : (
                            // === NORMAL CARD ===
                            <motion.div key="normal" className="group">
                              <TiltCard className="relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] p-4 pr-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white/60 hover:border-indigo-200 hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.2)] transition-all duration-500 flex flex-col sm:flex-row gap-6 items-center overflow-hidden">
                                {/* Badge */}
                                {index === 0 && <ItemBadge type="bestseller" />}
                                {index === 1 && <ItemBadge type="new" />}
                                {index === 2 && <ItemBadge type="limited" />}

                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Image */}
                                <motion.div
                                  className="relative w-32 h-32 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] flex-shrink-0 overflow-hidden flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <motion.img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-contain drop-shadow-lg relative z-10"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                  />

                                  {/* Shine effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </motion.div>

                                {/* Info */}
                                <div className="flex-1 w-full text-center sm:text-left relative z-10">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <motion.h3
                                        className="text-xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors"
                                        whileHover={{ x: 5 }}
                                      >
                                        {item.name}
                                      </motion.h3>
                                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <motion.span
                                          animate={{ opacity: [0.5, 1, 0.5] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                        >
                                          ✦
                                        </motion.span>
                                        Premium Batch
                                      </p>
                                    </div>
                                    <motion.p
                                      className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                                      key={item.price * item.quantity}
                                      initial={{ scale: 1.2, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                    >
                                      ₹{(item.price * item.quantity).toFixed(2)}
                                    </motion.p>
                                  </div>

                                  <div className="flex items-center justify-between sm:justify-start gap-6">
                                    {/* Quantity Control */}
                                    <QuantitySelector
                                      quantity={item.quantity}
                                      onDecrease={() =>
                                        handleUpdate(item._id, Math.max(1, item.quantity - 1))
                                      }
                                      onIncrease={() => handleUpdate(item._id, item.quantity + 1)}
                                    />

                                    {/* Remove Button */}
                                    <motion.button
                                      onClick={() => requestRemove(item._id)}
                                      whileHover={{ scale: 1.1, rotate: 10 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 hover:text-red-500 hover:border-red-200 transition-all shadow-sm hover:shadow-lg"
                                    >
                                      <FaTrash size={14} />
                                    </motion.button>
                                  </div>
                                </div>
                              </TiltCard>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </LayoutGroup>

              {/* Trust Badges */}
              <TrustBadges />
            </motion.div>

            {/* --- RIGHT: SUMMARY (STICKY GLASS) --- */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-8">
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="bg-white/80 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-white/60 relative overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-pink-50/50 pointer-events-none"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Floating decoration */}
                  <motion.div
                    className="absolute top-4 right-4 text-4xl opacity-20 pointer-events-none"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    ✦
                  </motion.div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                      <GradientText>Summary</GradientText>
                      <motion.span
                        className="text-xs bg-gradient-to-r from-slate-900 to-slate-700 text-white px-3 py-1.5 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                      >
                        {reduxCart.items.length} Items
                      </motion.span>
                    </h3>

                    <motion.div
                      className="space-y-4 mb-8 text-sm font-bold text-slate-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        className="flex justify-between items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <span className="flex items-center gap-2">📦 Subtotal</span>
                        <span className="text-slate-900 font-black text-lg">
                          ₹{reduxCart.total?.toFixed(2)}
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <span className="flex items-center gap-2">
                          <FaTruck className="text-indigo-400" />
                          Shipping
                        </span>
                        <motion.span
                          className={`font-black ${
                            progress === 100 ? "text-green-500" : "text-slate-400"
                          }`}
                          animate={progress === 100 ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {progress === 100 ? "✨ Free" : "At checkout"}
                        </motion.span>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl shadow-xl relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-pink-600/20 pointer-events-none"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          <HiSparkles className="text-yellow-400" />
                          Total
                        </span>
                        <motion.span
                          className="text-xl font-black relative z-10"
                          key={reduxCart.total}
                          initial={{ scale: 1.3, color: "#A5B4FC" }}
                          animate={{ scale: 1, color: "#FFFFFF" }}
                          transition={{ duration: 0.3 }}
                        >
                          ₹{reduxCart.total?.toFixed(2)}
                        </motion.span>
                      </motion.div>
                    </motion.div>

                    {/* Promo code input */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-6"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all text-sm font-medium"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm transition-colors"
                        >
                          Apply
                        </motion.button>
                      </div>
                    </motion.div>

                    <MagneticButton
                      onClick={handleCheckout}
                      className="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-black text-lg shadow-xl shadow-indigo-300/50 hover:shadow-indigo-400/50 transition-all flex items-center justify-center gap-3 overflow-hidden relative group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <HiSparkles className="text-yellow-300" />
                        Checkout
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <FaArrowRight />
                        </motion.span>
                      </span>

                      {/* Animated gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    </MagneticButton>

                    <motion.div
                      className="mt-8 flex justify-center gap-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[FaCreditCard, FaShieldAlt, FaLock].map((Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          whileHover={{ y: -5, scale: 1.1 }}
                          className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-indigo-500 shadow-sm hover:shadow-lg transition-all cursor-default border border-white/50"
                        >
                          <Icon size={20} />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.p
                      className="text-center text-xs text-slate-400 font-bold mt-4 uppercase tracking-widest flex items-center justify-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        🔐
                      </motion.span>
                      Encrypted Transaction
                    </motion.p>
                  </div>
                </motion.div>

                {/* Gift suggestion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 flex items-center gap-4"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl"
                  >
                    🎁
                  </motion.div>
                  <div>
                    <p className="font-bold text-amber-800 text-sm">Add a gift message?</p>
                    <p className="text-amber-600 text-xs">Make it special for someone!</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          // EMPTY STATE
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-center py-32 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-xl border border-white/60 max-w-2xl mx-auto relative overflow-hidden"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-pink-50/50 pointer-events-none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Floating elements */}
            <motion.div
              className="absolute top-10 left-10 text-4xl opacity-20 pointer-events-none"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🛒
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-10 text-4xl opacity-20 pointer-events-none"
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ✨
            </motion.div>

            <div className="relative z-10">
              <motion.div
                className="text-9xl mb-8 inline-block"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🛒
              </motion.div>

              <motion.h2
                className="text-4xl font-black text-slate-900 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your Cart is <GradientText>Empty.</GradientText>
              </motion.h2>

              <motion.p
                className="text-slate-500 font-medium mb-10 max-w-md mx-auto text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your flavor journey hasn't started yet. Add some magic to your life.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/products">
                  <MagneticButton className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-300/50 hover:shadow-indigo-400/60 transition-all group">
                    <HiSparkles className="text-yellow-300" />
                    Browse Flavors
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <FaArrowRight />
                    </motion.span>
                  </MagneticButton>
                </Link>
              </motion.div>

              {/* Suggestions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex justify-center gap-8 flex-wrap"
              >
                {["🍦 Ice Cream", "🧁 Cupcakes", "🍰 Cakes"].map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-4 py-2 bg-white rounded-xl shadow-sm text-slate-500 font-medium text-sm cursor-pointer hover:shadow-md transition-all"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {confirmRemove.show && (
          <motion.div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmRemove({ show: false, productId: null })}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl max-w-sm w-full text-center border border-white/50 m-4 relative overflow-hidden"
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-400 via-pink-500 to-red-400"
                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ backgroundSize: "200% 100%" }}
              />

              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner border border-red-100 relative"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🥺
                </motion.span>
              </motion.div>

              <motion.h2
                className="text-3xl font-black text-slate-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Are you <GradientText>sure?</GradientText>
              </motion.h2>

              <motion.p
                className="text-slate-500 font-medium mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Removing this item will make the cow sad. Do you really want to do this?
              </motion.p>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setConfirmRemove({ show: false, productId: null })}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-4 rounded-2xl font-bold text-slate-600 border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm hover:shadow-md"
                >
                  Keep it 💚
                </motion.button>
                <motion.button
                  onClick={handleRemoveConfirmed}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-4 rounded-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-xl shadow-red-200 hover:shadow-red-300 transition-all relative overflow-hidden"
                >
                  <span className="relative z-10">Remove 😢</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}