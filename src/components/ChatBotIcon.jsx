// frontend/src/components/ChatBotIcon.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

export default function ChatBotIcon() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/chat")}
      className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
      title="Chat with Support"
    >
      <FaRobot size={28} className="text-white" />
    </div>
  );
}
