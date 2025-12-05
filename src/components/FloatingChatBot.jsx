// // frontend/src/components/FloatingChatBot.jsx
// import React, { useState, useEffect } from "react";
// import API from "../api/axiosClient";
// import { FaRobot } from "react-icons/fa";


// export default function FloatingChatBot() {
//   const [open, setOpen] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load chat history
//   const load = async () => {
//     try {
//       const res = await API.get("/chats");
//       setHistory(res.data);
//     } catch {
//       setHistory([]);
//     }
//   };

//   useEffect(() => {
//     if (open) load(); // Load only when chatbox is opened
//   }, [open]);

//   const send = async (e) => {
//     e.preventDefault();
//     if (!msg) return;

//     setLoading(true);
//     try {
//       await API.post("/chats", { message: msg });
//       setMsg("");
//       setLoading(false);
//       load();
//     } catch (err) {
//       setLoading(false);
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       {/* Floating Bot Icon */}
//       <div className="fixed bottom-5 right-5 z-50">
//         <button
//           onClick={() => setOpen(!open)}
//           className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
//           title="Open Chat"
//         >
//           <FaRobot size={28} className="text-white" />
//         </button>
//       </div>

//       {/* Chat Box */}
//       <div
//         className={`fixed bottom-24 right-5 z-50 w-80 max-w-[90vw] bg-white rounded-xl shadow-xl border transition-all duration-500 transform ${
//           open
//             ? "opacity-100 translate-y-0 pointer-events-auto"
//             : "opacity-0 translate-y-20 pointer-events-none"
//         }`}
//       >
//         <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-xl">
//           <h3 className="font-bold">Support Chat</h3>
//           <button
//             onClick={() => setOpen(false)}
//             className="text-white font-bold hover:text-gray-200"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="p-3 h-72 overflow-auto bg-gray-50">
//           {history.map((h) => (
//             <div key={h._id} className="mb-4">
//               <div className="flex justify-end">
//                 <div className="bg-blue-600 text-white px-3 py-2 rounded-xl max-w-[70%]">
//                   {h.message}
//                 </div>
//               </div>

//               <div className="flex justify-start mt-1">
//                 <div className="bg-gray-200 px-3 py-2 rounded-xl max-w-[70%]">
//                   {h.response}
//                 </div>
//               </div>

//               <div className="text-xs text-gray-500 mt-1">
//                 {new Date(h.createdAt).toLocaleString()}
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex items-center gap-2 mt-2 text-gray-500">
//               <span className="font-medium">Bot is typing</span>
//               <div className="flex gap-1">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
//                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
//               </div>
//             </div>
//           )}
//         </div>

//         <form onSubmit={send} className="flex gap-2 p-3 border-t">
//           <input
//             value={msg}
//             onChange={(e) => setMsg(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
//             Send
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }



// frontend/src/components/FloatingChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import API from "../api/axiosClient";
import { FaRobot } from "react-icons/fa";

export default function FloatingChatBot() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Load chat history
  const load = async () => {
    try {
      const res = await API.get("/chats");
      setHistory(res.data);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    if (open) load(); // Load only when chatbox opens
  }, [open]);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, loading]);

  const send = async (e) => {
    e.preventDefault();
    if (!msg) return;

    setLoading(true);
    try {
      await API.post("/chats", { message: msg });
      setMsg("");
      setLoading(false);
      load();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Bot Icon */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
          title="Open Chat"
        >
          <FaRobot size={28} className="text-white animate-bounce-slow" />
        </button>
      </div>

      {/* Chat Box as Milk Soda Bottle Animation */}
      <div
        className={`fixed bottom-24 right-5 z-50 w-80 max-w-[90vw] bg-white rounded-xl shadow-2xl border flex flex-col transform transition-all duration-700 origin-bottom
          ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
        style={{
          transformOrigin: "bottom center",
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-xl">
          <h3 className="font-bold">Support Chat</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-white font-bold hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-3 max-h-96">
          {history.map((h) => (
            <div key={h._id} className="flex flex-col space-y-1">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-3 py-2 rounded-xl max-w-[70%] shadow-md transform hover:scale-105 transition duration-200">
                  {h.message}
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-gray-200 px-3 py-2 rounded-xl max-w-[70%] shadow-inner transform hover:scale-105 transition duration-200">
                  {h.response}
                </div>
              </div>

              <div className="text-xs text-gray-500 mt-1 self-end">
                {new Date(h.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 mt-2 text-gray-500">
              <span className="font-medium">COW is typing</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={send} className="flex gap-2 p-3 border-t bg-white">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
