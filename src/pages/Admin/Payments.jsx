import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import AdminLayout from "./AdminLayout";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/payments");
        setPayments(res.data);
      } catch (err) {
        setPayments([]);
      }
    };
    load();
  }, []);

  return (
    <AdminLayout>
    <div>
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      <div className="space-y-3">
        {payments.map(p => (
          <div key={p._id} className="border p-3 rounded">
            <div>Amount: Rs {p.amount}</div>
            <div>Status: {p.status}</div>
            <div>Provider id: {p.payment_provider_id}</div>
          </div>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
}
