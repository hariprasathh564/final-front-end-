import React, { useEffect, useState, useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import API from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import AdCarousel from "../components/AdCarousel";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useMotionValue 
} from "framer-motion";
import { 
  FaSearch, FaFire, FaBolt, FaHeart, FaShoppingBag, FaStar 
} from "react-icons/fa";

// --- UTILITY: MOUSE TILT EFFECT COMPONENT ---
const TiltCard = ({ children, className, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-out cursor-pointer ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [countdown, setCountdown] = useState(0);
  
  // --- REFS ---
  const productRefs = useRef({});
  const productSectionRef = useRef(null); // Ref to scroll to products
  const glowTimeoutRef = useRef(null);
  
  // --- PARALLAX HOOKS ---
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // --- DATA FETCHING ---
  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        
        // Promotion Logic
        const today = new Date().toDateString();
        let stored = localStorage.getItem("dailyPromotions");
        let dailyPromotion;
        if (stored) {
          stored = JSON.parse(stored);
          if (stored.date === today) dailyPromotion = stored.products;
        }
        if (!dailyPromotion) {
          // Pick 4 random products
          dailyPromotion = res.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((p) => ({ ...p, offer: Math.random() > 0.5 ? "Free Gift" : "20% Off" }));
          localStorage.setItem("dailyPromotions", JSON.stringify({ date: today, products: dailyPromotion }));
        }
        setPromotions(dailyPromotion);

        // Countdown Logic
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        setCountdown(Math.floor((midnight - now) / 1000));
      })
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCountdown((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- FILTERING LOGIC ---
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  
  let filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  if (categoryFilter !== "All") {
    filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);
  }

  if (sortOption === "priceLow") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortOption === "priceHigh") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortOption === "alpha") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  const featuredProducts = filteredProducts.slice(0, 8);

  // --- HANDLERS ---
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? <span key={i} className="bg-yellow-300 text-black px-1">{part}</span> : part
    );
  };

  const handleSuggestionClick = (productId) => {
    setSelectedProductId(productId);
    setSearchQuery("");
    // 1. Ensure product section is visible
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // 2. Highlight specific card
    setTimeout(() => {
        productRefs.current[productId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500);

    if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    glowTimeoutRef.current = setTimeout(() => setSelectedProductId(null), 5000);
  };

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    // Scroll down to products when a Bento box is clicked
    setTimeout(() => {
      productSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const formatCountdown = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  // --- SUB-COMPONENTS ---

  const InfiniteMarquee = () => (
    <div className="relative flex overflow-x-hidden bg-black text-white py-3 border-b border-white/10 z-20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1035] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-sm font-bold uppercase tracking-[0.2em] mx-4 flex items-center gap-4">
             Fresh • Organic • Cold Pressed • <FaBolt className="text-yellow-400"/> • No Preservatives • Fast Delivery •
          </span>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-[#1d1d1f] overflow-x-hidden selection:bg-purple-500 selection:text-white">
      
      {/* BACKGROUNDS */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://lh5.googleusercontent.com/proxy/-Ql87aj4ncu7ftHATMlvlMCQGCQyZr2ImdORINowHys02yqFOUnrionntO31Eu5NLnyorcYSftKmRenFEBiNZ4ym7SWlDn38ls0hEK8zLf-wksgFn8o")` }}></div>
      <motion.div style={{ y: y1 }} className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply" />
      <motion.div style={{ y: y2 }} className="fixed top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply" />

      <InfiniteMarquee />

      {/* HERO */}
      <div className="relative z-10 pt-8 pb-12 px-4 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-6 h-auto">
           <div className="md:col-span-8 relative rounded-[1rem] overflow-hidden shadow-2xl border border-white/50">
               <AdCarousel />
               <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 pointer-events-none">
                 <motion.h1 
                   initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                   className="text-5xl md:text-7xl font-black text-blue tracking-tighter drop-shadow-lg leading-[0.9]"
                 >
                   SIP <br/> DIFFERENT.
                 </motion.h1>
               </div>
           </div>
           <div className="md:col-span-4 flex flex-col gap-6">
              <div className="flex-1 bg-black rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden group">
                 <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -right-10 -top-10 w-40 h-40 border-2 border-dashed border-white/20 rounded-full"></motion.div>
                 <div>
                   <div className="flex justify-between items-center mb-4">
                     <FaFire className="text-orange-500 text-2xl animate-pulse"/>
                     <span className="font-mono border border-white/20 px-2 py-1 rounded text-xs">LIVE</span>
                   </div>
                   <h2 className="text-2xl font-bold">Flash Sale Ends In:</h2>
                   <p className="text-5xl font-mono font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{formatCountdown(countdown)}</p>
                 </div>
                 <button onClick={() => productSectionRef.current?.scrollIntoView({ behavior: "smooth" })} className="w-full bg-white text-black font-bold py-4 rounded-full mt-4 hover:scale-105 transition-transform active:scale-95">
                    Shop Deals
                 </button>
              </div>
              <div className="flex-1 bg-white rounded-[2.5rem] p-8 border border-gray-200/50 shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 -z-10"></div>
                 <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">New Drop</h3>
                 <p className="text-3xl font-black text-gray-900">Midnight Mint</p>
                 <motion.img 
                   src="https://cdn-icons-png.flaticon.com/512/3081/3081162.png" 
                   className="w-24 h-24 mt-4 drop-shadow-xl"
                   animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                 />
              </div>
           </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4">
        
        {/* STICKY SEARCH BAR */}
        <div className="sticky top-6 z-50 mb-20">
          <motion.div 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="bg-white/70 backdrop-blur-xl p-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 flex items-center gap-4 max-w-4xl mx-auto transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          >
            <div className="pl-4"><FaSearch className="text-gray-400"/></div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search for 'Berry Shake'..." 
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 font-medium h-full py-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <AnimatePresence>
                {searchQuery && filteredProducts.length > 0 && (
                  <motion.ul 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                     className="absolute top-14 left-0 w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-2"
                  >
                     {filteredProducts.slice(0, 5).map(p => (
                        <li key={p._id} onClick={() => handleSuggestionClick(p._id)} className="flex items-center gap-4 p-3 hover:bg-gray-100/50 rounded-2xl cursor-pointer transition">
                           <img src={p.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                           <div>
                              <p className="font-bold text-sm">{highlightText(p.name, searchQuery)}</p>
                              <p className="text-xs text-purple-600">₹{p.price}</p>
                           </div>
                        </li>
                     ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <div className="flex gap-2 pr-2">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-gray-100 rounded-full px-4 py-2 text-sm font-bold text-gray-600 outline-none cursor-pointer hover:bg-gray-200 transition">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-gray-100 rounded-full px-4 py-2 text-sm font-bold text-gray-600 outline-none cursor-pointer hover:bg-gray-200 transition">
                  <option value="">Sort</option>
                  <option value="priceLow">Price: Low</option>
                  <option value="priceHigh">Price: High</option>
              </select>
            </div>
          </motion.div>
        </div>

        {/* PROMOTIONS */}
        {promotions.length > 0 && (
          <div className="mb-32">
             <div className="flex items-center gap-4 mb-10">
                <div className="h-12 w-2 bg-black rounded-full"></div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Today's <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Meltdown.</span></h2>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {promotions.map((p, idx) => (
                   <TiltCard key={p._id} className="group h-full" onClick={() => navigate(`/product/${p._id}`)}>
                      <div className="bg-white h-full rounded-[2rem] p-4 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                         <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-4 py-2 rounded-bl-2xl z-10">{p.offer}</div>
                         <div className="h-64 rounded-[1.5rem] overflow-hidden bg-gray-50 relative mb-6">
                            <img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-sm font-black shadow-sm">₹{p.price}</div>
                         </div>
                         <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
                         <p className="text-gray-500 text-sm line-clamp-2 mb-4">Premium ingredients, zero preservatives. The taste of 2025.</p>
                         <button className="w-full py-3 rounded-xl border-2 border-gray-100 font-bold text-gray-900 hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                            Grab Deal <FaShoppingBag size={14}/>
                         </button>
                      </div>
                   </TiltCard>
                ))}
             </div>
          </div>
        )}

        {/* BENTO GRID CATEGORIES */}
        <div className="mb-12">
           <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-2 bg-purple-600 rounded-full"></div>
              <h2 className="text-4xl font-black tracking-tight">Curated Sips.</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-24 h-auto md:h-[500px]">
              {/* 1. All Collections */}
              <motion.div whileHover={{ scale: 0.98 }} onClick={() => handleCategoryClick("All")} className="md:col-span-2 md:row-span-2 bg-purple-100 rounded-3xl relative overflow-hidden group cursor-pointer border border-purple-200/50">
                  <img src="https://thumbs.dreamstime.com/b/vibrant-close-up-image-captures-essence-refreshing-sparkling-lime-lemon-soda-fizzy-drink-splashed-clear-365954207.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="All" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-white text-3xl font-bold">All Collections</h3>
                    <p className="text-gray-200 mt-2">Explore the full universe of flavors.</p>
                  </div>
              </motion.div>

              {/* 2. Shakes */}
              <motion.div whileHover={{ scale: 0.98 }} onClick={() => handleCategoryClick("Shakes")} className="bg-pink-100 rounded-3xl relative overflow-hidden group cursor-pointer border border-pink-200/50 h-64 md:h-auto">
                  <img src="https://images.immediate.co.uk/production/volatile/sites/2/2022/10/CHRISTMAS-NEGRONI-5ff9517.jpg?quality=90&resize=700,466" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Shakes" />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition p-6 flex items-end">
                    <h3 className="text-white font-bold text-xl">christmas cocktail with milk soda</h3>
                  </div>
              </motion.div>

              {/* 3. Sodas */}
              <motion.div whileHover={{ scale: 0.98 }} onClick={() => handleCategoryClick("Soda")} className="bg-blue-100 rounded-3xl relative overflow-hidden group cursor-pointer border border-blue-200/50 h-64 md:h-auto">
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/040/174/469/small/ai-generated-pictures-of-delicious-and-beautiful-drinks-photo.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sodas" />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition p-6 flex items-end">
                    <h3 className="text-white font-bold text-xl">have a cup of Sparkling Sodas</h3>
                  </div>
              </motion.div>

              {/* 4. New Arrivals */}
              <motion.div whileHover={{ scale: 0.98 }} onClick={() => handleCategoryClick("All")} className="md:col-span-2 bg-grey-600 rounded-3xl relative overflow-hidden group cursor-pointer border border-yellow-200/50 h-64 md:h-auto">
                  <div className="absolute top-0 right-0 p-10 opacity-20"><FaBolt size={100} /></div>
                  <div className="p-8 flex flex-col justify-center h-full relative z-10">
                    <h3 className="text-3xl font-black text-yellow-900 mb-2 ">New Arrivals</h3>
                    <p className="text-yellow-800">Check out what just landed in the fridge.</p>
                  </div>
              </motion.div>
           </div>
        </div>

        {/* MAIN PRODUCT LIST */}
        <div ref={productSectionRef} className="mb-32">
           <div className="flex justify-between items-end mb-10">
              <h2 className="text-4xl font-black tracking-tight">Trending Now.</h2>
              <button onClick={() => navigate("/products")} className="text-lg font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">View All</button>
           </div>

           {featuredProducts.length === 0 ? (
               <div className="text-center py-20">
                  <p className="text-gray-500 text-xl">No products found in this category.</p>
                  <button onClick={() => setCategoryFilter("All")} className="mt-4 text-purple-600 font-bold underline">Show All</button>
               </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
                {featuredProducts.map((p, i) => (
                   <motion.div 
                      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.05, duration: 0.5 }}
                      key={p._id} 
                      ref={(el) => (productRefs.current[p._id] = el)}
                      onClick={() => navigate(`/product/${p._id}`)} // Added Navigation here
                      className={`group cursor-pointer ${selectedProductId === p._id ? "ring-4 ring-yellow-400 rounded-[2rem]" : ""}`}
                   >
                      <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 bg-white shadow-md group-hover:shadow-2xl transition-all duration-500">
                         <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{p.category}</div>
                         <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"><FaHeart className="text-red-500" /></button>
                         </div>
                         <img src={p.images?.[0] || "https://via.placeholder.com/300"} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={p.name} />
                         {/* Quick Add Button Overlay */}
                         <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button className="w-full bg-black/80 backdrop-blur text-white py-3 rounded-xl font-bold hover:bg-black">View Details</button>
                         </div>
                      </div>
                      <div>
                         <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold leading-tight">{highlightText(p.name, searchQuery)}</h3>
                            <span className="text-lg font-bold">₹{p.price}</span>
                         </div>
                         <div className="flex gap-1 text-yellow-400 text-xs mt-1">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" />
                            <span className="text-gray-400 ml-1">(4.0)</span>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
           )}
        </div>

    <div className="relative mb-20 p-24 rounded-[1rem] overflow-hidden bg-black text-center text-white">

      {/* BACKGROUND: NEON GALAXY GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00eaff33,_transparent_60%)] animate-pulse-slow"></div>

      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-300 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* PARALLAX MILK SPLASH */}
      <img
        src="https://stale-olive-mbfong1vfv-k7mt5syxsv.edgeone.dev/Gemini_Generated_Image_2ehdwp2ehdwp2ehd.png"
        className="absolute inset-0 w-full h-full object-cover opacity-20 animate-zoomSplash"
      />

      {/* LASER GRID FLOOR */}
      <div className="absolute bottom-0 left-0 w-full h-40 opacity-20 bg-[linear-gradient(#00eaff55_1px,transparent_1px),linear-gradient(90deg,#00eaff55_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* FLOATING 3D BOTTLES */}
      <img
        src=""
        className="absolute left-10 top-1/2 w-40 -translate-y-1/2 drop-shadow-[0_0_30px_#00eaff] animate-bottleFloat"
      />
      <img
        src=""
        className="absolute right-10 top-1/2 w-40 -translate-y-1/2 opacity-70 drop-shadow-[0_0_25px_#00c6ff] animate-bottleSpin"
      />

      {/* FLOATING KAWAII COWS */}
      <img
        src=""
        className="absolute left-1/3 top-20 w-32 opacity-90 animate-cowFloat"
      />
      <img
        src=""
        className="absolute right-1/4 bottom-24 w-28 opacity-70 animate-cowBounce"
      />

      {/* RISING BUBBLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/40 rounded-full blur-[2px] animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 40}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ROTATING NEON AURA */}
      <div className="absolute inset-0 rounded-[3rem] border border-cyan-400/20 shadow-[0_0_40px_#00eaff] animate-spin-slow opacity-40 bg-[conic-gradient(from_0deg,transparent,white,transparent)]"></div>

      {/* TITLE */}
      <h2 className="relative text-7xl md:text-8xl font-black text-cyan-300 drop-shadow-[0_0_35px_#00eaff] mb-6">
        Cow In The Club
      </h2>

      {/* SUBTITLE */}
      <p className="relative text-gray-300 text-2xl mb-8">
        Traditional Meets Neon Future — Milk Soda Revolution ⚡🥛
      </p>

      {/* CTA BTN */}
      <Link to="/products">
      <button className="relative px-16 py-5 bg-cyan-400 text-black font-bold rounded-full text-xl shadow-[0_0_25px_#00eaff] hover:scale-110 hover:shadow-[0_0_40px_#00eaff] transition-all">
        Feel The Milk Soda
      </button>
      </Link>

      {/* INLINE ANIMATIONS */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% {opacity:.4} 50% {opacity:.8} }
        @keyframes zoomSplash {0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}

        .animate-pulse-slow { animation:pulse 5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 12s linear infinite; }

        /* Float Bottles */
        @keyframes bottleFloat {
          0%{transform:translateY(-50%) translateX(0) rotate(0deg);}
          50%{transform:translateY(-55%) translateX(10px) rotate(3deg);}
          100%{transform:translateY(-50%) translateX(0) rotate(0deg);}
        }
        .animate-bottleFloat { animation: bottleFloat 4s ease-in-out infinite; }

        /* Bottle Spin */
        @keyframes bottleSpin {
          0%{transform:translateY(-50%) rotate(0deg);}
          50%{transform:translateY(-52%) rotate(8deg);}
          100%{transform:translateY(-50%) rotate(0deg);}
        }
        .animate-bottleSpin { animation: bottleSpin 6s ease-in-out infinite; }

        /* Cow Float */
        @keyframes cowFloat {
          0%{transform:translateY(0)}
          50%{transform:translateY(-15px)}
          100%{transform:translateY(0)}
        }
        .animate-cowFloat { animation:cowFloat 4s ease-in-out infinite; }

        /* Cow Bounce */
        @keyframes cowBounce {
          0%{transform:translateY(0) scale(1)}
          50%{transform:translateY(-10px) scale(1.05)}
          100%{transform:translateY(0) scale(1)}
        }
        .animate-cowBounce { animation:cowBounce 3s ease-in-out infinite; }

        /* Soda Bubbles */
        @keyframes bubble {
          0%{transform:translateY(0) scale(.8); opacity:.4;}
          100%{transform:translateY(-200px) scale(1.2); opacity:0;}
        }
        .animate-bubble { animation: bubble linear infinite; }

        /* Neon particles */
        @keyframes particle {
          0%{transform:translateY(0); opacity:0.1;}
          50%{opacity:0.6;}
          100%{transform:translateY(-80px); opacity:0;}
        }
        .animate-particle { animation: particle 5s linear infinite; }

      `}</style>
    </div>
 


      </div>
    </div>
  );
}