// src/services/axios.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// You can add interceptors for logging or authentication headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
