// import React, { useEffect, useState, useRef } from "react";
// import API from "../api/axiosClient";

// export default function Chat() {
//   const [history, setHistory] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false); // AI typing
//   const chatEndRef = useRef(null); // for auto scroll

//   const load = async () => {
//     try {
//       const res = await API.get("/chats");
//       setHistory(res.data);
//     } catch (err) {
//       setHistory([]);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Auto scroll to bottom whenever history changes
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [history, loading]);

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
//     <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <h2 className="text-3xl font-bold mb-6 text-blue-600">Support Chat</h2>

//       {/* Chat Box */}
//       <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 p-4 border border-gray-200 rounded-2xl shadow-lg bg-white min-h-[70vh] overflow-y-auto space-y-4">
//         {history.map((h) => (
//           <div
//             key={h._id}
//             className="flex flex-col space-y-2 animate-fadeIn duration-300"
//           >
//             {/* User Bubble */}
//             <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-[70%] shadow-md transform transition-all hover:scale-105 animate-fadeInRight">
//               {h.message}
//             </div>

//             {/* Bot Bubble */}
//             <div className="self-start bg-gray-200 px-4 py-2 rounded-2xl max-w-[70%] shadow-md transform transition-all hover:scale-105 animate-fadeInLeft">
//               {h.response}
//             </div>

//             <div className="self-start text-xs text-gray-400">
//               {new Date(h.createdAt).toLocaleString()}
//             </div>
//           </div>
//         ))}

//         {/* Typing Loader */}
//         {loading && (
//           <div className="flex items-center gap-2 mt-2 text-gray-500">
//             <span className="font-medium">Bot is typing</span>
//             <div className="flex gap-1">
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
//             </div>
//           </div>
//         )}

//         {/* Dummy div for auto scroll */}
//         <div ref={chatEndRef} />
//       </div>

//       {/* Input */}
//       <form
//         onSubmit={send}
//         className="flex gap-2 mt-4 w-full md:w-2/3 lg:w-1/2"
//       >
//         <input
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md transition-transform transform hover:scale-105">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }



// import React, { useEffect, useState, useRef } from "react";
// import API from "../api/axiosClient";

// export default function Chat() {
//   const [history, setHistory] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false); // AI typing
//   const chatEndRef = useRef(null); // for auto scroll

//   const load = async () => {
//     try {
//       const res = await API.get("/chats");
//       setHistory(res.data);
//     } catch (err) {
//       setHistory([]);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   // Auto scroll to bottom whenever history changes
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [history, loading]);

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
//     <div className="fixed bottom-4 right-4 w-full md:w-96 lg:w-96 flex flex-col items-end z-50">
//       {/* Chat Header */}
//       <div className="bg-blue-600 text-white font-bold px-4 py-2 rounded-t-2xl shadow-lg cursor-pointer animate-fadeIn">
//         Support Chat
//       </div>

//       {/* Chat Box */}
//       <div className="flex flex-col p-4 border border-gray-200 rounded-b-2xl shadow-lg bg-white max-h-[70vh] w-full overflow-y-auto animate-fadeInUp">
//         {history.map((h) => (
//           <div
//             key={h._id}
//             className="flex flex-col space-y-2 my-2 animate-fadeIn duration-300"
//           >
//             {/* User Bubble */}
//             <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-[70%] shadow-md transform transition-all hover:scale-105 animate-fadeInRight">
//               {h.message}
//             </div>

//             {/* Bot Bubble */}
//             <div className="self-start bg-gray-200 px-4 py-2 rounded-2xl max-w-[70%] shadow-md transform transition-all hover:scale-105 animate-fadeInLeft">
//               {h.response}
//             </div>

//             <div className="self-start text-xs text-gray-400">
//               {new Date(h.createdAt).toLocaleString()}
//             </div>
//           </div>
//         ))}

//         {/* Typing Loader */}
//         {loading && (
//           <div className="flex items-center gap-2 mt-2 text-gray-500">
//             <span className="font-medium">Bot is typing</span>
//             <div className="flex gap-1">
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
//               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
//             </div>
//           </div>
//         )}

//         <div ref={chatEndRef} />
//       </div>

//       {/* Input */}
//       <form
//         onSubmit={send}
//         className="flex gap-2 mt-2 w-full animate-fadeInUp"
//       >
//         <input
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md transition-transform transform hover:scale-105">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
