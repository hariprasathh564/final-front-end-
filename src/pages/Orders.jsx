import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/myorders").then(res => {
      setOrders(res.data);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.length === 0 && <div>No orders yet</div>}
        {orders.map(o => (
          <div key={o._id} className="border p-3 rounded">
            <div className="flex justify-between">
              <div>Order #{o._id}</div>
              <div className="font-semibold">{o.status}</div>
            </div>
            <div className="mt-2">
              <div>Items: {o.items?.length || 0}</div>
              <div>Total: ₹ {o.total}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
