"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var generateToken = exports.generateToken = function generateToken(uuid) {
  var token = _jsonwebtoken["default"].sign({
    user: {
      uuid: uuid
    }
  }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  return token;
};