import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Keep localStorage and state in sync
  useEffect(() => {

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  //  Login
const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  console.log(" Login response:", res.data);
  const { token, user } = res.data;
  localStorage.setItem("token", token);
  setUser(user);
  return user;
};

  

  //  Register
  const register = async (username, email, password) => {
    const res = await API.post("/auth/register", { username, email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
    return user;
  };

  // Get logged-in user info
  const getUserInfo = async () => {
    try {
      const res = await API.get("/auth/get-user");
      if (res.data?.user) {
        setUser(res.data.user);
        console.log(res.data.user);
        return res.data.user;
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      logout();
    }
  };

  //  Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

