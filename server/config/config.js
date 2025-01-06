import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL", // Use the PostgreSQL URL from environment variables
    dialect: "postgres",
  },
};
