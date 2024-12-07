"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _login = require("../controllers/login");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/", _login.getAllLogins);
router.post("/", _login.createNewLogin);
router.put("/:uuid", _login.updateLogin);
router.get("/:uuid", _login.getLoginByUuid);
router["delete"]("/:uuid", _login.deleteLogin);
router.post("/decryptpassword", _login.getPassword);
var _default = exports["default"] = router;