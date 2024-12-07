"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var verifyToken = function verifyToken(req, res, next) {
  // remove this on production
  // console.log('req.cookies', req.cookies)
  var token = req.cookies.access_token;
  if (!token) return res.status(401).json({
    error: "Access denied"
  });
  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.clearCookie("access_token");
    res.status(401).json({
      error: "Invalid token"
    });
  }
};
var _default = exports["default"] = verifyToken;