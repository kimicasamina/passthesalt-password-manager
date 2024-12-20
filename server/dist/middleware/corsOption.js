"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOption = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var corsOption = exports.corsOption = {
  origin: process.env.NODE_ENV === "production" ? process.env.PASSTHESALT_CLIENT_URL : "http://localhost:5173",
  // Vite default port for development
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};