import express from "express";
const router = express.Router();

import {
  getAllFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  getFolderByUuid,
} from "../controllers/folder";

router.get("/", getAllFolders);
router.post("/", createFolder);
router.put("/:uuid", updateFolder);
router.get("/:uuid", getFolderByUuid);
router.delete("/:uuid", deleteFolder);

export default router;
