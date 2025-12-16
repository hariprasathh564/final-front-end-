

// import React, { useState, useEffect, useRef } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const { register } = useAuth();
//   const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
//   const [err, setErr] = useState("");
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [hoverCard, setHoverCard] = useState(false);
//   const navigate = useNavigate();
//   const fizzSoundRef = useRef(null);

//   const submit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     try {
//       await register(form);
//       navigate("/");
//     } catch (error) {
//       setErr(error.response?.data?.message || error.message || "Registration failed");
//     }
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const playFizz = () => {
//     if (fizzSoundRef.current) {
//       fizzSoundRef.current.currentTime = 0;
//       fizzSoundRef.current.play();
//     }
//   };

//   const particleCount = hoverCard ? 50 : 30;
//   const particles = [...Array(particleCount)].map((_, i) => {
//     const size = Math.random() * 25 + 10;
//     const baseX = Math.random() * window.innerWidth;
//     const baseY = Math.random() * window.innerHeight;
//     const offsetX = (mousePos.x - window.innerWidth / 2) * 0.02;
//     const offsetY = (mousePos.y - window.innerHeight / 2) * 0.02;
//     return (
//       <div
//         key={i}
//         className="absolute rounded-full opacity-50 bubble"
//         style={{
//           width: `${size}px`,
//           height: `${size}px`,
//           top: `${baseY + offsetY}px`,
//           left: `${baseX + offsetX}px`,
//           background: `rgba(255,255,255,${Math.random() * 0.4 + 0.2})`,
//           boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255,255,255,0.5)`,
//           animation: `floatUp ${Math.random() * (hoverCard ? 10 : 20) + 5}s ease-in-out infinite`,
//           animationDelay: `${Math.random() * 5}s`,
//         }}
//       >
//         <div className={`sparkle ${hoverCard ? "sparkle-hover" : ""}`}></div>
//       </div>
//     );
//   });

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden">
//       <audio ref={fizzSoundRef} src="/fizz.mp3" preload="auto" />

//       {/* Milk froth swirling effect */}
//       <div className="absolute inset-0 -z-20 overflow-hidden">
//         <div className="milk-froth layer1"></div>
//         <div className="milk-froth layer2"></div>
//       </div>

//       <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-gradient-x -z-10"></div>
//       <div className="absolute inset-0 -z-10">{particles}</div>

//       <div className="flex justify-center mt-24 px-4 sm:px-6 lg:px-8">
//         <div
//           className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-500 border border-white/20 animate-card-float"
//           onMouseEnter={() => setHoverCard(true)}
//           onMouseLeave={() => setHoverCard(false)}
//         >
//           <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center">
//             Create Your Account
//           </h2>
//           {err && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
//               {err}
//             </div>
//           )}
//           <form onSubmit={submit} className="space-y-4 sm:space-y-5 relative">
//             <div className="relative fizz-container">
//               <input
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 placeholder="Full Name"
//                 onFocus={playFizz}
//                 className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-300 bg-white/80 relative z-10"
//               />
//               <div className="absolute inset-0 pointer-events-none fizz"></div>
//             </div>
//             <div className="relative fizz-container">
//               <input
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 placeholder="Email"
//                 onFocus={playFizz}
//                 className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-300 bg-white/80 relative z-10"
//               />
//               <div className="absolute inset-0 pointer-events-none fizz"></div>
//             </div>
//             <div className="relative fizz-container">
//               <input
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 placeholder="Phone"
//                 onFocus={playFizz}
//                 className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-300 bg-white/80 relative z-10"
//               />
//               <div className="absolute inset-0 pointer-events-none fizz"></div>
//             </div>
//             <div className="relative fizz-container">
//               <input
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 placeholder="Password"
//                 type="password"
//                 onFocus={playFizz}
//                 className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-300 bg-white/80 relative z-10"
//               />
//               <div className="absolute inset-0 pointer-events-none fizz"></div>
//             </div>

//             {/* Button with Login style */}
//             <button
//               type="submit"
//               className="relative w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:from-cyan-500 hover:to-blue-500 transition-colors duration-300 overflow-hidden"
//               onMouseEnter={playFizz}
//             >
//               Create Account
//               <div className="absolute inset-0 pointer-events-none button-fizz"></div>
//             </button>
//           </form>
//         </div>
//       </div>

//       <style>
//         {`
//         @keyframes gradient-x {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
//         .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 15s ease infinite; }

//         @keyframes floatUp { 0%{transform:translateY(0)}50%{transform:translateY(-50px)}100%{transform:translateY(0)} }
//         @keyframes card-float {0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-5px) scale(1.02);} }
//         .animate-card-float { animation: card-float 6s ease-in-out infinite; }

//         .fizz-container:focus-within .fizz::before,
//         .fizz-container:focus-within .fizz::after { content:''; position:absolute; width:4px; height:4px; background:white; border-radius:50%; animation:bubbleUp 2s infinite ease-in-out; }
//         @keyframes bubbleUp {0%{transform:translateY(0) scale(1);opacity:1}50%{transform:translateY(-15px) scale(1.2);opacity:0.7}100%{transform:translateY(0) scale(1);opacity:1}}

//         .button-fizz::before,.button-fizz::after { content:''; position:absolute; width:6px;height:6px;border-radius:50%; background: rgba(255,255,255,0.7); top:50%; left:50%; transform: translate(-50%, -50%); animation:bubbleUpButton 1.5s infinite ease-in-out;}
//         @keyframes bubbleUpButton { 0%{transform:translate(-50%,0) scale(1);opacity:1}50%{transform:translate(-50%,-20px) scale(1.3);opacity:0.6}100%{transform:translate(-50%,0) scale(1);opacity:1} }

//         .bubble .sparkle { position:absolute; top:50%; left:50%; width:3px; height:3px; background: rgba(255,255,255,0.8); border-radius:50%; transform:translate(-50%,-50%); animation: sparkle 1.5s infinite ease-in-out; }
//         .bubble .sparkle-hover { animation-duration:0.8s; transform:translate(-50%,-50%) scale(1.5); }
//         @keyframes sparkle {0%{transform:translate(-50%, -50%) scale(1); opacity:0.8;}50%{transform:translate(-50%, -60%) scale(1.5);opacity:0.3;}100%{transform:translate(-50%, -50%) scale(1);opacity:0.8;} }

//         /* Milk froth */
//         .milk-froth { position:absolute; width:200%; height:200%; top:-50%; left:-50%; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%); border-radius:50%; animation: swirl 60s linear infinite; pointer-events:none; }
//         .layer2 { animation-duration:90s; transform: scale(1.3); }
//         @keyframes swirl {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);} }
//         `}
//       </style>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";
import { AlertCircle, Loader2, Check, Eye, EyeOff, Sparkles, User, Mail, Phone, KeyRound } from "lucide-react";

// --- CONFIGURATION ---
const SPRING_CONFIG = { stiffness: 400, damping: 30 };

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const shakeControls = useAnimation();

  // --- STATE ---
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusState, setFocusState] = useState("none"); // 'name', 'email', 'phone', 'password', 'none'

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, SPRING_CONFIG), [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(useSpring(x, SPRING_CONFIG), [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // --- SUBMIT HANDLER ---
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    
    // Validation
    if(!formData.name || !formData.email || !formData.phone || !formData.password) {
      setErr("Please fill all the cups!");
      shakeControls.start({ x: [0, -15, 15, -15, 15, 0], transition: { duration: 0.4 } });
      return;
    }

if(!formData.name)
       setErr("please fill the name");
if(!formData.email)
      setErr("please fill the email");
 if(!formData.phone)
 setErr("please fill the phone");
if(!formData.password)
     setErr("please fill the password");


//  const submit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     if(!formData.name)
//       setErr("please fill the name");}

//      const submit1 = async (e) => {
//     e.preventDefault();
//     setErr("");
//     if(!formData.email)
//       setErr("please fill the email");

//      const submit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     if(!formData.phone)
//       setErr("please fill the phone");}

//      const submit3 = async (e) => {
//     e.preventDefault();
//     setErr("");
//     if(!formData.password)
//       setErr("please fill the password");}

//      shakeControls.start({ x: [0, -15, 15, -15, 15, 0], transition: { duration: 0.4 } });
//       return;
//   }
    setIsLoading(true);
    
    // Simulate Network Delay for Animation
    await new Promise(r => setTimeout(r, 1500)); 

    try {
      await register(formData);
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 1200); // Wait for confetti
    } catch (error) {
      setIsLoading(false);
      setErr(error.response?.data?.message || "Registration failed. Try again!");
      shakeControls.start({ x: [0, -15, 15, -15, 15, 0], transition: { duration: 0.4 } });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate Liquid Background Position based on 4 inputs
  const getLiquidPosition = () => {
    switch(focusState) {
        case 'name': return 0;
        case 'email': return 76;
        case 'phone': return 152;
        case 'password': return 228;
        default: return 0;
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden bg-slate-100 flex items-center justify-center font-sans perspective-2000 py-10"
      onMouseMove={handleMouseMove}
    >
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <motion.div animate={{ x: [0, 50, 0], y: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
        <motion.div animate={{ x: [0, -50, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      {/* --- CONFETTI (On Success) --- */}
      <AnimatePresence>
        {isSuccess && <Confetti />}
      </AnimatePresence>

      {/* --- CARD CONTAINER --- */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative z-20 w-full max-w-[420px] px-4"
      >
        {/* MASCOT CHARACTER */}
        <Mascot 
          focusState={focusState} 
          // Track name length for eye movement
          textLength={formData.name.length} 
          showPassword={showPassword}
        />

        {/* MAIN CARD */}
        <motion.div 
          animate={shakeControls}
          className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8"
        >
          {/* Header */}
          <div className="text-center mb-6 mt-4">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter">
              Join <span className="text-blue-500">MilkSoda</span>
            </h2>
            <p className="text-xs font-bold text-gray-400 mt-1 tracking-wide uppercase">Create your account</p>
          </div>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {err && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} /> {err}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={submit} className="space-y-4 relative">
            
            {/* Liquid Background for Inputs (Dynamic Height Calculation) */}
            <motion.div 
              className="absolute bg-blue-100 rounded-2xl -z-10 pointer-events-none"
              initial={false}
              animate={{
                top: getLiquidPosition(),
                height: 64,
                width: "100%",
                opacity: focusState === 'none' ? 0 : 1,
                scale: focusState === 'none' ? 0.95 : 1.05,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />

            {/* 1. Name */}
            <BouncyInput 
              icon={User}
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Full Name"
              isFocused={focusState === 'name'}
              onFocus={() => setFocusState('name')}
              onBlur={() => setFocusState('none')}
            />

            {/* 2. Email */}
            <BouncyInput 
              icon={Mail}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Email Address"
              isFocused={focusState === 'email'}
              onFocus={() => setFocusState('email')}
              onBlur={() => setFocusState('none')}
            />

            {/* 3. Phone */}
            <BouncyInput 
              icon={Phone}
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Phone Number"
              isFocused={focusState === 'phone'}
              onFocus={() => setFocusState('phone')}
              onBlur={() => setFocusState('none')}
            />

            {/* 4. Password */}
            <BouncyInput 
              icon={KeyRound}
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Password"
              isFocused={focusState === 'password'}
              onFocus={() => setFocusState('password')}
              onBlur={() => setFocusState('none')}
              rightElement={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-blue-500">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {/* Spacer */}
            <div className="h-2"></div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || isSuccess}
              className={`
                relative w-full h-14 rounded-2xl font-black text-white text-lg overflow-hidden shadow-lg group
                ${isSuccess ? "bg-green-500" : "bg-gradient-to-r from-blue-600 to-cyan-500"} transition-colors duration-500
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : isSuccess ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1.5 }}><Check /></motion.div>
                ) : (
                  <>Register <Sparkles size={18} /></>
                )}
              </div>
            </motion.button>
          </form>

          <div className="mt-6 text-center text-xs font-bold text-gray-400">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </div>
        </motion.div>
      </motion.div>
      
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const BouncyInput = ({ icon: Icon, type, value, onChange, placeholder, isFocused, onFocus, onBlur, rightElement }) => {
  return (
    <motion.div animate={isFocused ? { scale: 1.02 } : { scale: 1 }} className="relative">
      <div className={`
        relative h-16 bg-white rounded-2xl border-2 flex items-center px-4 transition-all duration-300
        ${isFocused ? "border-blue-400 shadow-lg shadow-blue-200/50" : "border-transparent shadow-sm"}
      `}>
        <div className={`mr-3 transition-colors ${isFocused ? "text-blue-500" : "text-gray-300"}`}>
          <Icon size={22} />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none font-bold text-gray-700 placeholder-gray-300 h-full text-sm"
        />
        {rightElement && <div className="ml-2">{rightElement}</div>}
      </div>
    </motion.div>
  );
};

const Mascot = ({ focusState, textLength, showPassword }) => {
  const lookX = useSpring(0);
  const lookY = useSpring(0);

  useEffect(() => {
    // Mascot looks around based on which field is active
    if (focusState === 'name' || focusState === 'email') {
        // Track typing for top fields
        lookX.set(Math.min(textLength, 25) - 10); 
        lookY.set(5);
    } else if (focusState === 'phone') {
        // Look down for phone
        lookX.set(0);
        lookY.set(12);
    } else if (focusState === 'password') {
        // Scared / Hiding
        lookX.set(0);
        lookY.set(-5); 
    } else {
        // Neutral
        lookX.set(0);
        lookY.set(0);
    }
  }, [focusState, textLength, lookX, lookY]);

  const isHiding = focusState === 'password' && !showPassword;

  return (
    <div className="absolute -top-20 left-0 w-full flex justify-center pointer-events-none z-30">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          <motion.path 
            d="M100 30 C 100 30, 30 120, 30 140 C 30 180, 60 195, 100 195 C 140 195, 170 180, 170 140 C 170 120, 100 30, 100 30 Z" 
            fill="white"
            animate={{ d: ["M100 30 C 100 30, 30 120, 30 140 C 30 180, 60 195, 100 195 C 140 195, 170 180, 170 140 C 170 120, 100 30, 100 30 Z", "M100 35 C 100 35, 35 125, 35 142 C 35 182, 63 198, 100 198 C 137 198, 165 182, 165 142 C 165 125, 100 35, 100 35 Z"] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
          <motion.div className="flex gap-4" style={{ x: lookX, y: lookY }}>
            <div className="w-4 h-6 bg-slate-800 rounded-full"><div className="w-1.5 h-1.5 bg-white rounded-full mt-1 ml-1" /></div>
            <div className="w-4 h-6 bg-slate-800 rounded-full"><div className="w-1.5 h-1.5 bg-white rounded-full mt-1 ml-1" /></div>
          </motion.div>
          <motion.div className="w-2 h-1 bg-pink-300 rounded-full mt-2" animate={{ scale: focusState !== 'none' ? 1.5 : 1 }} />
        </div>
        <motion.div
          className="absolute top-16 left-6 w-8 h-8 bg-white rounded-full border shadow-md"
          animate={isHiding ? { y: 0, x: 15, rotate: 0 } : { y: 40, x: -10, rotate: -20 }}
        />
        <motion.div
          className="absolute top-16 right-6 w-8 h-8 bg-white rounded-full border shadow-md"
          animate={isHiding ? { y: 0, x: -15, rotate: 0 } : { y: 40, x: 10, rotate: 20 }}
        />
      </div>
    </div>
  );
};

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full"
        style={{ backgroundColor: ['#60A5FA', '#F472B6', '#34D399', '#FBBF24'][i % 4] }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={{ x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 800, opacity: 0, scale: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    ))}
  </div>
);