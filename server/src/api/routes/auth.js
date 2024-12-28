import express from "express";

const router = express.Router();

import {
  registerUser,
  loginUser,
  getAuth,
  logoutUser,
} from "../controllers/auth";
import verifyToken from "../../middleware/verifyToken";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", verifyToken, getAuth);
router.delete("/logout", logoutUser);

export default router;
