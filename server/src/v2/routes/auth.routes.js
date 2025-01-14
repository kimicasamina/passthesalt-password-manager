import express from 'express';
import {
  register,
  login,
  logoutUser,
  getUserDetails,
} from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validators.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
const router = express.Router();

// POST routes for registration and login
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.delete('/logout', authenticateJWT, logoutUser);
router.get('/me', authenticateJWT, getUserDetails);

export default router;
