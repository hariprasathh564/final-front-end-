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
// import Chat from "./pages/Chat";
import ProductDetail from "./pages/ProductDetail";

import Dashboard from "./pages/Admin/Dashboard";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageOrders from "./pages/Admin/ManageOrders";
import Payments from "./pages/Admin/Payments";
import ProductList from "./pages/ProductList";
import AdminAds from "./pages/Admin/AdminAds";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminChats from "./pages/Admin/AdminChats";
// import ChatBotIcon from "./components/ChatBotIcon";
import FloatingChatBot from "./components/FloatingChatBot";
import BusinessDetails from "./pages/BusinessDetails";



import PaymentSuccess from "./pages/PaymentSuccess";
// import Cancel from "./pages/Cancel";

export default function App() {
  return (
    <BrowserRouter>
      <FizzBackground />
                {/* <ChatBotIcon /> */}
                      <FloatingChatBot />


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
            {/* <Route path="/chat" element={<Chat />} /> */}
            {/* Admin */}
            
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/ads" element={<AdminAds />} />
            <Route path="/admin/chats" element={<AdminChats />} />
            {/* <Route path="/chat" element={<ChatBotIcon/>}/> */}
              <Route path="/about" element={<BusinessDetails />} />

            
            
            

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
