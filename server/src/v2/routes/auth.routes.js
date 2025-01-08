import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validators.js';

const router = express.Router();

// POST routes for registration and login
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
