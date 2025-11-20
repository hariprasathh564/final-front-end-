///// cuttent working code/////
// import React, { useEffect, useState, useRef } from "react";
// import API from "../api/axiosClient";
// import ProductCard from "../components/ProductCard";
// import AdCarousel from "../components/AdCarousel";   
// import { motion } from "framer-motion";
// import { FaSearch, FaTimes } from "react-icons/fa";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState(null); // For highlight
//   const productRefs = useRef({}); // Store refs for each product card
//   const glowTimeoutRef = useRef(null);

//   useEffect(() => {
//     API.get("/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Failed to load products", err));
//   }, []);

//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   // Filter by search and category
//   let filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (categoryFilter !== "All") {
//     filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);
//   }

//   // Sort products
//   if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
//   if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
//   if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

//   const featuredProducts = filteredProducts.slice(0, 6);

//   // Highlight search text
//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, i) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={i} className="bg-yellow-200 rounded px-1">{part}</span>
//       ) : part
//     );
//   };

//   // Handle clicking suggestion
//   const handleSuggestionClick = (productId) => {
//     setSelectedProductId(productId); // Highlight the product
//     setSearchQuery(""); // Clear search input

//     // Scroll to product
//     productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });

//     // Clear previous timeout
//     if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);

//     // Remove glow after 5 seconds
//     glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 5000);
//   };

//   return (
//     <div className="px-4 max-w-6xl mx-auto py-8">
//       {/* Advertisement Carousel */}
//       <div className="mb-10">
//         <AdCarousel />
//       </div>

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

//           {/* Live Suggestions Dropdown */}
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

//         {/* Category Filter */}
//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="rounded-full border border-gray-200 px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>

//         {/* Sort Options */}
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

//       {/* Featured Products Section */}
//       <h1 className="text-3xl font-bold mb-6 text-purple-700">Featured Products</h1>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {featuredProducts.map((p) => (
//           <div
//             key={p._id}
//             ref={(el) => (productRefs.current[p._id] = el)}
//             className={`transition rounded-lg relative ${
//               selectedProductId === p._id ? "animate-amazon-glow" : ""
//             }`}
//           >
//             <ProductCard product={{ ...p, name: highlightText(p.name, searchQuery) }} />
//           </div>
//         ))}
//       </div>

//       {/* View All Products Button */}
//       <div className="mt-8 flex justify-center">
//         <motion.button
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold flex items-center gap-2"
//         >
//           View All Products
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//           </svg>
//         </motion.button>
//       </div>

//       {/* Amazon-style Glow Animation */}
//       <style>
//         {`
//           @keyframes amazonGlow {
//             0% { box-shadow: 0 0 20px 5px rgba(255, 223, 0, 0.2); }
//             50% { box-shadow: 0 0 40px 15px rgba(255, 223, 0, 0.6); }
//             100% { box-shadow: 0 0 20px 5px rgba(255, 223, 0, 0.2); }
//           }
//           .animate-amazon-glow {
//             animation: amazonGlow 1.2s ease-in-out 0s 5;
//             border-radius: 0.5rem;
//           }
//         `}
//       </style>
//     </div>
//   );
// }



















import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added
import API from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import AdCarousel from "../components/AdCarousel";   
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate(); // ✅ Added
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [floatingSparkles, setFloatingSparkles] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const productRefs = useRef({});
  const glowTimeoutRef = useRef(null);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);

        // Select 4 daily promotion products based on date (persistent for the day)
        const today = new Date().toDateString();
        let stored = localStorage.getItem("dailyPromotions");
        let dailyPromotion;
        if (stored) {
          stored = JSON.parse(stored);
          if (stored.date === today) {
            dailyPromotion = stored.products;
          }
        }
        if (!dailyPromotion) {
          dailyPromotion = res.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((p) => ({
              ...p,
              offer: Math.random() > 0.5 ? "Free Gift on Purchase" : "20% Off Today!",
            }));
          localStorage.setItem(
            "dailyPromotions",
            JSON.stringify({ date: today, products: dailyPromotion })
          );
        }
        setPromotions(dailyPromotion);

        // Generate floating sparkles for promotions section
        const floating = [...Array(20)].map(() => ({
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 2 + Math.random() * 4,
          color: ["#FFD700", "#FF69B4", "#00FFFF", "#7C3AED"][Math.floor(Math.random() * 4)],
          duration: 3 + Math.random() * 3,
          delay: Math.random() * 3,
        }));
        setFloatingSparkles(floating);

        // Countdown until midnight
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        setCountdown(Math.floor((midnight - now) / 1000));
      })
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (categoryFilter !== "All") {
    filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);
  }

  if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  const featuredProducts = filteredProducts.slice(0, 6);

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 rounded px-1">{part}</span>
      ) : part
    );
  };

  const handleSuggestionClick = (productId) => {
    setSelectedProductId(productId);
    setSearchQuery("");
    productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 5000);
  };

  const handleMouseMove = (e, cardId) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const colorOptions = ["#FFD700", "#FF69B4", "#00FFFF", "#7C3AED"];
    setSparkles((prev) => [
      ...prev,
      { id: Date.now(), x, y, color: colorOptions[Math.floor(Math.random() * colorOptions.length)], cardId },
    ]);
  };

  useEffect(() => {
    if (sparkles.length > 0) {
      const timeout = setTimeout(() => {
        setSparkles((prev) => prev.slice(1));
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [sparkles]);

  const formatCountdown = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  return (
    <div className="px-4 max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <AdCarousel />
      </div>

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

      {/* Daily Promotions */}
      {promotions.length > 0 && (
        <div className="mb-8 relative">
          <h2 className="text-2xl font-bold mb-2 text-purple-700">🔥 Today's Hot Promotions 🔥</h2>
          <p className="text-gray-500 mb-4">Offer ends in: {formatCountdown(countdown)}</p>

          {floatingSparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: s.size,
                height: s.size,
                backgroundColor: s.color,
                top: `${s.y}%`,
                left: `${s.x}%`,
                boxShadow: `0 0 8px ${s.color}`,
              }}
              animate={{ y: ["0%", "100%"], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "linear" }}
            />
          ))}

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {promotions.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.07 }}
                className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition overflow-hidden"
                onMouseMove={(e) => handleMouseMove(e, p._id)}
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{
                        y: ["-10%", "100%"],
                        x: [`${Math.random() * 80}%`, `${Math.random() * 80}%`],
                        opacity: [0, 1, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 0.5 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random(),
                        ease: "linear",
                      }}
                      className={`w-2 h-2 rounded-full ${["bg-red-400", "bg-yellow-400", "bg-green-400", "bg-blue-400"][i % 4]}`}
                    />
                  ))}
                </div>

                {sparkles
                  .filter((s) => s.cardId === p._id)
                  .map((s) => (
                    <div
                      key={s.id}
                      style={{
                        position: "absolute",
                        top: s.y,
                        left: s.x,
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: s.color,
                        pointerEvents: "none",
                        boxShadow: `0 0 6px ${s.color}`,
                      }}
                    />
                  ))}

                <div className="overflow-hidden rounded-lg h-40">
                  <img
                    src={p.images?.[0] || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="mt-3 font-semibold text-purple-700">{p.name}</h3>
                <p className="text-gray-600 mt-1">₹ {p.price}</p>
                <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow">
                  {p.offer}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Featured Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((p) => (
          <div
            key={p._id}
            ref={(el) => (productRefs.current[p._id] = el)}
            className={`transition rounded-lg relative ${
              selectedProductId === p._id ? "animate-amazon-glow" : ""
            }`}
          >
            <ProductCard product={{ ...p, name: highlightText(p.name, searchQuery) }} />
          </div>
        ))}
      </div>

      {/* View All Products */}
      <div className="mt-8 flex justify-center">
        <motion.button
          onClick={() => navigate("/products")} // ✅ Fixed
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition font-semibold flex items-center gap-2"
        >
          View All Products
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      <style>
        {`
          @keyframes amazonGlow {
            0% { box-shadow: 0 0 20px 5px rgba(255, 223, 0, 0.2); }
            50% { box-shadow: 0 0 40px 15px rgba(255, 223, 0, 0.6); }
            100% { box-shadow: 0 0 20px 5px rgba(255, 223, 0, 0.2); }
          }
          .animate-amazon-glow {
            animation: amazonGlow 1.2s ease-in-out 0s 5;
            border-radius: 0.5rem;
          }
        `}
      </style>
    </div>
  );
}






