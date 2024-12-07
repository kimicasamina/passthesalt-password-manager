import express from "express";
const router = express.Router();

import {
  createNote,
  getAllNotes,
  getNoteByUuid,
  updateNote,
  deleteNote,
} from "../controllers/note";

router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:uuid", updateNote);
router.put("/:uuid", getNoteByUuid);
router.delete("/:uuid", deleteNote);

export default router;
