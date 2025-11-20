// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";
// import ForgotPassword from "./pages/ForgotPassword";
// import Chat from "./pages/Chat";

// /* Admin pages */
// import Dashboard from "./pages/Admin/Dashboard";
// import ManageProducts from "./pages/Admin/ManageProducts";
// import ManageUsers from "./pages/Admin/ManageUsers";
// import ManageOrders from "./pages/Admin/ManageOrders";
// import Payments from "./pages/Admin/Payments";
// import ProductDetails from "./pages/ProductDetail";

// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import CartPage from "./pages/Cart";
// // import Success from "./pages/Success";
// // import Cancel from "./pages/Cancel";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-1 container mx-auto px-4 py-6">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//                     {/* <Route path="/products" element={<Products />} /> */}

//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/chat" element={<Chat />} />

//             {/* Admin */}
//             <Route path="/admin" element={<Dashboard />} />
//             <Route path="/admin/products" element={<ManageProducts />} />
//             <Route path="/admin/users" element={<ManageUsers />} />
//             <Route path="/admin/orders" element={<ManageOrders />} />
//             <Route path="/admin/payments" element={<Payments />} />

//              <Route path="/cart" element={<CartPage />} />
//             <Route path="/payment/success" element={<Success />} />
//             <Route path="/payment/cancel" element={<Cancel />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }





























// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";
// import ForgotPassword from "./pages/ForgotPassword";
// import Chat from "./pages/Chat";
// import FizzBackground from "./components/FizzBackground";
// import { Outlet } from "react-router-dom";
// /* Admin pages */
// import Dashboard from "./pages/Admin/Dashboard";
// import ManageProducts from "./pages/Admin/ManageProducts";
// import ManageUsers from "./pages/Admin/ManageUsers";
// import ManageOrders from "./pages/Admin/ManageOrders";
// import Payments from "./pages/Admin/Payments";
// import ProductDetails from "./pages/ProductDetail";
// import Success from "./pages/Success";
// import Cancel from "./pages/Cancel";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen flex flex-col">
//               <FizzBackground />
//                       <Outlet />


//         <Navbar />
//         <main className="flex-1 container mx-auto px-4 py-6">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/chat" element={<Chat />} />

//             {/* Admin */}
//             <Route path="/admin" element={<Dashboard />} />
//             <Route path="/admin/products" element={<ManageProducts />} />
//             <Route path="/admin/users" element={<ManageUsers />} />
//             <Route path="/admin/orders" element={<ManageOrders />} />
//             <Route path="/admin/payments" element={<Payments />} />

//             <Route path="/payment/success" element={<Success />} />
//             <Route path="/payment/cancel" element={<Cancel />} />

//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }













// // src/App.jsx
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import FizzBackground from "./components/FizzBackground";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";
// import ForgotPassword from "./pages/ForgotPassword";
// import Chat from "./pages/Chat";
// import ProductDetail from "./pages/ProductDetail";

// import Dashboard from "./pages/Admin/Dashboard";
// import ManageProducts from "./pages/Admin/ManageProducts";
// import ManageUsers from "./pages/Admin/ManageUsers";
// import ManageOrders from "./pages/Admin/ManageOrders";
// import Payments from "./pages/Admin/Payments";
// import ProductList from "./pages/ProductList";
// import AdminAds from "./pages/Admin/AdminAds";


// import Success from "./pages/Success";
// import Cancel from "./pages/Cancel";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <FizzBackground />
          

//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-1 container mx-auto px-4 py-6">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             <Route path="/product/:id" element={<ProductDetail />} />
//             <Route path="/products" element={<ProductList />} />

//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/chat" element={<Chat />} />

//             {/* Admin */}
//             <Route path="/admin" element={<Dashboard />} />
//             <Route path="/admin/products" element={<ManageProducts />} />
//             <Route path="/admin/users" element={<ManageUsers />} />
//             <Route path="/admin/orders" element={<ManageOrders />} />
//             <Route path="/admin/payments" element={<Payments />} />

//             <Route path="/payment/success" element={<Success />} />
//             <Route path="/payment/cancel" element={<Cancel />} />
//             <Route path="/admin/ads" element={<AdminAds />} />

//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }


// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FizzBackground from "./components/FizzBackground";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./pages/Chat";
import ProductDetail from "./pages/ProductDetail";

import Dashboard from "./pages/Admin/Dashboard";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageOrders from "./pages/Admin/ManageOrders";
import Payments from "./pages/Admin/Payments";
import ProductList from "./pages/ProductList";
import AdminAds from "./pages/Admin/AdminAds";

import PaymentSuccess from "./pages/PaymentSuccess";
// import Cancel from "./pages/Cancel";

export default function App() {
  return (
    <BrowserRouter>
      <FizzBackground />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products" element={<ProductList />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/chat" element={<Chat />} />

            {/* Admin */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/ads" element={<AdminAds />} />

            {/* Payment Routes */}
            {/* <Route path="/payment/success" element={<PaymentSuccess />} /> */}
                    <Route path="/payment-success" element={<PaymentSuccess />} />

            {/* <Route path="/payment/cancel" element={<Cancel />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
