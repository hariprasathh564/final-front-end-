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
//   const [sadCowIds, setSadCowIds] = useState([]); // Track removed products for cow animation

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

//   const handleRemove = async (productId) => {
//     // Show sad cow animation
//     setSadCowIds((prev) => [...prev, productId]);

//     // Remove cow card after 3 seconds
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
//               <motion.div
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//               >
//                 {sadCowIds.includes(item._id) ? (
//                   <motion.div
//                     className="bg-gray-100 p-4 rounded-xl shadow flex justify-center items-center h-64"
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1, rotate: [0, -5, 5, 0] }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
//                   >
//                     <img
//                       src="https://i.pinimg.com/736x/48/b4/60/48b460596aac5fff67daae9b4865e1cd.jpg"
//                       alt="Sad Cow"
//                       className="w-15 h-57"
//                     />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition flex flex-col"
//                     whileHover={{ scale: 1.03 }}
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-40 object-cover rounded-lg mb-4"
//                     />
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
//                           onClick={() => handleRemove(item._id)}
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
//             onClick={() => navigate("/checkout")}
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
//     </div>
//   );
// }















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
//   const [sadCowIds, setSadCowIds] = useState([]); // Track removed products for cow animation

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

//   const handleRemove = async (productId) => {
//     // Show sad cow animation
//     setSadCowIds((prev) => [...prev, productId]);

//     // Remove cow card after 3 seconds
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
//                     className="bg-gray-100 p-4 rounded-xl shadow flex justify-center items-center h-64"
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
//                           onClick={() => handleRemove(item._id)}
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
//             onClick={() => navigate("/checkout")}
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
//     </div>
//   );
// }







// // cuttent using//  
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
//             onClick={() => navigate("/checkout")}
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
//   const [confirmRemove, setConfirmRemove] = useState({ show: false, productId: null });

//   // ⭐ Load today's promotion product IDs
//   const todayPromoIds = JSON.parse(localStorage.getItem("todayPromos") || "[]");

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

//   const requestRemove = (productId) => {
//     setConfirmRemove({ show: true, productId });
//   };

//   const handleRemoveConfirmed = async () => {
//     const productId = confirmRemove.productId;
//     setConfirmRemove({ show: false, productId: null });

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
//               <motion.div
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//               >
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
//                       transition={{ repeat: Infinity, duration: 1.8 }}
//                     />
//                   </motion.div>
//                 ) : (
//                   // ⭐ Card with promo glow effect
//                   <motion.div
//                     className={`bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition flex flex-col 
//                       ${
//                         todayPromoIds.includes(item._id)
//                           ? "ring-4 ring-yellow-400 animate-pulse"
//                           : ""
//                       }`}
//                     whileHover={{ scale: 1.03 }}
//                   >
//                     <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />

//                     <div className="flex-1 flex flex-col justify-between">
//                       <div>
//                         <h3 className="font-semibold text-lg text-purple-700 mb-1">{item.name}</h3>

//                         {/* ⭐ Automatic discount section */}
//                         <div className="mb-2 relative">
//                           {todayPromoIds.includes(item._id) ? (
//                             <div>
//                               <p className="text-gray-500 line-through text-sm opacity-70">
//                                 ₹ {item.price}
//                               </p>

//                               <motion.p
//                                 initial={{ scale: 0.8, opacity: 0 }}
//                                 animate={{ scale: 1.1, opacity: 1 }}
//                                 transition={{ type: "spring", stiffness: 250, damping: 12 }}
//                                 className="text-xl font-bold text-purple-700"
//                               >
//                                 ₹ {(item.price * 0.8).toFixed(2)}
//                               </motion.p>

//                               <motion.span
//                                 initial={{ opacity: 0, y: -5 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className="absolute -right-2 -top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse"
//                               >
//                                 -20% Today Only!
//                               </motion.span>
//                             </div>
//                           ) : (
//                             <p className="text-gray-600 mb-2">₹ {item.price}</p>
//                           )}
//                         </div>
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
//             onClick={() => navigate("/checkout")}
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       )}

//       <div className="mt-6 text-center">
//         <Link
//           to="/products"
//           className="text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
//         >
//           Continue Shopping
//         </Link>
//       </div>

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





// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const reduxCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, fetchProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sadCowIds, setSadCowIds] = useState([]);
  const [confirmRemove, setConfirmRemove] = useState({ show: false, productId: null }); // Modal state

  const formatImage = (img) =>
    img ? (img.startsWith("http") ? img : `http://localhost:3000/uploads/${img}`) : "https://via.placeholder.com/150";

  const token = localStorage.getItem("token");

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
          localStorage.removeItem("user");
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
  }, [user, fetchProfile, navigate]);

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
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Show modal instead of default confirm
  const requestRemove = (productId) => {
    setConfirmRemove({ show: true, productId });
  };

  const handleRemoveConfirmed = async () => {
    const productId = confirmRemove.productId;
    setConfirmRemove({ show: false, productId: null });

    // Show sad cow animation
    setSadCowIds((prev) => [...prev, productId]);

    setTimeout(() => {
      setSadCowIds((prev) => prev.filter((id) => id !== productId));
    }, 3000);

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
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Stripe Checkout Handler (NEW)
  const handleCheckout = async () => {
    try {
      if (!reduxCart.items?.length) return;

      const res = await API.post(
        "/payments",
        { amount: reduxCart.total }, // total cart amount
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data;

      if (data.success && data.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating checkout session");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl text-gray-500">Loading your cart...</h2>
        <Link
          to="/"
          className="mt-4 inline-block text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-purple-700">Your Cart</h2>

      {reduxCart.items?.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reduxCart.items.map((item) => (
            <AnimatePresence key={item._id}>
              <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                {sadCowIds.includes(item._id) ? (
                  <motion.div
                    className="bg-white-100 p-4 rounded-xl shadow flex justify-center items-center h-64"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: [0, -5, 5, -5, 5, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.img
                      src="https://t4.ftcdn.net/jpg/14/74/87/29/360_F_1474872915_Tquu4NA4ejb43FhlnBLjCJcsneXZM7pT.jpg"
                      alt="Sad Cow"
                      className="w-64 h-64"
                      animate={{ y: [0, -10, 10, -10, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition flex flex-col"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-purple-700 mb-1">{item.name}</h3>
                        <p className="text-gray-600 mb-2">₹ {item.price}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdate(item._id, Number(e.target.value))}
                          className="w-20 p-2 border rounded-lg text-center focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                          onClick={() => requestRemove(item._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Your cart is empty</h2>
        </div>
      )}

      {/* Subtotal & Checkout */}
      {reduxCart.items?.length > 0 && (
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center bg-purple-50 p-6 rounded-xl shadow">
          <div className="mb-4 md:mb-0">
            <div className="text-gray-600 text-sm">Subtotal</div>
            <motion.div
              key={reduxCart.total}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-3xl font-bold text-purple-700"
            >
              ₹ {reduxCart.total?.toFixed(2) || 0}
            </motion.div>
          </div>
          <button
            onClick={handleCheckout} // ✅ Stripe checkout handler
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* Always show Continue Shopping */}
      <div className="mt-6 text-center">
        <Link
          to="/products"
          className="text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
      </div>

      {/* ✅ Custom Remove Confirmation Modal */}
      <AnimatePresence>
        {confirmRemove.show && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4 text-red-600">🛑 Remove Item?</h2>
              <p className="mb-6 text-gray-700">would you like to miss this flavor?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setConfirmRemove({ show: false, productId: null })}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemoveConfirmed}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
