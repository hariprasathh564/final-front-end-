// // src/pages/ProductDetail.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axiosClient"; 
// import { useDispatch } from "react-redux";
// import { addItem } from "../store/cartSlice"; 
// import { 
//   motion, 
//   AnimatePresence, 
//   useSpring, 
//   useMotionValue 
// } from "framer-motion";
// import { 
//   FaShoppingCart, FaStar, FaArrowLeft, FaBolt, FaLeaf, 
//   FaBoxOpen, FaCheckCircle, FaPlus, FaMinus, FaHeart, 
//   FaChevronDown, FaChevronUp, FaQuoteLeft, FaShieldAlt, FaTruck
// } from "react-icons/fa";

// /* =========================================
//    1. COMPONENT: MAGNETIC BUTTON
//    ========================================= */
// const MagneticButton = ({ children, onClick, className }) => {
//   const ref = useRef(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
//   const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;
//     const { left, top, width, height } = ref.current.getBoundingClientRect();
//     x.set((clientX - (left + width / 2)) * 0.3);
//     y.set((clientY - (top + height / 2)) * 0.3);
//   };

//   return (
//     <motion.button
//       ref={ref}
//       onClick={onClick}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => { x.set(0); y.set(0); }}
//       style={{ x: mouseX, y: mouseY }}
//       whileTap={{ scale: 0.95 }}
//       className={className}
//     >
//       {children}
//     </motion.button>
//   );
// };

// /* =========================================
//    2. COMPONENT: ACCORDION ITEM
//    ========================================= */
// const AccordionItem = ({ title, isOpen, onClick, children }) => {
//   return (
//     <div className="border-b border-slate-100 last:border-0">
//       <button 
//         onClick={onClick} 
//         className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
//       >
//         <span className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</span>
//         {isOpen ? <FaChevronUp className="text-indigo-600" /> : <FaChevronDown className="text-slate-300 group-hover:text-indigo-600" />}
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="overflow-hidden"
//           >
//             <div className="pb-5 text-slate-600 leading-relaxed text-sm">
//               {children}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// /* =========================================
//    3. COMPONENT: MARQUEE
//    ========================================= */
// const Marquee = () => (
//   <div className="w-full bg-indigo-600 overflow-hidden py-3 relative z-20 flex-shrink-0">
//     <motion.div
//       className="flex whitespace-nowrap text-white font-bold text-sm uppercase tracking-widest"
//       animate={{ x: [0, -1000] }}
//       transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
//     >
//       {[...Array(10)].map((_, i) => (
//         <div key={i} className="flex items-center mx-8">
//           <span>Fresh Farm Milk</span>
//           <span className="mx-4 text-pink-300">✦</span>
//           <span>Real Fruit Soda</span>
//           <span className="mx-4 text-pink-300">✦</span>
//         </div>
//       ))}
//     </motion.div>
//   </div>
// );

// /* =========================================
//    MAIN PAGE COMPONENT
//    ========================================= */
// export default function ProductDetail() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // --- STATE ---
//   const [product, setProduct] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [selectedFlavor, setSelectedFlavor] = useState(null);
//   const [showToast, setShowToast] = useState(false);
//   const [flyingImage, setFlyingImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [openAccordion, setOpenAccordion] = useState("nutrition");
  
//   // --- REFS ---
//   const imgRef = useRef(null);
//   const cartRef = useRef(null);

//   // --- FETCH DATA ---
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await API.get(`/products/${id}`);
//         if (res.data) {
//           setProduct(res.data);
//           setSelectedFlavor(res.data.flavors?.[0] || null);
//         } else {
//           throw new Error("No data");
//         }
//       } catch (err) {
//         console.warn("Using Mock Data");
//         const mockProduct = {
//           _id: id || "123",
//           name: "Creamy Strawberry Fizz",
//           price: 250,
//           description: "A dreamy blend of fresh farm milk and sparkling strawberry soda. Sweet, creamy, and unexpectedly refreshing. Crafted with organic ingredients sourced directly from local dairy farms.",
//           category: "Milk Soda",
//           rating: 4.8,
//           reviews: 128,
//           images: ["https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"],
//           flavors: [
//              { name: "Sweet Strawberry", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" },
//              { name: "Classic Vanilla", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80" }
//           ]
//         };
//         setProduct(mockProduct);
//         setSelectedFlavor(mockProduct.flavors[0]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     const cartEl = document.getElementById("navbar-cart-icon") || document.querySelector(".fa-shopping-cart");
//     if (cartEl) cartRef.current = cartEl;
//   }, [loading]);

//   const handleAdd = () => {
//     if (!product) return;
//     dispatch(addItem({
//       _id: product._id,
//       name: product.name,
//       price: product.price,
//       image: selectedFlavor?.image || product.images?.[0],
//       quantity: qty,
//       flavor: selectedFlavor?.name,
//     }));

//     if (imgRef.current) {
//       const imgRect = imgRef.current.getBoundingClientRect();
//       const cartRect = cartRef.current 
//         ? cartRef.current.getBoundingClientRect() 
//         : { left: window.innerWidth - 50, top: 20, width: 20, height: 20 };

//       setFlyingImage({
//         src: selectedFlavor?.image || product.images?.[0],
//         start: { x: imgRect.left, y: imgRect.top, width: imgRect.width, height: imgRect.height },
//         end: { x: cartRect.left, y: cartRect.top, width: 40, height: 40 },
//         id: Date.now(),
//       });
//     }
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 2500);
//   };

//   if (loading || !product) return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-indigo-600 font-bold text-xl animate-pulse">
//       Mixing Ingredients...
//     </div>
//   );

//   return (
//     // H-SCREEN AND OVERFLOW HIDDEN PREVENTS WINDOW SCROLL
//     <div className="h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden selection:bg-pink-300 selection:text-pink-900 flex flex-col lg:flex-row">
      
//       {/* FLYING ANIMATION LAYER */}
//       {flyingImage && (
//         <motion.img
//           key={flyingImage.id} src={flyingImage.src}
//           className="fixed z-[9999] rounded-full border-4 border-white shadow-2xl pointer-events-none object-cover"
//           initial={{ x: flyingImage.start.x, y: flyingImage.start.y, width: flyingImage.start.width, height: flyingImage.start.height, opacity: 1 }}
//           animate={{ x: flyingImage.end.x, y: flyingImage.end.y, width: 40, height: 40, opacity: 0.5, scale: 0.5 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           onAnimationComplete={() => setFlyingImage(null)}
//         />
//       )}

//       {/* SUCCESS TOAST */}
//       <AnimatePresence>
//         {showToast && (
//            <motion.div 
//              initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
//              className="fixed top-4 right-4 md:right-10 z-[100]"
//            >
//              <div className="bg-white/90 backdrop-blur-md text-slate-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-100">
//                 <div className="bg-green-100 text-green-600 p-2 rounded-full"><FaCheckCircle /></div>
//                 <div>
//                     <p className="font-bold text-sm">Added to Bag!</p>
//                     <p className="text-xs text-slate-500">Excellent choice.</p>
//                 </div>
//              </div>
//            </motion.div>
//         )}
//       </AnimatePresence>

//       {/* === LEFT PANEL: FIXED SHOWCASE === */}
//       {/* This side takes up 50% width and 100% height. It has no scrollbar. */}
//       <div className="lg:w-1/2 h-[40vh] lg:h-full relative bg-[#F1F5F9] overflow-hidden flex items-center justify-center">
            
//             {/* 1. Back Button */}
//             <button onClick={() => navigate(-1)} className="absolute top-8 left-8 z-20 group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-bold text-sm bg-white/60 backdrop-blur px-4 py-2 rounded-full shadow-sm">
//                 <FaArrowLeft /> Back
//             </button>

//             {/* 2. Animated Background Elements */}
//             <motion.div 
//                animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//                className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/40 to-indigo-200/40 rounded-[40%] blur-3xl"
//             />
            
//             {/* Floating Ingredients (Decor) */}
//             <motion.div 
//                animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} 
//                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                className="absolute top-[20%] left-[15%] text-5xl z-0 opacity-60 drop-shadow-sm"
//             >
//                🍓
//             </motion.div>
//             <motion.div 
//                animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }} 
//                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//                className="absolute bottom-[20%] right-[15%] text-4xl z-0 opacity-60 drop-shadow-sm"
//             >
//                🫧
//             </motion.div>

//             {/* 3. Levitating Product Image */}
//             <div className="relative z-10 w-[65%] aspect-square flex items-center justify-center">
//                 {/* The Image itself floats up and down */}
//                 <motion.img 
//                    ref={imgRef}
//                    key={selectedFlavor ? selectedFlavor.name : "main"}
//                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
//                    animate={{ 
//                        scale: 1, 
//                        opacity: 1, 
//                        y: [0, -20, 0] // Levitation Effect
//                    }}
//                    transition={{ 
//                        scale: { duration: 0.8, type: "spring" },
//                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
//                    }}
//                    src={selectedFlavor?.image || product.images?.[0]} 
//                    alt={product.name}
//                    className="w-full h-full object-contain drop-shadow-2xl z-10"
//                 />
                
//                 {/* Dynamic Shadow underneath */}
//                 <motion.div 
//                    animate={{ scale: [1, 0.8, 1], opacity: [0.2, 0.1, 0.2] }}
//                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-black rounded-[100%] blur-xl"
//                 />
//             </div>
//       </div>

//       {/* === RIGHT PANEL: SCROLLABLE CONTENT === */}
//       {/* This side has overflow-y-auto, allowing scrolling independently */}
//       <div className="lg:w-1/2 h-auto lg:h-full bg-white/80 backdrop-blur-md relative flex flex-col overflow-y-auto no-scrollbar">
         
//          {/* Sticky Marquee at top of scrolling area */}
//          <div className="sticky top-0 z-30">
//              <Marquee />
//          </div>
            
//          <div className="p-8 md:p-12 lg:p-16 flex flex-col gap-10">
                
//             {/* Header */}
//             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
//                 <div className="flex items-center justify-between mb-6">
//                     <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100">
//                         {product.category}
//                     </span>
//                     <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-pink-50 hover:text-pink-500 flex items-center justify-center transition text-slate-400"><FaHeart/></button>
//                 </div>
                
//                 <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.95] tracking-tight mb-6">
//                     {product.name}
//                 </h1>

//                 <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
//                     <div className="flex text-yellow-400 gap-1"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
//                     <span>{product.rating} Rating</span>
//                     <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
//                     <span>{product.reviews} Reviews</span>
//                 </div>
//             </motion.div>

//             {/* Price & Action Card */}
//             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
//                 <div className="flex justify-between items-center mb-8">
//                         <div>
//                             <p className="text-xs font-bold uppercase text-slate-400 mb-1">Total Price</p>
//                             <div className="text-4xl font-black text-slate-900 flex items-baseline">
//                                 <span className="text-2xl mr-1">₹</span>{product.price * qty}
//                             </div>
//                         </div>
//                         <div className="flex items-center bg-white rounded-full p-2 shadow-sm border border-slate-100">
//                             <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"><FaMinus size={10}/></button>
//                             <span className="w-12 text-center font-black text-lg">{qty}</span>
//                             <button onClick={() => setQty(qty+1)} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"><FaPlus size={10}/></button>
//                         </div>
//                 </div>

//                 <MagneticButton 
//                     onClick={handleAdd}
//                     className="w-full h-16 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-600 transition-colors flex items-center justify-center gap-3 overflow-hidden relative group"
//                 >
//                     <span className="relative z-10 flex items-center gap-2">Add To Cart <FaShoppingCart/></span>
//                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
//                 </MagneticButton>
//             </motion.div>

//             {/* Description */}
//             <div className="space-y-4">
//                 <h3 className="text-xl font-black">Description</h3>
//                 <p className="text-slate-600 text-lg leading-relaxed">
//                     {product.description}
//                 </p>
//             </div>

//             {/* Flavors (Pills) */}
//             {product.flavors && product.flavors.length > 0 && (
//                 <div>
//                     <h3 className="text-xl font-black mb-4">Choose Flavor</h3>
//                     <div className="flex flex-wrap gap-3">
//                         {product.flavors.map(flavor => (
//                             <button 
//                                 key={flavor.name}
//                                 onClick={() => setSelectedFlavor(flavor)}
//                                 className={`px-6 py-3 rounded-xl font-bold border-2 transition-all duration-300
//                                 ${selectedFlavor?.name === flavor.name 
//                                     ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm scale-105" 
//                                     : "border-slate-100 bg-white text-slate-500 hover:border-slate-300"}`}
//                             >
//                                 {flavor.name}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Visual Ingredients */}
//             <div>
//                 <h3 className="text-xl font-black mb-4">Pure Ingredients</h3>
//                 <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
//                     {[
//                         { name: "Fresh Milk", emoji: "🥛", bg: "bg-blue-50 text-blue-500" },
//                         { name: "Real Fruit", emoji: "🍓", bg: "bg-pink-50 text-pink-500" },
//                         { name: "Cane Sugar", emoji: "🎋", bg: "bg-green-50 text-green-500" },
//                         { name: "Sparkle", emoji: "✨", bg: "bg-yellow-50 text-yellow-500" },
//                     ].map((ing, i) => (
//                         <div key={i} className={`flex-shrink-0 w-24 h-28 rounded-2xl border border-slate-50 flex flex-col items-center justify-center gap-2 ${ing.bg}`}>
//                             <div className="text-3xl">{ing.emoji}</div>
//                             <span className="text-xs font-bold text-center leading-tight px-2">{ing.name}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* ACCORDION (FAQ & Info) */}
//             <div className="border-t border-slate-100 pt-4">
//                 <AccordionItem 
//                     title="Nutritional Facts" 
//                     isOpen={openAccordion === "nutrition"} 
//                     onClick={() => setOpenAccordion(openAccordion === "nutrition" ? "" : "nutrition")}
//                 >
//                     <div className="grid grid-cols-2 gap-y-2">
//                         <div className="flex justify-between border-b border-slate-50 pb-1"><span>Calories</span> <span className="font-bold">140</span></div>
//                         <div className="flex justify-between border-b border-slate-50 pb-1"><span>Sugar</span> <span className="font-bold">12g</span></div>
//                         <div className="flex justify-between border-b border-slate-50 pb-1"><span>Protein</span> <span className="font-bold">8g</span></div>
//                         <div className="flex justify-between border-b border-slate-50 pb-1"><span>Fat</span> <span className="font-bold">4g</span></div>
//                     </div>
//                 </AccordionItem>

//                 <AccordionItem 
//                     title="Shipping & Returns" 
//                     isOpen={openAccordion === "shipping"} 
//                     onClick={() => setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")}
//                 >
//                     <p>Free shipping on orders over ₹500. We accept returns within 30 days if the bottle is unopened.</p>
//                 </AccordionItem>
//             </div>

//             {/* CUSTOMER LOVE */}
//             <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-indigo-200">
//                 <FaQuoteLeft className="absolute top-4 left-4 text-white/20 text-4xl" />
//                 <div className="relative z-10">
//                     <p className="text-lg font-medium italic mb-4">"Hands down the best drink I've had this year. The texture is creamy yet so refreshing. Highly recommend!"</p>
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">JD</div>
//                         <div>
//                             <p className="font-bold text-sm">Jane Doe</p>
//                             <div className="flex text-yellow-400 text-xs"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
//             </div>

//             {/* PAIRING */}
//             <div>
//                 <h3 className="text-xl font-black mb-4">Pairs Well With</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                     {[1, 2].map((_, i) => (
//                         <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:shadow-md transition cursor-pointer group">
//                             <div className="w-12 h-12 bg-slate-100 rounded-lg group-hover:scale-110 transition"></div>
//                             <div>
//                                 <p className="font-bold text-sm">Butter Cookies</p>
//                                 <p className="text-xs text-indigo-500 font-bold">₹50</p>
//                             </div>
//                             <button className="ml-auto w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs shadow-lg"><FaPlus/></button>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="h-20"></div>
//          </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }





// src/pages/ProductDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axiosClient"; 
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice"; 
import { 
  motion, 
  AnimatePresence, 
  useSpring, 
  useMotionValue 
} from "framer-motion";
import { 
  FaShoppingCart, FaStar, FaArrowLeft, FaCheckCircle, FaPlus, FaMinus, FaHeart, 
  FaChevronDown, FaChevronUp, FaQuoteLeft
} from "react-icons/fa";

/* =========================================
   1. COMPONENT: MAGNETIC BUTTON
   ========================================= */
const MagneticButton = ({ children, onClick, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: mouseX, y: mouseY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

/* =========================================
   2. COMPONENT: ACCORDION ITEM
   ========================================= */
const AccordionItem = ({ title, isOpen, onClick, children }) => {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={onClick} 
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</span>
        {isOpen ? <FaChevronUp className="text-indigo-600" /> : <FaChevronDown className="text-slate-300 group-hover:text-indigo-600" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-slate-600 leading-relaxed text-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================
   3. COMPONENT: MARQUEE
   ========================================= */
const Marquee = () => (
  <div className="w-full bg-indigo-600 overflow-hidden py-3 relative z-20 flex-shrink-0">
    <motion.div
      className="flex whitespace-nowrap text-white font-bold text-sm uppercase tracking-widest"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
    >
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center mx-8">
          <span>Fresh Farm Milk</span>
          <span className="mx-4 text-pink-300">✦</span>
          <span>Real Fruit Soda</span>
          <span className="mx-4 text-pink-300">✦</span>
        </div>
      ))}
    </motion.div>
  </div>
);

/* =========================================
   MAIN PAGE COMPONENT
   ========================================= */
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // --- STATE ---
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [flyingImage, setFlyingImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false); // New loading state for button
  const [openAccordion, setOpenAccordion] = useState("nutrition");
  
  // --- REFS ---
  const imgRef = useRef(null);
  const cartRef = useRef(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/${id}`);
        if (res.data) {
          setProduct(res.data);
          setSelectedFlavor(res.data.flavors?.[0] || null);
        } else {
          throw new Error("No data");
        }
      } catch (err) {
        console.warn("Using Mock Data");
        // Fallback for demo if API fails
        const mockProduct = {
          _id: id || "123",
          name: "Creamy Strawberry Fizz",
          price: 250,
          description: "A dreamy blend of fresh farm milk and sparkling strawberry soda.",
          category: "Milk Soda",
          rating: 4.8,
          reviews: 128,
          images: ["https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"],
          flavors: [
             { name: "Sweet Strawberry", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" },
             { name: "Classic Vanilla", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80" }
          ]
        };
        setProduct(mockProduct);
        setSelectedFlavor(mockProduct.flavors[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const cartEl = document.getElementById("navbar-cart-icon") || document.querySelector(".fa-shopping-cart");
    if (cartEl) cartRef.current = cartEl;
  }, [loading]);

  // --- FIXED HANDLE ADD FUNCTION ---
  const handleAdd = async () => {
    if (!product) return;

    // 1. Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setAddingToCart(true);

    try {
      // 2. Send Data to Backend Database
      await API.post("/cart/add", {
        productId: product._id,
        quantity: qty,
        // Include flavor if your backend model supports options
        // options: { flavor: selectedFlavor?.name } 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 3. Update Redux (Optimistic UI update)
      dispatch(addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: selectedFlavor?.image || product.images?.[0],
        quantity: qty,
        flavor: selectedFlavor?.name,
      }));

      // 4. Trigger Animations
      if (imgRef.current) {
        const imgRect = imgRef.current.getBoundingClientRect();
        const cartRect = cartRef.current 
          ? cartRef.current.getBoundingClientRect() 
          : { left: window.innerWidth - 50, top: 20, width: 20, height: 20 };

        setFlyingImage({
          src: selectedFlavor?.image || product.images?.[0],
          start: { x: imgRect.left, y: imgRect.top, width: imgRect.width, height: imgRect.height },
          end: { x: cartRect.left, y: cartRect.top, width: 40, height: 40 },
          id: Date.now(),
        });
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);

    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Could not save to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading || !product) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-indigo-600 font-bold text-xl animate-pulse">
      Mixing Ingredients...
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden selection:bg-pink-300 selection:text-pink-900 flex flex-col lg:flex-row">
      
      {/* FLYING ANIMATION LAYER */}
      {flyingImage && (
        <motion.img
          key={flyingImage.id} src={flyingImage.src}
          className="fixed z-[9999] rounded-full border-4 border-white shadow-2xl pointer-events-none object-cover"
          initial={{ x: flyingImage.start.x, y: flyingImage.start.y, width: flyingImage.start.width, height: flyingImage.start.height, opacity: 1 }}
          animate={{ x: flyingImage.end.x, y: flyingImage.end.y, width: 40, height: 40, opacity: 0.5, scale: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setFlyingImage(null)}
        />
      )}

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {showToast && (
           <motion.div 
             initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
             className="fixed top-4 right-4 md:right-10 z-[100]"
           >
             <div className="bg-white/90 backdrop-blur-md text-slate-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-100">
                <div className="bg-green-100 text-green-600 p-2 rounded-full"><FaCheckCircle /></div>
                <div>
                    <p className="font-bold text-sm">Added to Bag!</p>
                    <p className="text-xs text-slate-500">Excellent choice.</p>
                </div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* === LEFT PANEL: FIXED SHOWCASE === */}
      <div className="lg:w-1/2 h-[40vh] lg:h-full relative bg-[#F1F5F9] overflow-hidden flex items-center justify-center">
            
            <button onClick={() => navigate(-1)} className="absolute top-8 left-8 z-20 group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-bold text-sm bg-white/60 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                <FaArrowLeft /> Back
            </button>

            <motion.div 
               animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/40 to-indigo-200/40 rounded-[40%] blur-3xl"
            />
            
            <motion.div 
               animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[20%] left-[15%] text-5xl z-0 opacity-60 drop-shadow-sm"
            >
               🍓
            </motion.div>
            <motion.div 
               animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-[20%] right-[15%] text-4xl z-0 opacity-60 drop-shadow-sm"
            >
               🫧
            </motion.div>

            <div className="relative z-10 w-[65%] aspect-square flex items-center justify-center">
                <motion.img 
                   ref={imgRef}
                   key={selectedFlavor ? selectedFlavor.name : "main"}
                   initial={{ scale: 0.8, opacity: 0, y: 50 }}
                   animate={{ 
                       scale: 1, 
                       opacity: 1, 
                       y: [0, -20, 0]
                   }}
                   transition={{ 
                       scale: { duration: 0.8, type: "spring" },
                       y: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
                   }}
                   src={selectedFlavor?.image || product.images?.[0]} 
                   alt={product.name}
                   className="w-full h-full object-contain drop-shadow-2xl z-10"
                />
                
                <motion.div 
                   animate={{ scale: [1, 0.8, 1], opacity: [0.2, 0.1, 0.2] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-black rounded-[100%] blur-xl"
                />
            </div>
      </div>

      {/* === RIGHT PANEL: SCROLLABLE CONTENT === */}
      <div className="lg:w-1/2 h-auto lg:h-full bg-white/80 backdrop-blur-md relative flex flex-col overflow-y-auto no-scrollbar">
         
         <div className="sticky top-0 z-30">
             <Marquee />
         </div>
            
         <div className="p-8 md:p-12 lg:p-16 flex flex-col gap-10">
                
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100">
                        {product.category}
                    </span>
                    <button className="w-10 h-10 rounded-full bg-slate-50 hover:bg-pink-50 hover:text-pink-500 flex items-center justify-center transition text-slate-400"><FaHeart/></button>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.95] tracking-tight mb-6">
                    {product.name}
                </h1>

                <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                    <div className="flex text-yellow-400 gap-1"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
                    <span>{product.rating} Rating</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{product.reviews} Reviews</span>
                </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-xs font-bold uppercase text-slate-400 mb-1">Total Price</p>
                            <div className="text-4xl font-black text-slate-900 flex items-baseline">
                                <span className="text-2xl mr-1">LKR</span>{product.price * qty}
                            </div>
                        </div>
                        <div className="flex items-center bg-white rounded-full p-2 shadow-sm border border-slate-100">
                            <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"><FaMinus size={10}/></button>
                            <span className="w-12 text-center font-black text-lg">{qty}</span>
                            <button onClick={() => setQty(qty+1)} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"><FaPlus size={10}/></button>
                        </div>
                </div>

                <MagneticButton 
                    onClick={handleAdd}
                    className="w-full h-16 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-600 transition-colors flex items-center justify-center gap-3 overflow-hidden relative group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {addingToCart ? (
                      <span className="animate-pulse">Saving...</span>
                    ) : (
                      <>
                        <span className="relative z-10 flex items-center gap-2">Add To Cart <FaShoppingCart/></span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                      </>
                    )}
                </MagneticButton>
            </motion.div>

            {/* Description */}
            <div className="space-y-4">
                <h3 className="text-xl font-black">Description</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* Flavors (Pills) */}
            {product.flavors && product.flavors.length > 0 && (
                <div>
                    <h3 className="text-xl font-black mb-4">Choose Flavor</h3>
                    <div className="flex flex-wrap gap-3">
                        {product.flavors.map(flavor => (
                            <button 
                                key={flavor.name}
                                onClick={() => setSelectedFlavor(flavor)}
                                className={`px-6 py-3 rounded-xl font-bold border-2 transition-all duration-300
                                ${selectedFlavor?.name === flavor.name 
                                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm scale-105" 
                                    : "border-slate-100 bg-white text-slate-500 hover:border-slate-300"}`}
                            >
                                {flavor.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Visual Ingredients */}
            <div>
                <h3 className="text-xl font-black mb-4">Pure Ingredients</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {[
                        { name: "Fresh Milk", emoji: "🥛", bg: "bg-blue-50 text-blue-500" },
                        { name: "Real Fruit", emoji: "🍓", bg: "bg-pink-50 text-pink-500" },
                        { name: "Cane Sugar", emoji: "🎋", bg: "bg-green-50 text-green-500" },
                        { name: "Sparkle", emoji: "✨", bg: "bg-yellow-50 text-yellow-500" },
                    ].map((ing, i) => (
                        <div key={i} className={`flex-shrink-0 w-24 h-28 rounded-2xl border border-slate-50 flex flex-col items-center justify-center gap-2 ${ing.bg}`}>
                            <div className="text-3xl">{ing.emoji}</div>
                            <span className="text-xs font-bold text-center leading-tight px-2">{ing.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ACCORDION (FAQ & Info) */}
            <div className="border-t border-slate-100 pt-4">
                <AccordionItem 
                    title="Nutritional Facts" 
                    isOpen={openAccordion === "nutrition"} 
                    onClick={() => setOpenAccordion(openAccordion === "nutrition" ? "" : "nutrition")}
                >
                    <div className="grid grid-cols-2 gap-y-2">
                        <div className="flex justify-between border-b border-slate-50 pb-1"><span>Calories</span> <span className="font-bold">140</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-1"><span>Sugar</span> <span className="font-bold">12g</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-1"><span>Protein</span> <span className="font-bold">8g</span></div>
                        <div className="flex justify-between border-b border-slate-50 pb-1"><span>Fat</span> <span className="font-bold">4g</span></div>
                    </div>
                </AccordionItem>

                <AccordionItem 
                    title="Shipping & Returns" 
                    isOpen={openAccordion === "shipping"} 
                    onClick={() => setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")}
                >
                    <p>Free shipping on orders over LKR500. We accept returns within 30 days if the bottle is unopened.</p>
                </AccordionItem>
            </div>

            {/* CUSTOMER LOVE */}
            <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-indigo-200">
                <FaQuoteLeft className="absolute top-4 left-4 text-white/20 text-4xl" />
                <div className="relative z-10">
                    <p className="text-lg font-medium italic mb-4">"Hands down the best drink I've had this year. The texture is creamy yet so refreshing. Highly recommend!"</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">JD</div>
                        <div>
                            <p className="font-bold text-sm">Jane Doe</p>
                            <div className="flex text-yellow-400 text-xs"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* PAIRING */}
            <div>
                <h3 className="text-xl font-black mb-4">Pairs Well With</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((_, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:shadow-md transition cursor-pointer group">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg group-hover:scale-110 transition"></div>
                            <div>
                                <p className="font-bold text-sm">Butter Cookies</p>
                                <p className="text-xs text-indigo-500 font-bold">LKR50</p>
                            </div>
                            <button className="ml-auto w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs shadow-lg"><FaPlus/></button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-20"></div>
         </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}