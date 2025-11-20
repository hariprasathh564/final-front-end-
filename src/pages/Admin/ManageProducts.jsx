import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: 0, description: "", category: "Milk", images: [] });
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      await API.post("/products", form);
      setForm({ name: "", price: 0, description: "", category: "Milk", images: [] });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const del = async (id) => {
    if (!confirm("Delete product?")) return;
    await API.delete(`/products/${id}`);
    load();
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price, description: p.description, category: p.category, images: p.images || [] });
  };

  const update = async () => {
    await API.put(`/products/${editing._id}`, form);
    setEditing(null);
    load();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <div className="mb-4 p-4 border rounded">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="border p-2 w-full mb-2"/>
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} className="border p-2 w-full mb-2"/>
        <input placeholder="Image URL (comma separated)" value={(form.images||[]).join(",")} onChange={e=>setForm({...form, images: e.target.value.split(",").map(s=>s.trim())})} className="border p-2 w-full mb-2" />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="border p-2 w-full mb-2"></textarea>
        {editing ? <button onClick={update} className="bg-green-600 text-white px-3 py-1 rounded">Update</button> : <button onClick={create} className="bg-sky-600 text-white px-3 py-1 rounded">Create</button>}
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div key={p._id} className="flex items-center justify-between border p-3 rounded">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">₹ {p.price}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
              <button onClick={() => del(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
