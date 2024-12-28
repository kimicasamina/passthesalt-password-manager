import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await AuthService.getAuth();
        setUser(response.user);
      } catch (error) {
        setError("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (data) => {
    setUser(data);
    setError(null);
  };

  const logout = async () => {
    setUser(null);
    try {
      const response = await AuthService.logout();
      console.log("response: ", response);
    } catch (error) {
      setError("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
