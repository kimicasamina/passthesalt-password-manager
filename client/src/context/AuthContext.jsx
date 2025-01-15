import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/authService";
import LoadingPage from "../components/common/LoadingPage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await AuthService.getAuth();
        const user = {
          username: response.user.username,
          id: response.user.id,
          email: response.user.email,
        };
        console.log("DETAILS...", user);
        setUser(user);
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
      {loading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};
