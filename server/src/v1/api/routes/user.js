import express from "express";
const router = express.Router();

import {
  getUserByUuid,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user";

router.get("/", getAllUsers);
router.get("/:uuid", getUserByUuid);
router.post("/", createUser);
router.put("/:uuid", updateUser);
router.delete("/:uuid", deleteUser);

export default router;
