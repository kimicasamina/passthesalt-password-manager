import dotenv from "dotenv";
dotenv.config();

module.exports = {
  development: {
    dialect: "mysql",
    use_env_variable: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        native: true,
      },
    },
  },
  test: {
    dialect: "postgres",
    use_env_variable: "POSTGRES_URL",
    dialectOptions: {
      ssl: {
        require: true,
        native: true,
      },
    },
  },
  production: {
    dialect: "postgres",
    use_env_variable: "POSTGRES_URL",
    dialectOptions: {
      ssl: {
        require: "true",
        native: "true",
      },
    },
  },
};
