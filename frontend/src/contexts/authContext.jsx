import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        
    const stored = localStorage.getItem("user");  //restore user from Local Storage if availbale
    return stored ? JSON.parse(stored) : null;
    });
    const [loading, setLoading] = useState(true);


    // Keep localStorage and state in sync
    useEffect(() => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }, [user]);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token && !user) {
        console.log("Token found, fetching user info once at startup...");
        getUserInfo().finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, []);


      //  Login
    const login = async (email, password) => {
      try{
      const res = await API.post("/auth/login", { email, password });

      if(res.data?.user){
      console.log("Auth.Login response:", res.data.user);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      }
    }
    catch(error){
        console.error("Login error:", error);
        throw error;
    }
    };


  //  Register
  const register = async (username, email, password) => {
      try{
          const res = await API.post("/auth/register", { username, email, password });
          
          if(res.data?.user){
            console.log("Auth.register response: ", res.data.user);
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
          }
      }
      catch(error){
          console.error("Registration error: ", error);
          throw error;
      }
        };
        

  // Get logged-in user info
  const getUserInfo = async () => {
    try {
      const res = await API.get("/auth/get-user");

      if (res.data?.user) {
        console.log("Auth.getUserInfo response: ", res.data.user);
        setUser(res.data.user);
        return res.data.user;
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      logout();
    }
  };

  //  Logout
  const logout = () => {
    console.log("Logging out...");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
};