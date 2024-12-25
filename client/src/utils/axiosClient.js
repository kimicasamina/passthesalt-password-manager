// src/axiosInstance.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // Default to local if VITE_API_URL is not set
  timeout: 10000, // Optional: Set timeout for requests (in ms)
});

// Optionally set default headers
// axiosInstance.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("token")}`;

export default axiosClient;
