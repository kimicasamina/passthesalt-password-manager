"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _note = require("../controllers/note");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get("/", _note.getAllNotes);
router.post("/", _note.createNote);
router.put("/:uuid", _note.updateNote);
router.put("/:uuid", _note.getNoteByUuid);
router["delete"]("/:uuid", _note.deleteNote);
var _default = exports["default"] = router;