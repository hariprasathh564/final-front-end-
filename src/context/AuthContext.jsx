// import React, { createContext, useContext, useEffect, useState } from "react";
// import API from "../api/axiosClient";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const raw = localStorage.getItem("user");
//     return raw ? JSON.parse(raw) : null;
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // optional: validate token / fetch profile on mount
//     const token = localStorage.getItem("token");
//     if (token && !user) {
//       fetchProfile().catch(() => {});
//     }
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const { data } = await API.get("/auth/profile");
//       setUser(data);
//       localStorage.setItem("user", JSON.stringify(data));
//       return data;
//     } catch (err) {
//       setUser(null);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       throw err;
//     }
//   };

//   const login = async (email, password) => {
//     setLoading(true);
//     const res = await API.post("/auth/login", { email, password });
//     const { token, user: userData } = res.data;
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//     setLoading(false);
//     return res.data;
//   };

//   const register = async (payload) => {
//     setLoading(true);
//     const res = await API.post("/auth/register", payload);
//     const { token, user: userData } = res.data;
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//     setLoading(false);
//     return res.data;
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, fetchProfile, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);












import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      fetchProfile().catch(() => {});
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw err;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    const res = await API.post("/auth/login", { email, password });
    const { token, user: userData } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setLoading(false);
    return res.data;
  };

  const register = async (payload) => {
    setLoading(true);
    const res = await API.post("/auth/register", payload);
    const { token, user: userData } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setLoading(false);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, fetchProfile, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
