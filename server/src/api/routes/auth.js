import express from "express";

const router = express.Router();

import {
  registerUser,
  loginUser,
  getUserWithoutPassword,
  logoutUser,
} from "../controllers/auth";
import verifyToken from "../../middleware/verifyToken";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", verifyToken, getUserWithoutPassword);
router.delete("/logout", logoutUser);

export default router;
