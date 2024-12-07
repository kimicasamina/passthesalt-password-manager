"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var process = require("process");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development"; // Use NODE_ENV to determine the environment
var config = require(__dirname + "/../config/config.js")[env]; // Load the correct config based on the environment
var db = {};
var sequelize;
console.log("CURRENT ENV: ", env);
if (config.use_env_variable) {
  // Use the environment variable for the database URL (e.g., DATABASE_URL)
  console.log("Using environment variable for database URL");
  console.log("".concat(config.use_env_variable, " ").concat(process.env[config.use_env_variable]));
  console.log("Environment Variable:", process.env[config.use_env_variable]);
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: config.dialect,
    // Explicitly pass the dialect
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialectOptions: config.dialectOptions,
    logging: config.logging || console.log // Add other config options if necessary
  });
} else {
  // Use the configuration directly from config.js
  console.log("Using configuration directly");
  console.log("".concat(config.database, " ").concat(config.username, " ").concat(config.password, " ").concat(config.dialect));
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    // Ensure dialect is passed here
    host: config.host,
    logging: config.logging || console.log // You can add other config options here if needed
  });
}
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;