import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/orders"); // backend admin route may differ
        setOrders(res.data);
      } catch (err) {
        setOrders([]);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o._id} className="border p-3 rounded">
            <div className="flex justify-between">
              <div>Order #{o._id}</div>
              <div>{o.status}</div>
            </div>
            <div className="text-sm mt-1">Total: ₹ {o.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
