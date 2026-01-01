import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import baseAPI from "../api/baseApi";


const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await baseAPI.get("/auth/users/me");
          setUser(res.data);
          localStorage.setItem("user_info", JSON.stringify(res.data));
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_info");
          setUser(null);
          const privatePaths = ["/favorites", "/account", "/admin", "/orders"];
          const currentPath = window.location.pathname;

          if (privatePaths.some(path => currentPath.startsWith(path))) {
             window.location.href = "/login"; 
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async(email, password) => {
    const response = await baseAPI.post("/auth/login", { email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem("token", access_token);
    localStorage.setItem("user_info", JSON.stringify(userData));
    // setUser(userData);
    return userData;
  } 
  const logout = () =>{
    localStorage.removeItem("token");
    // setUser(null);
  }

  const signup = async (userData) => {
    const response = await baseAPI.post("/auth/register", userData);
    
    const { access_token, user: newUser } = response.data;
    
    localStorage.setItem("token", access_token);
    localStorage.setItem("user_info", JSON.stringify(newUser));
    // setUser(newUser);
    
    return newUser;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
