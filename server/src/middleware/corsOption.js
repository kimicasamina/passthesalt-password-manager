import dotenv from "dotenv";
dotenv.config();

export const corsOption = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.PASSTHESALT_CLIENT_URL
      : "http://localhost:5173", // Vite default port for development
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
