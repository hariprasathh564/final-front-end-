import React, { useState } from "react";
import API from "../api/axiosClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMsg(res.data.message || "OTP sent to your email");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Forgot Password</h2>
      {msg && <div className="mb-3">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <button className="bg-sky-600 text-white px-4 py-2 rounded">Send OTP</button>
      </form>
      <div className="mt-3 text-sm">Use the OTP sent to your email to reset password via backend route /auth/reset-password (separate page not included here).</div>
    </div>
  );
}
