"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
module.exports = {
  development: {
    dialect: "mysql",
    use_env_variable: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        "native": true
      }
    }
  },
  test: {
    dialect: "postgres",
    use_env_variable: "POSTGRES_URL",
    dialectOptions: {
      ssl: {
        require: true,
        "native": true
      }
    }
  },
  production: {
    dialect: "postgres",
    use_env_variable: "POSTGRES_URL",
    dialectOptions: {
      ssl: {
        require: "true",
        "native": "true"
      }
    }
  }
};