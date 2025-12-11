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
  baseURL: "REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51SPdM7CQopk_test_51STPCD2Eg5btMSJ60lv34YB6B0FjxgJQxlI765l9LbrOsWsiFsMhy7KN85Dcso93ecpywCfRbwGX7av3UxsLXTRW00uu8POD9oKwJXOcwuWa5LJtuw1a60fhIy36CVJ8vw3jzOkJIBFaIiV3DhYtvSo0TOmHBRrlpx5WUrGwLpsxJdjQ00piSYZiuf/api", 
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
