import express from "express";
const router = express.Router();

import {
  getAllLogins,
  createNewLogin,
  updateLogin,
  deleteLogin,
  getLoginByUuid,
  getPassword,
} from "../controllers/login";

router.get("/", getAllLogins);
router.post("/", createNewLogin);
router.put("/:uuid", updateLogin);
router.get("/:uuid", getLoginByUuid);
router.delete("/:uuid", deleteLogin);
router.post("/decryptpassword", getPassword);

export default router;
