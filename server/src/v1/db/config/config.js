import dotenv from "dotenv";
dotenv.config();

module.exports = {
  development: {
    dialect: "mysql",
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        require: false, // Disable SSL
        rejectUnauthorized: false, // Do not reject self-signed certificates
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
