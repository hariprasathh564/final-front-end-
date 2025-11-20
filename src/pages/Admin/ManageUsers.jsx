// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await API.get("/users"); // NOTE: backend must provide admin users route; if not, remove
//         setUsers(res.data);
//       } catch (err) {
//         setUsers([]);
//       }
//     };
//     load();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
//       <div className="space-y-2">
//         {users.map(u => (
//           <div key={u._id} className="border p-3 rounded">
//             <div className="flex justify-between">
//               <div>{u.name} — {u.email}</div>
//               <div>{u.role}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





// frontend/src/pages/Admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user" });
  const [editingId, setEditingId] = useState(null);

  // Load users
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/users"); // Backend route must be admin-protected
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/users/${editingId}`, formData);
        setEditingId(null);
      } else {
        await API.post("/users", formData);
      }
      setFormData({ name: "", email: "", role: "user" });
      loadUsers();
    } catch (err) {
      console.error("Failed to save user:", err);
      alert("Failed to save user");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* User Form */}
      <form className="mb-6 space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {editingId ? "Update User" : "Add User"}
        </button>
        {editingId && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded ml-2"
            onClick={() => {
              setEditingId(null);
              setFormData({ name: "", email: "", role: "user" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Users Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="border px-4 py-2">{u.name}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2">{u.role}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      className="px-2 py-1 bg-yellow-400 text-white rounded mr-2"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
