import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";

export default function Chat() {
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const res = await API.get("/chats");
      setHistory(res.data);
    } catch (err) {
      setHistory([]);
    }
  };

  useEffect(() => { load(); }, []);

  const send = async (e) => {
    e.preventDefault();
    if (!msg) return;
    try {
      await API.post("/chats", { message: msg });
      setMsg("");
      load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Support Chat</h2>
      <div className="border p-3 h-64 overflow-auto mb-3">
        {history.map(h => (
          <div key={h._id} className="mb-3">
            <div className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleString()}</div>
            <div><strong>You: </strong>{h.message}</div>
            <div><strong>Bot: </strong>{h.response}</div>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type your message..." className="flex-1 p-2 border rounded" />
        <button className="bg-sky-600 text-white px-3 py-2 rounded">Send</button>
      </form>
    </div>
  );
}
