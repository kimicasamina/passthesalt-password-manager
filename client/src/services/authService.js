import axios from "axios";
import axiosInstance from "./axiosClient";

const API_URL = import.meta.env.VITE_API_URL;

const AuthService = {
  async register(username, email, password) {
    try {
      // const response = await axiosInstance.post("/api/v2/auths/register", {
      //   username,
      //   email,
      //   password,
      // });
      const response = await axios.post(`${API_URL}/api/v2/auths/register`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  async loginUser(email, password) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v2/auths/login`,
        { email, password },
        { withCredentials: true }
      );

      // const response = await axiosInstance.post(
      //   "/api/v2/auths/login",
      //   { email, password },
      //   { withCredentials: true }
      // );
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  async logoutUser() {
    try {
      const response = await axios.delete(`${API_URL}/api/v2/auths/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  },

  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/api/v2/auths/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleAuthError(error);
    }
  },
};

const handleAuthError = (error) => {
  const errorMessage = error.response ? error.response.data : error.message;
  console.error(errorMessage);
  throw new Error(errorMessage);
};

export default AuthService;
