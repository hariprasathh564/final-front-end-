// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     try {
//       await login(email, password);
//       navigate("/");
//     } catch (error) {
//       setErr(error.response?.data?.message || error.message || "Login failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       {err && <div className="bg-red-100 text-red-700 p-2 mb-3">{err}</div>}
//       <form onSubmit={submit} className="space-y-3">
//         <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
//         <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
//         <div className="flex justify-between items-center">
//           <button className="bg-sky-600 text-white px-4 py-2 rounded">Login</button>
//           <Link to="/forgot-password" className="text-sm text-sky-600">Forgot?</Link>
//         </div>
//       </form>
//       <div className="mt-4 text-sm">
//         Don't have an account? <Link to="/register" className="text-sky-600">Register</Link>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoverCard, setHoverCard] = useState(false);
  const navigate = useNavigate();
  const fizzSoundRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || error.message || "Login failed");
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const playFizz = () => {
    if (fizzSoundRef.current) {
      fizzSoundRef.current.currentTime = 0;
      fizzSoundRef.current.play();
    }
  };

  const particleCount = hoverCard ? 50 : 30;
  const particles = [...Array(particleCount)].map((_, i) => {
    const size = Math.random() * 25 + 10;
    const baseX = Math.random() * window.innerWidth;
    const baseY = Math.random() * window.innerHeight;
    const offsetX = (mousePos.x - window.innerWidth / 2) * 0.02;
    const offsetY = (mousePos.y - window.innerHeight / 2) * 0.02;
    return (
      <div
        key={i}
        className="absolute rounded-full opacity-50 bubble"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${baseY + offsetY}px`,
          left: `${baseX + offsetX}px`,
          background: `rgba(255,255,255,${Math.random() * 0.4 + 0.2})`,
          boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255,255,255,0.5)`,
          animation: `floatUp ${Math.random() * (hoverCard ? 10 : 20) + 5}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      >
        <div className={`sparkle ${hoverCard ? "sparkle-hover" : ""}`}></div>
      </div>
    );
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden rounded-3xl">
      <audio ref={fizzSoundRef} src="/fizz.mp3" preload="auto" />

      {/* Milk froth swirling effect */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="milk-froth layer1"></div>
        <div className="milk-froth layer2"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-gradient-x -z-10"></div>
      <div className="absolute inset-0 -z-10">{particles}</div>

      <div className="flex justify-center mt-24 px-4 sm:px-6 lg:px-8">
        <div
          className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-500 border border-white/20 animate-card-float"
          onMouseEnter={() => setHoverCard(true)}
          onMouseLeave={() => setHoverCard(false)}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>
          {err && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
              {err}
            </div>
          )}
          <form onSubmit={submit} className="space-y-4 sm:space-y-5 relative">
            <div className="relative fizz-container">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                onFocus={playFizz}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-300 bg-white/80 relative z-10"
              />
              <div className="absolute inset-0 pointer-events-none fizz"></div>
            </div>
            <div className="relative fizz-container">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                onFocus={playFizz}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition duration-300 bg-white/80 relative z-10"
              />
              <div className="absolute inset-0 pointer-events-none fizz"></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 relative">
              <button
                className="relative w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:from-cyan-500 hover:to-blue-500 transition-colors duration-300 overflow-hidden"
                onMouseEnter={playFizz}
              >
                Login
                <div className="absolute inset-0 pointer-events-none button-fizz"></div>
              </button>
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot?
              </Link>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-gray-700/90">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-semibold hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 15s ease infinite; }

        @keyframes floatUp { 0%{transform:translateY(0)}50%{transform:translateY(-50px)}100%{transform:translateY(0)} }
        @keyframes card-float {0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-5px) scale(1.02);} }
        .animate-card-float { animation: card-float 6s ease-in-out infinite; }

        .fizz-container:focus-within .fizz::before,
        .fizz-container:focus-within .fizz::after { content:''; position:absolute; width:4px; height:4px; background:white; border-radius:50%; animation:bubbleUp 2s infinite ease-in-out; }
        @keyframes bubbleUp {0%{transform:translateY(0) scale(1);opacity:1}50%{transform:translateY(-15px) scale(1.2);opacity:0.7}100%{transform:translateY(0) scale(1);opacity:1}}

        .button-fizz::before,.button-fizz::after { content:''; position:absolute; width:6px;height:6px;border-radius:50%; background: rgba(255,255,255,0.7); top:50%; left:50%; transform: translate(-50%, -50%); animation:bubbleUpButton 1.5s infinite ease-in-out;}
        @keyframes bubbleUpButton { 0%{transform:translate(-50%,0) scale(1);opacity:1}50%{transform:translate(-50%,-20px) scale(1.3);opacity:0.6}100%{transform:translate(-50%,0) scale(1);opacity:1} }

        .bubble .sparkle { position:absolute; top:50%; left:50%; width:3px; height:3px; background: rgba(255,255,255,0.8); border-radius:50%; transform:translate(-50%,-50%); animation: sparkle 1.5s infinite ease-in-out; }
        .bubble .sparkle-hover { animation-duration:0.8s; transform:translate(-50%,-50%) scale(1.5); }
        @keyframes sparkle {0%{transform:translate(-50%, -50%) scale(1); opacity:0.8;}50%{transform:translate(-50%, -60%) scale(1.5);opacity:0.3;}100%{transform:translate(-50%, -50%) scale(1);opacity:0.8;} }

        /* Milk froth */
        .milk-froth { position:absolute; width:200%; height:200%; top:-50%; left:-50%; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%); border-radius:50%; animation: swirl 60s linear infinite; pointer-events:none; }
        .layer2 { animation-duration:90s; transform: scale(1.3); }
        @keyframes swirl {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);} }
        `}
      </style>
    </div>
  );
}
