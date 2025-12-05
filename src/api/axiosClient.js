// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
//   withCredentials: true
// });

// // Attach token from localStorage
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token"); // if you use JWT
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
