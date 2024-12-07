"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../controllers/auth");
var _verifyToken = _interopRequireDefault(require("../../middleware/verifyToken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/register", _auth.registerUser);
router.post("/login", _auth.loginUser);
router.get("/", _verifyToken["default"], _auth.getUserWithoutPassword);
router["delete"]("/logout", _auth.logoutUser);
var _default = exports["default"] = router;