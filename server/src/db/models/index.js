"use strict";

import dotenv from "dotenv";
dotenv.config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development"; // Use NODE_ENV to determine the environment
const config = require(__dirname + "/../config/config.js")[env]; // Load the correct config based on the environment
const db = {};

let sequelize;
console.log("CURRENT ENV: ", env);

if (config.use_env_variable) {
  // Use the environment variable for the database URL (e.g., DATABASE_URL)
  console.log("Using environment variable for database URL");
  console.log(
    `${config.use_env_variable} ${process.env[config.use_env_variable]}`
  );
  console.log("Environment Variable:", process.env[config.use_env_variable]);
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: config.dialect, // Explicitly pass the dialect
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialectOptions: config.dialectOptions,
    logging: config.logging || console.log, // Add other config options if necessary
  });
} else {
  // Use the configuration directly from config.js
  console.log("Using configuration directly");
  console.log(
    `${config.database} ${config.username} ${config.password} ${config.dialect}`
  );
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect, // Ensure dialect is passed here
    host: config.host,
    logging: config.logging || console.log, // You can add other config options here if needed
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
