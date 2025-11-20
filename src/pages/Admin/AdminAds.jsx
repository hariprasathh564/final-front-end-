// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";

// export default function AdminAds() {
//   const [ads, setAds] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     buttonText: "",
//     buttonLink: "",
//     link: "",
//     image: ""
//   });
//   const [editingId, setEditingId] = useState(null);

//   // Load ads
//   const loadAds = async () => {
//     try {
//       const res = await API.get("/ads");
//       setAds(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load ads");
//     }
//   };

//   useEffect(() => {
//     loadAds();
//   }, []);

//   // Upload image
//   const uploadImage = async () => {
//     if (!selectedFile) return alert("Select a file first");
//     const data = new FormData();
//     data.append("image", selectedFile);
//     try {
//       const res = await API.post("/ads/upload", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       setFormData({ ...formData, image: res.data.image });
//       alert("Image uploaded successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   // Create or update ad
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) return alert("Upload an image first");

//     try {
//       if (editingId) {
//         await API.put(`/ads/${editingId}`, formData);
//         setEditingId(null);
//       } else {
//         await API.post("/ads", formData);
//       }
//       setFormData({ title: "", subtitle: "", buttonText: "", buttonLink: "", link: "", image: "" });
//       setSelectedFile(null);
//       loadAds();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save ad");
//     }
//   };

//   // Delete ad
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this ad?")) return;
//     try {
//       await API.delete(`/ads/${id}`);
//       loadAds();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete ad");
//     }
//   };

//   // Edit ad
//   const handleEdit = (ad) => {
//     setEditingId(ad._id);
//     setFormData({
//       title: ad.title || "",
//       subtitle: ad.subtitle || "",
//       buttonText: ad.buttonText || "",
//       buttonLink: ad.buttonLink || "",
//       link: ad.link || "",
//       image: ad.image || ""
//     });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin: Manage Ads</h1>

//       {/* Form */}
//       <form className="mb-6 space-y-2" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Subtitle"
//           value={formData.subtitle}
//           onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Button Text"
//           value={formData.buttonText}
//           onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Button Link"
//           value={formData.buttonLink}
//           onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
//           className="border p-2 w-full rounded"
//         />
//         <input
//           type="text"
//           placeholder="Ad Link"
//           value={formData.link}
//           onChange={(e) => setFormData({ ...formData, link: e.target.value })}
//           className="border p-2 w-full rounded"
//         />

//         {/* Image Upload */}
//         <div className="flex items-center gap-2">
//           <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
//           <button type="button" onClick={uploadImage} className="px-4 py-2 bg-blue-500 text-white rounded">
//             Upload Image
//           </button>
//         </div>

//         {/* Image Preview */}
//         {formData.image && (
//           <img src={formData.image} alt="Preview" className="w-64 h-32 object-cover mt-2 rounded" />
//         )}

//         <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded mt-2">
//           {editingId ? "Update Ad" : "Create Ad"}
//         </button>
//       </form>

//       {/* Ads List */}
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//         {ads.map((ad) => (
//           <div key={ad._id} className="border p-2 rounded shadow">
//             <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover rounded mb-2" />
//             <h2 className="font-bold">{ad.title}</h2>
//             <p className="text-sm">{ad.subtitle}</p>
//             <div className="flex gap-2 mt-2">
//               <button onClick={() => handleEdit(ad)} className="px-2 py-1 bg-yellow-400 rounded text-white">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(ad._id)} className="px-2 py-1 bg-red-500 rounded text-white">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }










// frontend/src/pages/Admin/AdminAds.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";

export default function AdminAds() {
  // Ads
  const [ads, setAds] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    link: "",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Load ads
  const loadAds = async () => {
    try {
      const res = await API.get("/ads");
      setAds(res.data);
    } catch (err) {
      console.error("Failed to load ads", err);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  // Upload image
  const uploadImage = async () => {
    if (!selectedFile) return alert("Select a file first");
    const data = new FormData();
    data.append("image", selectedFile);
    try {
      const res = await API.post("/ads/upload", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFormData({ ...formData, image: res.data.image });
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Create or update ad
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Upload an image first");

    try {
      if (editingId) {
        await API.put(`/ads/${editingId}`, formData);
        setEditingId(null);
      } else {
        await API.post("/ads", formData);
      }
      setFormData({ title: "", subtitle: "", buttonText: "", buttonLink: "", link: "", image: "" });
      setSelectedFile(null);
      loadAds();
    } catch (err) {
      console.error(err);
      alert("Failed to save ad");
    }
  };

  // Delete ad
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ad?")) return;
    try {
      await API.delete(`/ads/${id}`);
      loadAds();
    } catch (err) {
      console.error(err);
      alert("Failed to delete ad");
    }
  };

  // Edit ad
  const handleEdit = (ad) => {
    setEditingId(ad._id);
    setFormData({
      title: ad.title || "",
      subtitle: ad.subtitle || "",
      buttonText: ad.buttonText || "",
      buttonLink: ad.buttonLink || "",
      link: ad.link || "",
      image: ad.image || ""
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Homepage Ads</h2>

      {/* Form */}
      <form className="mb-6 space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Button Text"
          value={formData.buttonText}
          onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Button Link"
          value={formData.buttonLink}
          onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Ad Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="border p-2 w-full rounded"
        />

        {/* Image Upload */}
        <div className="flex items-center gap-2">
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button type="button" onClick={uploadImage} className="px-4 py-2 bg-blue-500 text-white rounded">
            Upload Image
          </button>
        </div>

        {formData.image && (
          <img src={formData.image} alt="Preview" className="w-64 h-32 object-cover mt-2 rounded" />
        )}

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded mt-2">
          {editingId ? "Update Ad" : "Create Ad"}
        </button>
      </form>

      {/* Ads List */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {ads.map((ad) => (
          <div key={ad._id} className="border p-2 rounded shadow">
            <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover rounded mb-2" />
            <h4 className="font-bold">{ad.title}</h4>
            <p className="text-sm">{ad.subtitle}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(ad)} className="px-2 py-1 bg-yellow-400 rounded text-white">
                Edit
              </button>
              <button onClick={() => handleDelete(ad._id)} className="px-2 py-1 bg-red-500 rounded text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
