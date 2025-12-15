// // src/pages/ProductList.jsx
// import React, { useEffect, useState, useRef } from "react";
// import API from "../api/axiosClient";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";
// import { setCart } from "../store/cartSlice";
// import toast, { Toaster } from "react-hot-toast";
// import { FaSearch, FaTimes } from "react-icons/fa";

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [flyingImage, setFlyingImage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const productRefs = useRef({});

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const cartIconRef = useRef(null);
//   const glowTimeoutRef = useRef(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Failed to load products:", err);
//       }
//     };
//     loadProducts();
//   }, []);

//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   let filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   if (categoryFilter !== "All") filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);

//   if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
//   if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
//   if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, i) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={i} className="bg-yellow-200 rounded px-1">{part}</span>
//       ) : part
//     );
//   };

//   // Smooth glow/fade effect
//   const handleSuggestionClick = (productId) => {
//     setSelectedProductId(productId);
//     setSearchQuery("");
//     productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });

//     if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);

//     // Remove glow after 5 seconds
//     glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 5000);
//   };

//   const handleAddToCart = async (product, e) => {
//     const imgRect = e.currentTarget
//       .closest(".product-card")
//       .querySelector("img")
//       .getBoundingClientRect();
//     const cartRect = cartIconRef.current.getBoundingClientRect();

//     const startX = imgRect.left;
//     const startY = imgRect.top;
//     const endX = cartRect.left;
//     const endY = cartRect.top;

//     const midX = (startX + endX) / 2 + 100;
//     const midY = startY - 150;

//     setFlyingImage({
//       src: product.images?.[0] || "https://via.placeholder.com/150",
//       start: { x: startX, y: startY, width: imgRect.width, height: imgRect.height },
//       end: { x: endX, y: endY, width: cartRect.width, height: cartRect.height },
//       control: { x: midX, y: midY },
//       id: product._id,
//     });

//     try {
//       const quantity = 1;
//       let res;
//       if (token) {
//         res = await API.post("/cart/add", { productId: product._id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
//       } else {
//         let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
//         const existing = guestCart.find((i) => i._id === product._id);
//         if (existing) existing.quantity += 1;
//         else guestCart.push({ ...product, quantity });
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         res = { data: { items: guestCart, totalPrice: guestCart.reduce((a, b) => a + b.price * b.quantity, 0) } };
//       }

//       const formatted = {
//         items: res.data.items.map((i) => ({
//           _id: i._id,
//           name: i.name,
//           price: i.price,
//           image: i.images?.[0] || "https://via.placeholder.com/150",
//           quantity: i.quantity,
//         })),
//         total: res.data.totalPrice,
//       };
//       dispatch(setCart(formatted));

//       toast.success(`${product.name} added to cart! 🛒`, {
//         duration: 2500,
//         style: { background: "#7c3aed", color: "#fff", fontWeight: "bold", fontSize: "14px" },
//         icon: "✅",
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add product to cart.", {
//         duration: 2500,
//         style: { background: "#ef4444", color: "#fff", fontWeight: "bold", fontSize: "14px" },
//         icon: "❌",
//       });
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-10 px-4">
//       <Toaster position="top-right" />
//       <h1 className="text-3xl font-bold mb-8 text-purple-700">All Products</h1>

//       {/* Search & Filters */}
//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-4 relative">
//         <div className="relative flex-1 mb-4 md:mb-0">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-12 pr-10 py-3 rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//           />
//           <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
//           {searchQuery && (
//             <FaTimes
//               className="absolute right-4 top-3.5 text-gray-400 cursor-pointer"
//               onClick={() => setSearchQuery("")}
//             />
//           )}

//           {searchQuery && filteredProducts.length > 0 && (
//             <motion.ul
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto"
//             >
//               {filteredProducts.slice(0, 5).map((p) => (
//                 <li
//                   key={p._id}
//                   className="px-4 py-2 hover:bg-purple-100 cursor-pointer flex justify-between items-center"
//                   onClick={() => handleSuggestionClick(p._id)}
//                 >
//                   <span>{highlightText(p.name, searchQuery)}</span>
//                   <span className="text-gray-500 text-sm">₹ {p.price}</span>
//                 </li>
//               ))}
//             </motion.ul>
//           )}
//         </div>

//         {/* Category & Sort */}
//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="rounded-full border border-gray-200 px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="rounded-full border border-gray-200 px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="">Sort By</option>
//           <option value="priceLow">Price: Low → High</option>
//           <option value="priceHigh">Price: High → Low</option>
//           <option value="alpha">Alphabetical</option>
//         </select>
//       </div>

//       <div ref={cartIconRef} className="fixed top-4 right-4 w-10 h-10"></div>

//       {flyingImage && (
//         <motion.img
//           key={flyingImage.id}
//           src={flyingImage.src}
//           className="fixed z-50 rounded-lg shadow-lg pointer-events-none"
//           initial={flyingImage.start}
//           animate={{
//             x: flyingImage.end.x,
//             y: flyingImage.end.y,
//             width: flyingImage.end.width / 2,
//             height: flyingImage.end.height / 2,
//             transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
//           }}
//           onAnimationComplete={() => setFlyingImage(null)}
//         />
//       )}

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredProducts.map((product) => (
//           <div
//             key={product._id}
//             ref={(el) => (productRefs.current[product._id] = el)}
//             className={`product-card bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow flex flex-col hover:shadow-lg transition transform hover:-translate-y-1
//               ${selectedProductId === product._id ? "border-4 border-yellow-400 animate-glow" : ""}`}
//           >
//             <div className="overflow-hidden rounded-lg h-48">
//               <img
//                 src={product.images?.[0] || "https://via.placeholder.com/300"}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//             </div>

//             <div className="flex-1 flex flex-col justify-between mt-4">
//               <h2 className="text-xl font-semibold text-purple-700 mb-1">{product.name}</h2>
//               <p className="text-gray-600 mb-2">₹ {product.price}</p>
//               <div className="flex gap-2 flex-wrap mb-4">
//                 <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">{product.category}</span>
//                 {product.tags?.map((tag, i) => (
//                   <span key={i} className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
//                 ))}
//               </div>

//               <div className="flex gap-2 mt-auto">
//                 <button
//                   onClick={() => navigate(`/product/${product._id}`)}
//                   className="flex-1 bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition font-semibold"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={(e) => handleAddToCart(product, e)}
//                   className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition font-semibold"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Tailwind Glow Animation */}
//       <style>
//         {`
//           @keyframes glow {
//             0%, 100% { box-shadow: 0 0 8px 2px rgba(255, 223, 0, 0.5); }
//             50% { box-shadow: 0 0 16px 4px rgba(255, 223, 0, 0.8); }
//           }
//           .animate-glow { animation: glow 1s ease-in-out 0s 5; }
//         `}
//       </style>
//     </div>
//   );
// }












// // src/pages/ProductList.jsx
// import React, { useEffect, useState, useRef } from "react";
// import API from "../api/axiosClient";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence for smoothness
// import { useSelector, useDispatch } from "react-redux";
// import { setCart } from "../store/cartSlice";
// import toast, { Toaster } from "react-hot-toast";
// import { FaSearch, FaTimes, FaShoppingCart, FaEye, FaFilter, FaSortAmountDown } from "react-icons/fa"; // Added a few more icons for UI

// export default function ProductList() {
//   // --- ALL ORIGINAL LOGIC & STATE ---
//   const [products, setProducts] = useState([]);
//   const [flyingImage, setFlyingImage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const productRefs = useRef({});

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const cartIconRef = useRef(null);
//   const glowTimeoutRef = useRef(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Failed to load products:", err);
//       }
//     };
//     loadProducts();
//   }, []);

//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   let filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   if (categoryFilter !== "All") filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);

//   if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
//   if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
//   if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, i) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={i} className="bg-yellow-300 text-black rounded px-1 font-bold">{part}</span>
//       ) : part
//     );
//   };

//   const handleSuggestionClick = (productId) => {
//     setSelectedProductId(productId);
//     setSearchQuery("");
//     productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });

//     if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
//     glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 5000);
//   };

//   const handleAddToCart = async (product, e) => {
//     const imgRect = e.currentTarget
//       .closest(".product-card")
//       .querySelector("img")
//       .getBoundingClientRect();
//     const cartRect = cartIconRef.current.getBoundingClientRect();

//     const startX = imgRect.left;
//     const startY = imgRect.top;
//     const endX = cartRect.left;
//     const endY = cartRect.top;

//     const midX = (startX + endX) / 2 + 100;
//     const midY = startY - 150;

//     setFlyingImage({
//       src: product.images?.[0] || "https://via.placeholder.com/150",
//       start: { x: startX, y: startY, width: imgRect.width, height: imgRect.height },
//       end: { x: endX, y: endY, width: cartRect.width, height: cartRect.height },
//       control: { x: midX, y: midY },
//       id: product._id,
//     });

//     try {
//       const quantity = 1;
//       let res;
//       if (token) {
//         res = await API.post("/cart/add", { productId: product._id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
//       } else {
//         let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
//         const existing = guestCart.find((i) => i._id === product._id);
//         if (existing) existing.quantity += 1;
//         else guestCart.push({ ...product, quantity });
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         res = { data: { items: guestCart, totalPrice: guestCart.reduce((a, b) => a + b.price * b.quantity, 0) } };
//       }

//       const formatted = {
//         items: res.data.items.map((i) => ({
//           _id: i._id,
//           name: i.name,
//           price: i.price,
//           image: i.images?.[0] || "https://via.placeholder.com/150",
//           quantity: i.quantity,
//         })),
//         total: res.data.totalPrice,
//       };
//       dispatch(setCart(formatted));

//       toast.success(`${product.name} added to cart!`, {
//         duration: 2500,
//         style: { background: "#10B981", color: "#fff", fontWeight: "bold", fontSize: "14px", borderRadius: "10px" },
//         icon: "🛒",
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add product to cart.", {
//         duration: 2500,
//         style: { background: "#EF4444", color: "#fff", fontWeight: "bold", fontSize: "14px" },
//         icon: "❌",
//       });
//     }
//   };

//   // --- RENDER ---
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 pb-20 font-sans selection:bg-purple-200 selection:text-purple-900">
//       <Toaster position="top-center" reverseOrder={false} />

//       {/* Background Elements */}
//       <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-r from-purple-600 to-indigo-600 -z-10 rounded-b-[50px] shadow-lg"></div>
      
//       {/* invisible cart ref for animation target */}
//       <div ref={cartIconRef} className="fixed top-6 right-6 w-12 h-12 z-50 pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
//         {/* Header Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
//             Discover Our Products
//           </h1>
//           <p className="text-purple-100 mt-2 text-lg font-medium">
//             Premium quality items curated just for you
//           </p>
//         </motion.div>

//         {/* Control Bar (Search, Filter, Sort) */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-10 -mt-8 relative z-20 border border-gray-100"
//         >
//           <div className="flex flex-col lg:flex-row gap-4 items-center">
            
//             {/* Search Input */}
//             <div className="relative flex-1 w-full">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <FaSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all outline-none text-gray-700 placeholder-gray-400 shadow-inner"
//               />
//               {searchQuery && (
//                 <button 
//                   onClick={() => setSearchQuery("")}
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition"
//                 >
//                   <FaTimes />
//                 </button>
//               )}

//               {/* Search Suggestions Dropdown */}
//               <AnimatePresence>
//                 {searchQuery && filteredProducts.length > 0 && (
//                   <motion.ul
//                     initial={{ opacity: 0, y: 10, scale: 0.98 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-72 overflow-y-auto z-50 divide-y divide-gray-50"
//                   >
//                     {filteredProducts.slice(0, 5).map((p) => (
//                       <li
//                         key={p._id}
//                         className="px-5 py-3 hover:bg-purple-50 cursor-pointer flex justify-between items-center transition-colors group"
//                         onClick={() => handleSuggestionClick(p._id)}
//                       >
//                         <span className="text-gray-700 group-hover:text-purple-700">{highlightText(p.name, searchQuery)}</span>
//                         <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-md">₹{p.price}</span>
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Filters */}
//             <div className="flex w-full lg:w-auto gap-3">
//               <div className="relative w-full lg:w-48">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600 pointer-events-none"><FaFilter /></div>
//                 <select
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer hover:border-purple-300 transition"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="relative w-full lg:w-48">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600 pointer-events-none"><FaSortAmountDown /></div>
//                 <select
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer hover:border-purple-300 transition"
//                 >
//                   <option value="">Sort By</option>
//                   <option value="priceLow">Price: Low → High</option>
//                   <option value="priceHigh">Price: High → Low</option>
//                   <option value="alpha">Alphabetical</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Flying Image Animation */}
//         {flyingImage && (
//           <motion.img
//             key={flyingImage.id}
//             src={flyingImage.src}
//             className="fixed z-[100] rounded-full shadow-2xl border-4 border-white pointer-events-none object-cover"
//             initial={flyingImage.start}
//             animate={{
//               x: flyingImage.end.x,
//               y: flyingImage.end.y,
//               width: 20, // shrunk size
//               height: 20,
//               opacity: 0.5,
//               transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Cubic bezier for nicer flight
//             }}
//             onAnimationComplete={() => setFlyingImage(null)}
//           />
//         )}

//         {/* Products Grid */}
//         {filteredProducts.length === 0 ? (
//             <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
//                 <p className="text-gray-400 text-xl">No products found matching your search.</p>
//                 <button onClick={() => {setSearchQuery(""); setCategoryFilter("All");}} className="mt-4 text-purple-600 font-semibold hover:underline">Clear Filters</button>
//             </div>
//         ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             <AnimatePresence>
//                 {filteredProducts.map((product) => (
//                 <motion.div
//                     layout
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     transition={{ duration: 0.3 }}
//                     key={product._id}
//                     ref={(el) => (productRefs.current[product._id] = el)}
//                     className={`product-card group relative bg-white rounded-3xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden
//                     ${selectedProductId === product._id ? "ring-4 ring-yellow-400 ring-opacity-60 animate-glow z-10" : ""}`}
//                 >
//                     {/* Image Section */}
//                     <div className="relative h-64 overflow-hidden bg-gray-100">
//                         <img
//                             src={product.images?.[0] || "https://via.placeholder.com/300"}
//                             alt={product.name}
//                             className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
//                         />
//                         {/* Overlay Badge */}
//                         <div className="absolute top-3 left-3 flex flex-wrap gap-2">
//                             <span className="bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-purple-100 uppercase tracking-wider">
//                                 {product.category}
//                             </span>
//                         </div>
//                         {/* Tags */}
//                         <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
//                              {product.tags?.slice(0, 2).map((tag, i) => (
//                                 <span key={i} className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
//                                     #{tag}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Content Section */}
//                     <div className="p-5 flex-1 flex flex-col">
//                         <div className="flex justify-between items-start mb-2">
//                             <h2 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-purple-600 transition-colors">
//                                 {product.name}
//                             </h2>
//                             <span className="text-lg font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg">
//                                 ₹{product.price}
//                             </span>
//                         </div>
                        
//                         <p className="text-sm text-gray-500 mb-6 line-clamp-2">
//                             Experience quality with our premium {product.name}. Added to our collection recently.
//                         </p>

//                         <div className="mt-auto flex gap-3">
//                             <button
//                                 onClick={() => navigate(`/product/${product._id}`)}
//                                 className="flex-1 flex items-center justify-center gap-2 bg-sky-50 text-sky-600 border border-sky-100 py-2.5 rounded-xl hover:bg-sky-600 hover:text-white transition-all duration-300 font-semibold text-sm"
//                             >
//                                 <FaEye /> Details
//                             </button>
//                             <button
//                                 onClick={(e) => handleAddToCart(product, e)}
//                                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-xl shadow-purple-200 hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform active:scale-95 font-semibold text-sm"
//                             >
//                                 <FaShoppingCart /> Add
//                             </button>
//                         </div>
//                     </div>
//                 </motion.div>
//                 ))}
//             </AnimatePresence>
//             </div>
//         )}
//       </div>

//       {/* Enhanced Glow Animation Styles */}
//       <style>
//         {`
//           @keyframes glow {
//             0% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7); }
//             70% { box-shadow: 0 0 0 10px rgba(250, 204, 21, 0); }
//             100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
//           }
//           .animate-glow {
//             animation: glow 1.5s infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
// }










// // src/pages/ProductList.jsx
// import React, { useEffect, useState, useRef } from "react";
// import API from "../api/axiosClient";
// import { useNavigate } from "react-router-dom";
// import { 
//   motion, 
//   AnimatePresence, 
//   useMotionValue, 
//   useTransform, 
//   useSpring 
// } from "framer-motion"; 
// import { useSelector, useDispatch } from "react-redux";
// import { setCart } from "../store/cartSlice";
// import toast, { Toaster } from "react-hot-toast";
// import { 
//   FaSearch, FaTimes, FaShoppingCart, FaEye, FaFilter, FaSortAmountDown, FaStar, FaBolt 
// } from "react-icons/fa";

// // --- UTILITY COMPONENT: 3D TILT CARD ---
// // This adds the trending "hover perspective" effect to cards
// const TiltCard = ({ children, className, style }) => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   // Smooth spring animation for tilt
//   const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
//   const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

//   const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
//   const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const width = rect.width;
//     const height = rect.height;
//     const mouseXPos = e.clientX - rect.left;
//     const mouseYPos = e.clientY - rect.top;
//     const xPct = mouseXPos / width - 0.5;
//     const yPct = mouseYPos / height - 0.5;
//     x.set(xPct);
//     y.set(yPct);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
//       className={className}
//     >
//       <div style={{ transform: "translateZ(20px)" }}>{children}</div>
//     </motion.div>
//   );
// };

// export default function ProductList() {
//   // --- ALL ORIGINAL LOGIC & STATE (UNCHANGED) ---
//   const [products, setProducts] = useState([]);
//   const [flyingImage, setFlyingImage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const productRefs = useRef({});

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const cartIconRef = useRef(null);
//   const glowTimeoutRef = useRef(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Failed to load products:", err);
//       }
//     };
//     loadProducts();
//   }, []);

//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   let filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   if (categoryFilter !== "All") filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);

//   if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
//   if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
//   if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, i) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={i} className="bg-yellow-300 text-black rounded px-1 font-bold shadow-sm">{part}</span>
//       ) : part
//     );
//   };

//   const handleSuggestionClick = (productId) => {
//     setSelectedProductId(productId);
//     setSearchQuery("");
//     productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });

//     if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
//     glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 5000);
//   };

//   const handleAddToCart = async (product, e) => {
//     // Note: targeting .product-card-inner to ensure we find the img correctly in new structure
//     const card = e.currentTarget.closest(".product-card");
//     const img = card.querySelector("img");
//     const imgRect = img.getBoundingClientRect();
//     const cartRect = cartIconRef.current.getBoundingClientRect();

//     const startX = imgRect.left;
//     const startY = imgRect.top;
//     const endX = cartRect.left;
//     const endY = cartRect.top;

//     const midX = (startX + endX) / 2 + 100;
//     const midY = startY - 150;

//     setFlyingImage({
//       src: product.images?.[0] || "https://via.placeholder.com/150",
//       start: { x: startX, y: startY, width: imgRect.width, height: imgRect.height },
//       end: { x: endX, y: endY, width: cartRect.width, height: cartRect.height },
//       control: { x: midX, y: midY },
//       id: product._id,
//     });

//     try {
//       const quantity = 1;
//       let res;
//       if (token) {
//         res = await API.post("/cart/add", { productId: product._id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
//       } else {
//         let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
//         const existing = guestCart.find((i) => i._id === product._id);
//         if (existing) existing.quantity += 1;
//         else guestCart.push({ ...product, quantity });
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         res = { data: { items: guestCart, totalPrice: guestCart.reduce((a, b) => a + b.price * b.quantity, 0) } };
//       }

//       const formatted = {
//         items: res.data.items.map((i) => ({
//           _id: i._id,
//           name: i.name,
//           price: i.price,
//           image: i.images?.[0] || "https://via.placeholder.com/150",
//           quantity: i.quantity,
//         })),
//         total: res.data.totalPrice,
//       };
//       dispatch(setCart(formatted));

//       toast.success(`${product.name} added!`, {
//         duration: 2500,
//         style: { background: "#10B981", color: "#fff", fontWeight: "bold", borderRadius: "12px", padding: "12px 20px" },
//         icon: "🛒",
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add.", {
//         duration: 2500,
//         style: { background: "#EF4444", color: "#fff", fontWeight: "bold" },
//         icon: "❌",
//       });
//     }
//   };

//   // --- RENDER ---
//   return (
//     <div className="min-h-screen bg-[#F3F4F6] text-slate-900 pb-24 font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
//       <Toaster position="top-center" />

//       {/* 1. NOISE TEXTURE OVERLAY (Trending 2025) */}
//       <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
//            style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

//       {/* 2. ANIMATED AURORA BACKGROUND */}
//       <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply animate-pulse-slow" />
//       <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-400/30 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply animate-pulse-slow" />

//       {/* Invisible cart ref target */}
//       <div ref={cartIconRef} className="fixed top-6 right-6 w-12 h-12 z-50 pointer-events-none" />

//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        
//         {/* HEADER */}
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className="text-center mb-16"
//         >
//           <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 mb-4 inline-block">
//             New Collection 2025
//           </span>
//           <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-4">
//              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Excellence.</span>
//           </h1>
//           <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
//             Explore premium flavors crafted with passion and organic ingredients.
//           </p>
//         </motion.div>

//         {/* CONTROL BAR (STICKY GLASSMORPHISM) */}
//         <div className="sticky top-6 z-40 mb-16">
//           <motion.div 
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="bg-white/70 backdrop-blur-2xl p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 flex flex-col lg:flex-row items-center gap-4 max-w-5xl mx-auto transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
//           >
//             {/* Search */}
//             <div className="relative flex-1 w-full">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Type to find products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-11 pr-10 py-3 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium h-full"
//               />
//               {searchQuery && (
//                 <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition">
//                   <FaTimes />
//                 </button>
//               )}
              
//               {/* Dropdown */}
//               <AnimatePresence>
//                 {searchQuery && filteredProducts.length > 0 && (
//                   <motion.ul
//                     initial={{ opacity: 0, y: 10, scale: 0.98 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 10, scale: 0.98 }}
//                     className="absolute top-14 left-0 right-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 max-h-80 overflow-y-auto z-50 p-2"
//                   >
//                     {filteredProducts.slice(0, 5).map((p) => (
//                       <li
//                         key={p._id}
//                         className="px-4 py-3 hover:bg-slate-100/80 rounded-xl cursor-pointer flex justify-between items-center transition-colors mb-1 last:mb-0"
//                         onClick={() => handleSuggestionClick(p._id)}
//                       >
//                         <div className="flex items-center gap-3">
//                            <img src={p.images?.[0]} className="w-10 h-10 rounded-lg object-cover bg-slate-100" alt=""/>
//                            <span className="text-slate-700 font-semibold">{highlightText(p.name, searchQuery)}</span>
//                         </div>
//                         <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">₹{p.price}</span>
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className="w-px h-8 bg-slate-200 hidden lg:block"></div>

//             {/* Filters */}
//             <div className="flex w-full lg:w-auto gap-3 pr-2">
//               <div className="relative flex-1 lg:flex-none">
//                 <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
//                 <select
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                   className="w-full pl-8 pr-8 py-2.5 bg-slate-100/50 border-none rounded-xl text-sm font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-slate-100 transition appearance-none"
//                 >
//                   {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
//                 </select>
//               </div>

//               <div className="relative flex-1 lg:flex-none">
//                 <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
//                 <select
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="w-full pl-8 pr-8 py-2.5 bg-slate-100/50 border-none rounded-xl text-sm font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-slate-100 transition appearance-none"
//                 >
//                   <option value="">Sort</option>
//                   <option value="priceLow">Low Price</option>
//                   <option value="priceHigh">High Price</option>
//                   <option value="alpha">A-Z</option>
//                 </select>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* FLYING ANIMATION OVERLAY */}
//         {flyingImage && (
//           <motion.img
//             key={flyingImage.id}
//             src={flyingImage.src}
//             className="fixed z-[100] rounded-2xl shadow-2xl border-2 border-white pointer-events-none object-cover"
//             initial={flyingImage.start}
//             animate={{
//               x: flyingImage.end.x,
//               y: flyingImage.end.y,
//               width: 24, height: 24, opacity: 0, rotate: 360,
//               transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
//             }}
//             onAnimationComplete={() => setFlyingImage(null)}
//           />
//         )}

//         {/* PRODUCTS GRID */}
//         {filteredProducts.length === 0 ? (
//             <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-slate-300">
//                 <div className="text-6xl mb-4">🔍</div>
//                 <p className="text-slate-500 text-xl font-medium">We couldn't find what you're looking for.</p>
//                 <button onClick={() => {setSearchQuery(""); setCategoryFilter("All");}} className="mt-6 text-indigo-600 font-bold hover:underline">Reset Filters</button>
//             </div>
//         ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             <AnimatePresence>
//                 {filteredProducts.map((product, idx) => (
//                 <TiltCard
//                     key={product._id}
//                     className={`product-card group relative bg-white rounded-[2rem] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col
//                     ${selectedProductId === product._id ? "ring-4 ring-yellow-400 z-20" : ""}`}
//                 >
//                     <div ref={(el) => (productRefs.current[product._id] = el)} className="h-full flex flex-col">
                        
//                         {/* Image Area */}
//                         <div className="relative h-72 overflow-hidden rounded-t-[2rem] bg-slate-100 p-6 flex items-center justify-center group">
//                             {/* Trending Badge */}
//                             {idx % 3 === 0 && (
//                                 <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
//                                     <FaBolt className="text-yellow-400" /> Trending
//                                 </div>
//                             )}
                            
//                             <img
//                                 src={product.images?.[0] || "https://via.placeholder.com/300"}
//                                 alt={product.name}
//                                 className="w-full h-full object-contain transform group-hover:scale-110 transition duration-700 ease-in-out drop-shadow-xl"
//                             />
                            
//                             {/* Glare Effect Overlay */}
//                             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ mixBlendMode: "overlay" }}></div>
//                         </div>

//                         {/* Content Area */}
//                         <div className="p-6 flex-1 flex flex-col bg-white rounded-b-[2rem] relative z-10">
//                             <div className="flex justify-between items-start mb-2">
//                                 <div>
//                                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{product.category}</p>
//                                     <h2 className="text-lg font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
//                                         {product.name}
//                                     </h2>
//                                 </div>
//                                 <span className="text-lg font-black text-indigo-600">₹{product.price}</span>
//                             </div>
                            
//                             {/* Rating */}
//                             <div className="flex items-center gap-1 mb-6">
//                                 <FaStar className="text-yellow-400 text-xs" />
//                                 <FaStar className="text-yellow-400 text-xs" />
//                                 <FaStar className="text-yellow-400 text-xs" />
//                                 <FaStar className="text-yellow-400 text-xs" />
//                                 <FaStar className="text-slate-200 text-xs" />
//                                 <span className="text-xs text-slate-400 ml-1 font-medium">4.8</span>
//                             </div>

//                             {/* Buttons Grid */}
//                             <div className="mt-auto grid grid-cols-2 gap-3">
//                                 <motion.button
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => navigate(`/product/${product._id}`)}
//                                     className="flex items-center justify-center gap-2 bg-slate-50 text-slate-600 border border-slate-200 py-3 rounded-xl hover:bg-slate-100 transition-colors font-bold text-sm"
//                                 >
//                                     <FaEye /> Details
//                                 </motion.button>
//                                 <motion.button
//                                     whileTap={{ scale: 0.9 }}
//                                     onClick={(e) => handleAddToCart(product, e)}
//                                     className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl shadow-lg hover:bg-indigo-600 hover:shadow-indigo-500/30 transition-all font-bold text-sm"
//                                 >
//                                     <FaShoppingCart /> Add
//                                 </motion.button>
//                             </div>
//                         </div>
//                     </div>
//                 </TiltCard>
//                 ))}
//             </AnimatePresence>
//             </div>
//         )}
//       </div>

//       {/* GLOBAL STYLES FOR GLOW & PULSE */}
//       <style>
//         {`
//           @keyframes slowPulse {
//             0%, 100% { opacity: 0.3; transform: scale(1); }
//             50% { opacity: 0.5; transform: scale(1.1); }
//           }
//           .animate-pulse-slow {
//             animation: slowPulse 8s ease-in-out infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
// }







// // src/pages/ProductList.jsx
// import React, { useEffect, useState, useRef } from "react";
// import API from "../api/axiosClient";
// import { useNavigate } from "react-router-dom";
// import { 
//   motion, 
//   AnimatePresence, 
//   useScroll, 
//   useTransform 
// } from "framer-motion"; 
// import { useSelector, useDispatch } from "react-redux";
// import { setCart } from "../store/cartSlice";
// import toast, { Toaster } from "react-hot-toast";
// import { 
//   FaSearch, FaTimes, FaShoppingCart, FaEye, FaSortAmountDown, 
//   FaStar, FaBolt, FaHeart, FaLeaf, FaFilter 
// } from "react-icons/fa";

// // --- COMPONENT: INFINITE MARQUEE ---
// const Marquee = () => (
//   <div className="relative flex overflow-x-hidden bg-slate-900 text-white py-3">
//     <motion.div
//       className="flex whitespace-nowrap"
//       animate={{ x: [0, -1000] }}
//       transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
//     >
//       {[...Array(4)].map((_, i) => (
//         <div key={i} className="flex items-center gap-8 mx-4">
//           <span className="text-sm font-bold uppercase tracking-widest">New Collection 2025</span>
//           <FaBolt className="text-yellow-400" />
//           <span className="text-sm font-bold uppercase tracking-widest">Free Shipping on Orders $50+</span>
//           <FaLeaf className="text-green-400" />
//           <span className="text-sm font-bold uppercase tracking-widest">100% Organic Ingredients</span>
//           <FaBolt className="text-yellow-400" />
//         </div>
//       ))}
//     </motion.div>
//   </div>
// );

// export default function ProductList() {
//   // --- STATE & LOGIC ---
//   const [products, setProducts] = useState([]);
//   const [flyingImage, setFlyingImage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState(null);
  
//   const productRefs = useRef({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cartIconRef = useRef(null);
//   const glowTimeoutRef = useRef(null);
//   const token = localStorage.getItem("token");

//   // Scroll Parallax for Background
//   const { scrollY } = useScroll();
//   const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
//   const y2 = useTransform(scrollY, [0, 1000], [0, -300]);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Failed to load products:", err);
//       }
//     };
//     loadProducts();
//   }, []);

//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   let filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   if (categoryFilter !== "All") filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);

//   if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
//   if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
//   if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, i) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={i} className="bg-yellow-300 text-slate-900 px-0.5 rounded-sm font-bold">{part}</span>
//       ) : part
//     );
//   };

//   const handleSuggestionClick = (productId) => {
//     setSelectedProductId(productId);
//     setSearchQuery("");
//     productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });
//     if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
//     glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 5000);
//   };

//   const handleAddToCart = async (product, e) => {
//     e.stopPropagation();
//     // Robust way to find the image even with complex DOM
//     const card = productRefs.current[product._id];
//     const img = card.querySelector("img");
//     const imgRect = img.getBoundingClientRect();
//     const cartRect = cartIconRef.current.getBoundingClientRect();

//     setFlyingImage({
//       src: product.images?.[0] || "https://via.placeholder.com/150",
//       start: { x: imgRect.left, y: imgRect.top, width: imgRect.width, height: imgRect.height },
//       end: { x: cartRect.left, y: cartRect.top, width: cartRect.width, height: cartRect.height },
//       id: product._id,
//     });

//     try {
//       const quantity = 1;
//       let res;
//       if (token) {
//         res = await API.post("/cart/add", { productId: product._id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
//       } else {
//         let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
//         const existing = guestCart.find((i) => i._id === product._id);
//         if (existing) existing.quantity += 1;
//         else guestCart.push({ ...product, quantity });
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         res = { data: { items: guestCart, totalPrice: guestCart.reduce((a, b) => a + b.price * b.quantity, 0) } };
//       }
//       const formatted = {
//         items: res.data.items.map((i) => ({
//           _id: i._id, name: i.name, price: i.price, image: i.images?.[0], quantity: i.quantity,
//         })),
//         total: res.data.totalPrice,
//       };
//       dispatch(setCart(formatted));
//       toast.success("Added to cart!", { 
//           icon: "🛍️", 
//           style: { borderRadius: '20px', background: '#1e293b', color: '#fff', fontWeight: 'bold' } 
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add.");
//     }
//   };

//   // --- RENDER UI ---
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
//       <Toaster position="top-center" />

//       {/* 1. ANIMATED MESH GRADIENT BACKGROUND (Light Mode) */}
//       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
//          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
//          <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow" />
//          <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow" />
//          <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-[100px] mix-blend-multiply" />
//       </div>

//       <Marquee />

//       {/* Invisible Cart Target */}
//       <div ref={cartIconRef} className="fixed top-6 right-6 w-12 h-12 z-50 pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10 pb-32">
        
//         {/* HEADER SECTION */}
//         <div className="text-center mb-12">
//            <motion.div 
//              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//              className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-indigo-600 mb-4"
//            >
//              Spring Collection 2025
//            </motion.div>
//            <motion.h1 
//              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
//              className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-4"
//            >
//              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Flavor.</span>
//            </motion.h1>
//         </div>

//         {/* SEARCH & SORT BAR (Floating Glass) */}
//         <div className="sticky top-4 z-40 mb-12">
//            <motion.div 
//              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//              className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl shadow-indigo-500/5 rounded-2xl p-3 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto"
//            >
//              {/* Search Input */}
//              <div className="relative flex-1 w-full group">
//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
//                 <input 
//                   type="text" 
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search for shakes, sodas..." 
//                   className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-10 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
//                 />
//                 {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"><FaTimes/></button>}
                
//                 {/* Dropdown Results */}
//                 <AnimatePresence>
//                   {searchQuery && filteredProducts.length > 0 && (
//                     <motion.ul 
//                       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
//                       className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden p-2 z-50"
//                     >
//                        {filteredProducts.slice(0, 5).map(p => (
//                          <li key={p._id} onClick={() => handleSuggestionClick(p._id)} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition">
//                            <span className="text-slate-700 font-semibold">{highlightText(p.name, searchQuery)}</span>
//                            <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">₹{p.price}</span>
//                          </li>
//                        ))}
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//              </div>

//              {/* Sort Dropdown */}
//              <div className="relative w-full md:w-auto">
//                 <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <select 
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="w-full md:w-48 bg-slate-50 border-none rounded-xl py-3 pl-10 pr-8 text-slate-700 font-bold text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-slate-100 transition"
//                 >
//                    <option value="">Sort By</option>
//                    <option value="priceLow">Price: Low</option>
//                    <option value="priceHigh">Price: High</option>
//                    <option value="alpha">Alphabetical</option>
//                 </select>
//              </div>
//            </motion.div>
//         </div>

//         {/* FLYING IMAGE ANIMATION LAYER */}
//         {flyingImage && (
//           <motion.img
//             key={flyingImage.id} src={flyingImage.src}
//             className="fixed z-[100] rounded-full shadow-2xl border-4 border-white pointer-events-none object-cover"
//             initial={flyingImage.start}
//             animate={{ x: flyingImage.end.x, y: flyingImage.end.y, width: 20, height: 20, opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
//             onAnimationComplete={() => setFlyingImage(null)}
//           />
//         )}

//         {/* PRODUCTS GRID */}
//         {filteredProducts.length === 0 ? (
//             <div className="text-center py-20">
//                 <div className="text-6xl mb-4">🍃</div>
//                 <h3 className="text-xl font-bold text-slate-900">Nothing here yet.</h3>
//                 <button onClick={() => {setSearchQuery(""); setCategoryFilter("All");}} className="text-indigo-600 font-bold mt-2 underline">Clear Filters</button>
//             </div>
//         ) : (
//             <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             <AnimatePresence>
//                 {filteredProducts.map((product) => (
//                 <motion.div
//                     layout
//                     initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
//                     key={product._id}
//                     ref={(el) => (productRefs.current[product._id] = el)}
//                     onClick={() => navigate(`/product/${product._id}`)}
//                     className={`group relative bg-white rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.2)] transition-all duration-500 cursor-pointer
//                     ${selectedProductId === product._id ? "ring-4 ring-indigo-400 ring-opacity-50 z-20" : ""}`}
//                 >
//                     {/* Image Area */}
//                     <div className="relative h-72 bg-gradient-to-b from-slate-50 to-white p-8 flex items-center justify-center overflow-hidden">
//                         <motion.img
//                             whileHover={{ scale: 1.1, rotate: 5 }}
//                             transition={{ type: "spring", stiffness: 300 }}
//                             src={product.images?.[0] || "https://via.placeholder.com/300"}
//                             alt={product.name}
//                             className="w-full h-full object-contain drop-shadow-xl relative z-10"
//                         />
//                         {/* Decorative Blob behind image */}
//                         <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-3xl transform scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                        
//                         {/* Floating Action Buttons (Visible on Hover) */}
//                         <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 z-20">
//                            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-110 transition"><FaHeart /></button>
//                            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:scale-110 transition"><FaEye /></button>
//                         </div>

//                         {/* Category Badge */}
//                         <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm border border-slate-100">
//                            {product.category}
//                         </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                         <div className="flex justify-between items-start mb-2">
//                            <h3 className="text-lg font-extrabold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{product.name}</h3>
//                            <span className="text-lg font-bold text-indigo-600">₹{product.price}</span>
//                         </div>
                        
//                         <div className="flex items-center gap-1 mb-4 text-xs font-medium text-slate-500">
//                            <FaStar className="text-yellow-400" /> 4.8 (120 reviews)
//                         </div>

//                         <motion.button
//                             whileTap={{ scale: 0.95 }}
//                             onClick={(e) => handleAddToCart(product, e)}
//                             className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg hover:bg-indigo-600 hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 group/btn"
//                         >
//                             <FaShoppingCart className="group-hover/btn:animate-bounce" /> Add to Cart
//                         </motion.button>
//                     </div>
//                 </motion.div>
//                 ))}
//             </AnimatePresence>
//             </motion.div>
//         )}

//         {/* --- FLOATING CATEGORY DOCK (2025 Trend) --- */}
//         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-4 pointer-events-none">
//             <motion.div 
//                initial={{ y: 100 }} animate={{ y: 0 }} 
//                className="pointer-events-auto bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] rounded-full p-2 flex gap-2 overflow-x-auto max-w-fit mx-auto no-scrollbar"
//             >
//                {categories.map(cat => (
//                    <button
//                       key={cat}
//                       onClick={() => setCategoryFilter(cat)}
//                       className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300
//                       ${categoryFilter === cat 
//                          ? "bg-slate-900 text-white shadow-lg" 
//                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
//                    >
//                       {cat}
//                    </button>
//                ))}
//             </motion.div>
//         </div>

//       </div>

//       {/* CSS for slow pulse animation */}
//       <style>{`
//         @keyframes slowPulse {
//           0%, 100% { opacity: 0.6; transform: scale(1); }
//           50% { opacity: 0.8; transform: scale(1.1); }
//         }
//         .animate-pulse-slow { animation: slowPulse 8s ease-in-out infinite; }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }




// src/pages/ProductList.jsx
import React, { useEffect, useState, useRef } from "react";
import API from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform 
} from "framer-motion"; 
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { 
  FaSearch, FaTimes, FaShoppingCart, FaEye, FaSortAmountDown, 
  FaStar, FaBolt, FaHeart, FaLeaf, FaFireAlt 
} from "react-icons/fa";

// --- COMPONENT: INFINITE MARQUEE ---
const Marquee = () => (
  <div className="relative flex overflow-x-hidden bg-[#0F172A] text-white py-3 z-50">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
    >
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-12 mx-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">Spring Collection 2025</span>
          <div className="flex items-center gap-2"><FaBolt className="text-yellow-400" /> <span className="font-bold">Fast Delivery</span></div>
          <div className="flex items-center gap-2"><FaLeaf className="text-green-400" /> <span className="font-bold">100% Organic</span></div>
          <div className="flex items-center gap-2"><FaFireAlt className="text-orange-400" /> <span className="font-bold">Hot Deals</span></div>
        </div>
      ))}
    </motion.div>
  </div>
);

export default function ProductList() {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [flyingImage, setFlyingImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // --- REFS & HOOKS ---
  const productRefs = useRef({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartIconRef = useRef(null);
  const glowTimeoutRef = useRef(null);
  const token = localStorage.getItem("token");

  // Background Parallax
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  // --- LOAD DATA ---
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    loadProducts();
  }, []);

  // --- FILTERING & SORTING ---
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (categoryFilter !== "All") filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);

  if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  // --- HELPERS ---
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-300 text-slate-900 px-0.5 rounded-sm font-bold">{part}</span>
      ) : part
    );
  };

  const handleSuggestionClick = (productId) => {
    setSelectedProductId(productId);
    setSearchQuery("");
    productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 4000);
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    const card = productRefs.current[product._id];
    const img = card.querySelector("img");
    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    setFlyingImage({
      src: product.images?.[0] || "https://via.placeholder.com/150",
      start: { x: imgRect.left, y: imgRect.top, width: imgRect.width, height: imgRect.height },
      end: { x: cartRect.left, y: cartRect.top, width: cartRect.width, height: cartRect.height },
      id: product._id,
    });

    try {
      const quantity = 1;
      let res;
      if (token) {
        res = await API.post("/cart/add", { productId: product._id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const existing = guestCart.find((i) => i._id === product._id);
        if (existing) existing.quantity += 1;
        else guestCart.push({ ...product, quantity });
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        res = { data: { items: guestCart, totalPrice: guestCart.reduce((a, b) => a + b.price * b.quantity, 0) } };
      }
      const formatted = {
        items: res.data.items.map((i) => ({
          _id: i._id, name: i.name, price: i.price, image: i.images?.[0], quantity: i.quantity,
        })),
        total: res.data.totalPrice,
      };
      dispatch(setCart(formatted));
      toast.success("Added to cart!", { 
        icon: "🛍️", 
        style: { borderRadius: '50px', background: 'rgba(0,0,0,0.8)', color: '#fff', backdropFilter: 'blur(10px)' } 
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add.");
    }
  };

  // --- RENDER ---
  return (
    
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans relative overflow-x-hidden selection:bg-violet-500 selection:text-white">
            <div className="fixed inset-0 opacity-[0.07] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://lh5.googleusercontent.com/proxy/-Ql87aj4ncu7ftHATMlvlMCQGCQyZr2ImdORINowHys02yqFOUnrionntO31Eu5NLnyorcYSftKmRenFEBiNZ4ym7SWlDn38ls0hEK8zLf-wksgFn8o")` }}></div>

      <Toaster position="top-center" />

      {/* 1. BACKGROUND (Noise + Mesh Gradients) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-soft-light"></div>
         
         {/* Floating Blobs */}
         <motion.div style={{ y: y1 }} className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-violet-200/40 rounded-full blur-[120px] mix-blend-multiply" />
         <motion.div style={{ y: y2 }} className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-[120px] mix-blend-multiply" />
         <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <Marquee />

      {/* Cart Animation Target */}
      <div ref={cartIconRef} className="fixed top-6 right-6 w-12 h-12 z-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-40 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
           <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
             className="inline-block px-5 py-2 rounded-full bg-white border border-slate-200 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] text-xs font-black uppercase tracking-widest text-violet-600 mb-6"
           >
             Official Store
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
             className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-4 leading-[0.9]"
           >
             TASTE THE <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 animate-gradient-x">
               EXTRAORDINARY.
             </span>
           </motion.h1>
        </div>

        {/* GLASS STICKY BAR */}
        <div className="sticky top-6 z-40 mb-16">
           <motion.div 
             initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
             className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto ring-1 ring-black/5"
           >
             {/* Search */}
             <div className="relative flex-1 w-full">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search curated flavors..." 
                  className="w-full bg-transparent border-none rounded-xl py-3 pl-10 pr-10 text-slate-700 font-bold placeholder-slate-400 focus:ring-0"
                />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"><FaTimes/></button>}
                
                {/* Dropdown */}
                <AnimatePresence>
                  {searchQuery && filteredProducts.length > 0 && (
                    <motion.ul 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-14 left-0 w-full bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-100 overflow-hidden p-1 z-50"
                    >
                       {filteredProducts.slice(0, 5).map(p => (
                         <li key={p._id} onClick={() => handleSuggestionClick(p._id)} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                           <span className="text-slate-700 font-bold">{highlightText(p.name, searchQuery)}</span>
                           <span className="text-xs font-bold bg-slate-100 text-slate-900 px-2 py-1 rounded">LKR{p.price}</span>
                         </li>
                       ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
             </div>

             <div className="w-px h-8 bg-slate-200 hidden md:block"></div>

             {/* Sort */}
             <div className="relative w-full md:w-auto">
                <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full md:w-48 bg-transparent border-none rounded-xl py-3 pl-10 pr-4 text-slate-700 font-bold focus:ring-0 cursor-pointer"
                >
                   <option value="">Recommended</option>
                   <option value="priceLow">Price: Low to High</option>
                   <option value="priceHigh">Price: High to Low</option>
                   <option value="alpha">Alphabetical</option>
                </select>
             </div>
           </motion.div>
        </div>

        {/* FLYING IMAGE ANIMATION */}
        {flyingImage && (
          <motion.img
            key={flyingImage.id} src={flyingImage.src}
            className="fixed z-[100] rounded-full shadow-2xl border-4 border-white pointer-events-none object-cover"
            initial={flyingImage.start}
            animate={{ x: flyingImage.end.x, y: flyingImage.end.y, width: 20, height: 20, opacity: 0, transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] } }}
            onAnimationComplete={() => setFlyingImage(null)}
          />
        )}

        {/* --- PRODUCTS GRID --- */}
        {filteredProducts.length === 0 ? (
            <div className="text-center py-32">
                <div className="text-6xl mb-6 opacity-50">🛸</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">We couldn't find that.</h3>
                <p className="text-slate-500">Try searching for something else.</p>
                <button onClick={() => {setSearchQuery(""); setCategoryFilter("All");}} className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:scale-105 transition">View All</button>
            </div>
        ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
                {filteredProducts.map((product, idx) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                    key={product._id}
                    ref={(el) => (productRefs.current[product._id] = el)}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className={`group flex flex-col h-full bg-white rounded-[2.5rem] p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.15)] transition-all duration-500 cursor-pointer
                    ${selectedProductId === product._id ? "ring-4 ring-yellow-400 ring-offset-4 z-20" : "hover:-translate-y-2"}`}
                >
                    {/* Image Container */}
                    <div className="relative h-72 bg-[#F1F5F9] rounded-[2rem] overflow-hidden flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-violet-50 group-hover:to-cyan-50 transition-colors duration-500">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/40 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none z-20" style={{ transitionDuration: '1.5s' }}></div>

                        {/* Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm text-slate-500 z-20">
                            {product.category}
                        </div>
                        
                        {/* Image */}
                        <motion.img
                            whileHover={{ scale: 1.1, rotate: 3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            src={product.images?.[0] || "https://via.placeholder.com/300"}
                            alt={product.name}
                            className="w-full h-full object-contain p-6 drop-shadow-xl relative z-10"
                        />

                        {/* Quick Actions */}
                        <div className="absolute bottom-4 right-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                             <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-rose-500 transition hover:scale-110"><FaHeart /></button>
                             <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-indigo-500 transition hover:scale-110"><FaEye /></button>
                        </div>
                    </div>

                    {/* Content - Flex Grow pushes button down */}
                    <div className="px-4 pt-6 pb-2 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-violet-600 transition-colors line-clamp-2">{product.name}</h3>
                           <span className="text-lg font-black text-violet-600 whitespace-nowrap ml-2">LKR{product.price}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-6 text-xs font-bold text-slate-400">
                           <FaStar className="text-yellow-400" /> 4.8 • In Stock
                        </div>

                        {/* Button fixed to bottom */}
                        <div className="mt-auto">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={(e) => handleAddToCart(product, e)}
                                className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold shadow-lg hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                <FaShoppingCart className="text-sm" /> Add to Cart
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>
            </motion.div>
        )}

        {/* --- FLOATING DOCK (Mobile Friendly Category Switcher) --- */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-4 pointer-events-none flex justify-center">
            <motion.div 
               initial={{ y: 100 }} animate={{ y: 0 }} 
               className="pointer-events-auto bg-white/90 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] rounded-2xl p-1.5 flex gap-1 overflow-x-auto max-w-[90vw] no-scrollbar"
            >
               {categories.map(cat => (
                   <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 relative overflow-hidden
                      ${categoryFilter === cat 
                         ? "text-white shadow-md" 
                         : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
                   >
                      {categoryFilter === cat && (
                          <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-900" />
                      )}
                      <span className="relative z-10">{cat}</span>
                   </button>
               ))}
            </motion.div>
        </div>

      </div>

      {/* Animations CSS */}
      <style>{`
        .animate-gradient-x { background-size: 200% 200%; animation: gradientX 4s ease infinite; }
        @keyframes gradientX { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}