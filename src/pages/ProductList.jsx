
// // src/pages/ProductList.jsx
// import React, { useEffect, useState } from "react";
// import API from "../api/axiosClient.js";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

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

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-purple-700">All Products</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((p) => (
//           <motion.div
//             key={p._id}
//             className="relative border rounded-xl p-4 shadow hover:shadow-2xl overflow-hidden group transition-transform transform hover:-translate-y-1"
//           >
//             {/* Carousel */}
//             <div className="overflow-hidden rounded-lg h-48">
//               <motion.div
//                 className="flex"
//                 whileHover={{ x: -((p.images?.length || 1) - 1) * 100 }}
//                 transition={{ type: "tween", duration: 1.5 }}
//               >
//                 {(p.images || ["https://via.placeholder.com/300"]).map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={p.name}
//                     className="w-full h-48 object-cover rounded-lg flex-shrink-0"
//                   />
//                 ))}
//               </motion.div>
//             </div>

//             {/* Category / Tag Badges */}
//             <div className="flex gap-2 mt-2 flex-wrap">
//               <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
//                 {p.category}
//               </span>

//               {p.tags?.map((tag, i) => (
//                 <span
//                   key={i}
//                   className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             {/* Product Name */}
//             <h2 className="text-xl font-semibold mt-2">{p.name}</h2>

//             {/* Price */}
//             <motion.p
//               className={`text-sky-600 font-bold text-lg mt-2 ${
//                 p.sale ? "animate-pulse" : ""
//               }`}
//             >
//               ₹ {p.price}
//               {p.sale && (
//                 <span className="line-through text-gray-400 ml-2">
//                   ₹ {p.originalPrice}
//                 </span>
//               )}
//             </motion.p>

//             {/* View Button */}
//             <button
//               onClick={() => navigate(`/product/${p._id}`)}
//               className="mt-3 w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition font-semibold"
//             >
//               View
//             </button>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }







// // src/pages/ProductList.jsx
// import React, { useEffect, useState } from "react";
// import API from "../api/axiosClient";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";
// import { setCart } from "../store/cartSlice";
// import toast, { Toaster } from "react-hot-toast";

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   const token = localStorage.getItem("token");

//   // Load products
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

//   // Add product to cart
//   const handleAddToCart = async (product) => {
//     try {
//       const quantity = 1;

//       let res;
//       if (token) {
//         // Logged-in user
//         res = await API.post(
//           "/cart/add",
//           { productId: product._id, quantity },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         // Guest cart in localStorage
//         let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
//         const existing = guestCart.find((i) => i._id === product._id);
//         if (existing) {
//           existing.quantity += 1;
//         } else {
//           guestCart.push({ ...product, quantity });
//         }
//         localStorage.setItem("guestCart", JSON.stringify(guestCart));
//         res = {
//           data: {
//             items: guestCart,
//             totalPrice: guestCart.reduce((a, b) => a + b.price * b.quantity, 0),
//           },
//         };
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

//       // Attractive success toast
//       toast.success(`${product.name} added to cart! 🛒`, {
//         duration: 2500,
//         style: {
//           background: "#7c3aed",
//           color: "#fff",
//           fontWeight: "bold",
//           fontSize: "14px",
//         },
//         icon: "✅",
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add product to cart.", {
//         duration: 2500,
//         style: {
//           background: "#ef4444",
//           color: "#fff",
//           fontWeight: "bold",
//           fontSize: "14px",
//         },
//         icon: "❌",
//       });
//     }
//   };

//   if (!products.length) {
//     return <div className="text-center mt-10">Loading products...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto py-10 px-4">
//       <Toaster position="top-right" reverseOrder={false} />
//       <h1 className="text-3xl font-bold mb-8 text-purple-700">All Products</h1>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {products.map((product) => (
//           <motion.div
//             key={product._id}
//             className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition flex flex-col"
//             whileHover={{ scale: 1.03 }}
//           >
//             <div className="overflow-hidden rounded-lg h-48">
//               <motion.div
//                 className="flex"
//                 whileHover={{ x: -((product.images?.length || 1) - 1) * 100 }}
//                 transition={{ type: "tween", duration: 1.5 }}
//               >
//                 {(product.images || ["https://via.placeholder.com/300"]).map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={product.name}
//                     className="w-full h-48 object-cover rounded-lg flex-shrink-0"
//                   />
//                 ))}
//               </motion.div>
//             </div>

//             <div className="flex-1 flex flex-col justify-between mt-4">
//               <div>
//                 <h2 className="text-xl font-semibold text-purple-700 mb-1">{product.name}</h2>
//                 <p className="text-gray-600 mb-2">₹ {product.price}</p>
//                 <div className="flex gap-2 flex-wrap">
//                   <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
//                     {product.category}
//                   </span>
//                   {product.tags?.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4 flex gap-2">
//                 <button
//                   onClick={() => navigate(`/product/${product._id}`)}
//                   className="flex-1 bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition font-semibold"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition font-semibold"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }







////original code////
// // src/pages/ProductList.jsx
// import React, { useEffect, useState, useRef } from "react";
// import API from "../api/axiosClient";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";
// import { setCart } from "../store/cartSlice";
// import toast, { Toaster } from "react-hot-toast";

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [flyingImage, setFlyingImage] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const cartIconRef = useRef(null);

//   const token = localStorage.getItem("token");

//   // Load products
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

//   // Add to cart with curved fly animation
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

//     const midX = (startX + endX) / 2 + 100; // curve control X
//     const midY = startY - 150;              // curve control Y (higher for arc)

//     setFlyingImage({
//       src: product.images?.[0] || "https://via.placeholder.com/150",
//       start: { x: startX, y: startY, width: imgRect.width, height: imgRect.height },
//       end: { x: endX, y: endY, width: cartRect.width, height: cartRect.height },
//       control: { x: midX, y: midY },
//       id: product._id,
//     });

//     // Add to cart logic
//     try {
//       const quantity = 1;
//       let res;

//       if (token) {
//         res = await API.post(
//           "/cart/add",
//           { productId: product._id, quantity },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
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

//   // Bezier curve path calculation
//   const getBezierPosition = (t, start, control, end) => {
//     const x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * control.x + Math.pow(t, 2) * end.x;
//     const y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * control.y + Math.pow(t, 2) * end.y;
//     return { x, y };
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-10 px-4">
//       <Toaster position="top-right" />
//       <h1 className="text-3xl font-bold mb-8 text-purple-700">All Products</h1>

//       {/* Hidden Cart Ref */}
//       <div ref={cartIconRef} className="fixed top-4 right-4 w-10 h-10"></div>

//       {/* Flying Image Animation */}
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
//             transition: {
//               duration: 0.8,
//               ease: [0.65, 0, 0.35, 1], // ease in-out
//             },
//           }}
//           onAnimationComplete={() => setFlyingImage(null)}
//         />
//       )}

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {products.map((product) => (
//           <div key={product._id} className="product-card bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow flex flex-col hover:shadow-lg transition transform hover:-translate-y-1">
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
//     </div>
//   );
// }




// src/pages/ProductList.jsx
import React, { useEffect, useState, useRef } from "react";
import API from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [flyingImage, setFlyingImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const productRefs = useRef({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartIconRef = useRef(null);
  const glowTimeoutRef = useRef(null);

  const token = localStorage.getItem("token");

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

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (categoryFilter !== "All") filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);

  if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 rounded px-1">{part}</span>
      ) : part
    );
  };

  // Smooth glow/fade effect
  const handleSuggestionClick = (productId) => {
    setSelectedProductId(productId);
    setSearchQuery("");
    productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });

    if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);

    // Remove glow after 5 seconds
    glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 5000);
  };

  const handleAddToCart = async (product, e) => {
    const imgRect = e.currentTarget
      .closest(".product-card")
      .querySelector("img")
      .getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    const startX = imgRect.left;
    const startY = imgRect.top;
    const endX = cartRect.left;
    const endY = cartRect.top;

    const midX = (startX + endX) / 2 + 100;
    const midY = startY - 150;

    setFlyingImage({
      src: product.images?.[0] || "https://via.placeholder.com/150",
      start: { x: startX, y: startY, width: imgRect.width, height: imgRect.height },
      end: { x: endX, y: endY, width: cartRect.width, height: cartRect.height },
      control: { x: midX, y: midY },
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
          _id: i._id,
          name: i.name,
          price: i.price,
          image: i.images?.[0] || "https://via.placeholder.com/150",
          quantity: i.quantity,
        })),
        total: res.data.totalPrice,
      };
      dispatch(setCart(formatted));

      toast.success(`${product.name} added to cart! 🛒`, {
        duration: 2500,
        style: { background: "#7c3aed", color: "#fff", fontWeight: "bold", fontSize: "14px" },
        icon: "✅",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart.", {
        duration: 2500,
        style: { background: "#ef4444", color: "#fff", fontWeight: "bold", fontSize: "14px" },
        icon: "❌",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-purple-700">All Products</h1>

      {/* Search & Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-4 relative">
        <div className="relative flex-1 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          {searchQuery && (
            <FaTimes
              className="absolute right-4 top-3.5 text-gray-400 cursor-pointer"
              onClick={() => setSearchQuery("")}
            />
          )}

          {searchQuery && filteredProducts.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-64 overflow-auto"
            >
              {filteredProducts.slice(0, 5).map((p) => (
                <li
                  key={p._id}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer flex justify-between items-center"
                  onClick={() => handleSuggestionClick(p._id)}
                >
                  <span>{highlightText(p.name, searchQuery)}</span>
                  <span className="text-gray-500 text-sm">₹ {p.price}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Category & Sort */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-full border border-gray-200 px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="rounded-full border border-gray-200 px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>

      <div ref={cartIconRef} className="fixed top-4 right-4 w-10 h-10"></div>

      {flyingImage && (
        <motion.img
          key={flyingImage.id}
          src={flyingImage.src}
          className="fixed z-50 rounded-lg shadow-lg pointer-events-none"
          initial={flyingImage.start}
          animate={{
            x: flyingImage.end.x,
            y: flyingImage.end.y,
            width: flyingImage.end.width / 2,
            height: flyingImage.end.height / 2,
            transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
          }}
          onAnimationComplete={() => setFlyingImage(null)}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            ref={(el) => (productRefs.current[product._id] = el)}
            className={`product-card bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow flex flex-col hover:shadow-lg transition transform hover:-translate-y-1
              ${selectedProductId === product._id ? "border-4 border-yellow-400 animate-glow" : ""}`}
          >
            <div className="overflow-hidden rounded-lg h-48">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between mt-4">
              <h2 className="text-xl font-semibold text-purple-700 mb-1">{product.name}</h2>
              <p className="text-gray-600 mb-2">₹ {product.price}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">{product.category}</span>
                {product.tags?.map((tag, i) => (
                  <span key={i} className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="flex-1 bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition font-semibold"
                >
                  View
                </button>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind Glow Animation */}
      <style>
        {`
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 8px 2px rgba(255, 223, 0, 0.5); }
            50% { box-shadow: 0 0 16px 4px rgba(255, 223, 0, 0.8); }
          }
          .animate-glow { animation: glow 1s ease-in-out 0s 5; }
        `}
      </style>
    </div>
  );
}
