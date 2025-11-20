// // src/pages/ProductDetail.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axiosClient";
// import { useDispatch } from "react-redux";
// import { addItem } from "../store/cartSlice";
// import { motion, AnimatePresence } from "framer-motion";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [selectedFlavor, setSelectedFlavor] = useState(null);
//   const [cartBubbles, setCartBubbles] = useState([]);
//   const [showToast, setShowToast] = useState(false); // Toast state

//   useEffect(() => {
//     API.get(`/products/${id}`)
//       .then((res) => {
//         setProduct(res.data);
//         setSelectedFlavor(res.data.flavors?.[0] || null);
//       })
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleAdd = () => {
//     if (!product) return;

//     // Check if user is logged in
//     const token = localStorage.getItem("token"); // Replace with your auth logic
//     if (!token) {
//       alert("Please login to add products to your cart.");
//       navigate("/login");
//       return;
//     }

//     // Add item to cart backend
//     API.post("/cart/add", { productId: product._id, quantity: qty }).catch(console.error);

//     // Add to redux cart
//     dispatch(
//       addItem({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: selectedFlavor?.image || product.images?.[0],
//         quantity: qty,
//         flavor: selectedFlavor?.name,
//       })
//     );

//     // Trigger bubble animation
//     const newBubble = { id: Date.now() };
//     setCartBubbles((prev) => [...prev, newBubble]);
//     setTimeout(() => setCartBubbles((prev) => prev.filter((b) => b.id !== newBubble.id)), 1000);

//     // Show toast
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 2000); // hide after 2s

//     // Navigate to cart after 2 seconds
//     setTimeout(() => {
//       navigate("/cart");
//     }, 2000);
//   };

//   if (!product) return <div className="text-center py-20">Loading product...</div>;

//   const flavorColors = {
//     grape: "from-purple-300 to-purple-100",
//     mango: "from-yellow-200 to-orange-100",
//     bubbleTea: "from-yellow-50 to-brown-50",
//   };

//   const bgGradient =
//     selectedFlavor ? flavorColors[selectedFlavor.name] || "from-purple-50 to-white" : "from-purple-50 to-white";

//   return (
//     <div className={`relative min-h-screen py-10 px-4 bg-gradient-to-b ${bgGradient} overflow-hidden`}>
//       {/* Floating bubbles */}
//       {Array.from({ length: 20 }).map((_, i) => (
//         <span
//           key={i}
//           className="absolute rounded-full bg-white bg-opacity-40 animate-floating-bubble"
//           style={{
//             width: `${Math.random() * 25 + 10}px`,
//             height: `${Math.random() * 25 + 10}px`,
//             left: `${Math.random() * 100}%`,
//             bottom: `${Math.random() * 5}px`,
//             animationDuration: `${Math.random() * 10 + 5}s`,
//             animationDelay: `${Math.random() * 5}s`,
//           }}
//         />
//       ))}

//       {/* Cart Bubbles */}
//       <AnimatePresence>
//         {cartBubbles.map((b) => (
//           <motion.span
//             key={b.id}
//             className="absolute w-4 h-4 bg-white rounded-full"
//             initial={{ bottom: 50, opacity: 1, x: 0 }}
//             animate={{ bottom: 300, opacity: 0, x: 100 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1 }}
//           />
//         ))}
//       </AnimatePresence>

//       {/* Toast Notification */}
//       <AnimatePresence>
//         {showToast && (
//           <motion.div
//             className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             Added to cart!
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
//         {/* Product Image */}
//         <motion.div
//           className="relative rounded-xl shadow-2xl overflow-hidden"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <img
//             src={selectedFlavor?.image || product.images?.[0] || "https://via.placeholder.com/600"}
//             alt={product.name}
//             className="w-full h-full object-cover rounded-xl hover:scale-105 transform transition"
//           />
//           {/* Flavor Badge */}
//           {selectedFlavor && (
//             <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md animate-pulse">
//               {selectedFlavor.name}
//             </div>
//           )}
//         </motion.div>

//         {/* Product Info */}
//         <motion.div
//           className="flex flex-col justify-between"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <h1 className="text-3xl font-bold text-purple-700 mb-2">{product.name}</h1>
//           <p className="text-gray-600 mb-4">{product.description}</p>

//           {/* Flavor Selector */}
//           {product.flavors && product.flavors.length > 0 && (
//             <div className="flex gap-2 mb-4">
//               {product.flavors.map((flavor) => (
//                 <button
//                   key={flavor.name}
//                   onClick={() => setSelectedFlavor(flavor)}
//                   className={`px-3 py-1 rounded-full font-semibold ${
//                     selectedFlavor?.name === flavor.name ? "bg-purple-500 text-white" : "bg-white text-gray-700 shadow"
//                   } transition`}
//                 >
//                   {flavor.name}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Price */}
//           <motion.div
//             key={qty}
//             className="text-3xl font-extrabold text-purple-600 mb-6"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             ₹ {product.price * qty}
//           </motion.div>

//           {/* Quantity Selector */}
//           <div className="flex items-center gap-4 mb-6">
//             <button
//               onClick={() => setQty((prev) => Math.max(1, prev - 1))}
//               className="px-3 py-1 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition"
//             >
//               -
//             </button>
//             <span className="px-3 py-1 border rounded-lg">{qty}</span>
//             <button
//               onClick={() => setQty((prev) => prev + 1)}
//               className="px-3 py-1 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition"
//             >
//               +
//             </button>

//             <motion.button
//               whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(99, 102, 241, 0.5)" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleAdd}
//               className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
//             >
//               Add to Cart
//             </motion.button>
//           </div>

//           {/* Reviews */}
//           <div className="bg-purple-50 p-4 rounded-lg shadow-inner border-l-4 border-pink-400">
//             <div className="flex items-center gap-2 mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <span key={i} className={`${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}>
//                   ★
//                 </span>
//               ))}
//               <span className="text-gray-600 ml-2">({product.reviews?.length || 0} reviews)</span>
//             </div>
//             <p className="text-purple-700 font-semibold">
//               Enjoy a fizzy and refreshing experience with our Milk Soda!
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       {/* Floating bubble animation */}
//       <style>
//         {`
//           @keyframes floating-bubble {
//             0% { transform: translateY(0) scale(1); opacity: 0.7; }
//             50% { opacity: 1; }
//             100% { transform: translateY(-400px) scale(1.3); opacity: 0; }
//           }

//           .animate-floating-bubble {
//             animation-name: floating-bubble;
//             animation-iteration-count: infinite;
//             animation-timing-function: linear;
//           }
//         `}
//       </style>
//     </div>
//   );
// }














// src/pages/ProductDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axiosClient";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [cartBubbles, setCartBubbles] = useState([]);
  const [showToast, setShowToast] = useState(false); 
  const [flyingImage, setFlyingImage] = useState(null);

  const imgRef = useRef(null); // ref to product image
  const cartRef = useRef(null); // ref to cart icon

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedFlavor(res.data.flavors?.[0] || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Find cart icon in Navbar after mount
  useEffect(() => {
    const cartEl = document.querySelector("#navbar-cart-icon");
    if (cartEl) cartRef.current = cartEl;
  }, []);

  const handleAdd = () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add products to your cart.");
      navigate("/login");
      return;
    }

    // Add item to backend
    API.post("/cart/add", { productId: product._id, quantity: qty }).catch(console.error);

    // Add to redux cart
    dispatch(
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: selectedFlavor?.image || product.images?.[0],
        quantity: qty,
        flavor: selectedFlavor?.name,
      })
    );

    // Trigger bubble animation
    const newBubble = { id: Date.now() };
    setCartBubbles((prev) => [...prev, newBubble]);
    setTimeout(() => setCartBubbles((prev) => prev.filter((b) => b.id !== newBubble.id)), 1000);

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    // Trigger flying image animation
    if (imgRef.current && cartRef.current) {
      const imgRect = imgRef.current.getBoundingClientRect();
      const cartRect = cartRef.current.getBoundingClientRect();

      setFlyingImage({
        src: selectedFlavor?.image || product.images?.[0],
        start: { x: imgRect.left, y: imgRect.top, width: imgRect.width, height: imgRect.height },
        end: { x: cartRect.left + cartRect.width / 2 - imgRect.width / 4, y: cartRect.top + cartRect.height / 2 - imgRect.height / 4, width: imgRect.width / 2, height: imgRect.height / 2 },
        id: Date.now(),
      });
    }

    // Navigate to cart after animation
    setTimeout(() => navigate("/cart"), 1200);
  };

  if (!product) return <div className="text-center py-20">Loading product...</div>;

  const flavorColors = {
    grape: "from-purple-300 to-purple-100",
    mango: "from-yellow-200 to-orange-100",
    bubbleTea: "from-yellow-50 to-brown-50",
  };

  const bgGradient =
    selectedFlavor ? flavorColors[selectedFlavor.name] || "from-purple-50 to-white" : "from-purple-50 to-white";

  return (
    <div className={`relative min-h-screen py-10 px-4 bg-gradient-to-b ${bgGradient} overflow-hidden`}>
      {/* Flying Image */}
      {flyingImage && (
        <motion.img
          key={flyingImage.id}
          src={flyingImage.src}
          className="fixed z-50 rounded-lg pointer-events-none shadow-lg"
          initial={{
            x: flyingImage.start.x,
            y: flyingImage.start.y,
            width: flyingImage.start.width,
            height: flyingImage.start.height,
            rotate: 0,
          }}
          animate={{
            x: flyingImage.end.x,
            y: flyingImage.end.y,
            width: flyingImage.end.width,
            height: flyingImage.end.height,
            rotate: 720,
            scale: 0.5,
          }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={() => setFlyingImage(null)}
        />
      )}

      {/* Floating bubbles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white bg-opacity-40 animate-floating-bubble"
          style={{
            width: `${Math.random() * 25 + 10}px`,
            height: `${Math.random() * 25 + 10}px`,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 5}px`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Cart Bubbles */}
      <AnimatePresence>
        {cartBubbles.map((b) => (
          <motion.span
            key={b.id}
            className="absolute w-4 h-4 bg-white rounded-full"
            initial={{ bottom: 50, opacity: 1, x: 0 }}
            animate={{ bottom: 300, opacity: 0, x: 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            Added to cart!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
        {/* Product Image */}
        <motion.div
          ref={imgRef}
          className="relative rounded-xl shadow-2xl overflow-hidden product-image-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={selectedFlavor?.image || product.images?.[0] || "https://via.placeholder.com/600"}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl hover:scale-105 transform transition"
          />
          {selectedFlavor && (
            <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md animate-pulse">
              {selectedFlavor.name}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="flex flex-col justify-between"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-purple-700 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {product.flavors && product.flavors.length > 0 && (
            <div className="flex gap-2 mb-4">
              {product.flavors.map((flavor) => (
                <button
                  key={flavor.name}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`px-3 py-1 rounded-full font-semibold ${
                    selectedFlavor?.name === flavor.name
                      ? "bg-purple-500 text-white"
                      : "bg-white text-gray-700 shadow"
                  } transition`}
                >
                  {flavor.name}
                </button>
              ))}
            </div>
          )}

          <motion.div
            key={qty}
            className="text-3xl font-extrabold text-purple-600 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            ₹ {product.price * qty}
          </motion.div>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="px-3 py-1 border rounded-lg">{qty}</span>
            <button
              onClick={() => setQty((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 transition"
            >
              +
            </button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(99, 102, 241, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
            >
              Add to Cart
            </motion.button>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg shadow-inner border-l-4 border-pink-400">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
              <span className="text-gray-600 ml-2">({product.reviews?.length || 0} reviews)</span>
            </div>
            <p className="text-purple-700 font-semibold">
              Enjoy a fizzy and refreshing experience with our Milk Soda!
            </p>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          @keyframes floating-bubble {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { opacity: 1; }
            100% { transform: translateY(-400px) scale(1.3); opacity: 0; }
          }
          .animate-floating-bubble {
            animation-name: floating-bubble;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }
        `}
      </style>
    </div>
  );
}






