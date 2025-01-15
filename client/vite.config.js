import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv"; // Import dotenv
import { resolve } from "path";

// Manually load .env file (optional, since Vite handles it)
config();

const apiUrl = process.env.VITE_API_URL; // This should be 'https://passthesalt-backend-api.onrender.com'
const viteMode = process.env.VITE_MODE; // This can be 'development' or 'production'

console.log(process.env); // You can check if the env variables are loaded correctly

export default defineConfig({
  define: {
    "process.env": process.env, // Allows process.env to be accessed within the app
  },
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Replace `/api` with your endpoint
  //     "/api": {
  //       // target:
  //       //   process.env.VITE_MODE === "production"
  //       //     ? process.env.VITE_API_URL
  //       //     : "http://localhost:6060",
  //       target: process.env.VITE_API_URL,
  //       changeOrigin: true,
  //       secure: false, // Use this if you have an insecure API (HTTP instead of HTTPS)
  //       rewrite: (path) => path.replace(/^\/api/, ""), // Optional: rewrite path if needed
  //     },
  //   },
  // },
});
