import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      setUser({ ...response.data.user });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    // todo: send a post request to the api to logout  and remove token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
