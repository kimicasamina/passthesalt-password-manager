import express from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import { loginSchema } from '../validators/auth.validators.js';
import {
  createLogin,
  updateLogin,
  deleteLogin,
  getLoginById,
  getAllLogins,
  decryptPassword,
} from '../controllers/login.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { idParamsSchema } from '../validators/login.validators.js';

const router = express.Router();

// Create a login
router.post(
  '/',
  // validate(loginSchema),
  authenticateJWT,
  createLogin,
);

// Get a login by ID
router.get(
  '/:id',
  // validate(idParamsSchema, 'params'),
  authenticateJWT,
  getLoginById,
);

// Delete a login
router.delete(
  '/:id',
  // validate(idParamsSchema, 'params'),
  authenticateJWT,
  deleteLogin,
);

// Get a all logins by User ID
router.get('/', authenticateJWT, getAllLogins);

// Update login
router.put(
  '/:id',
  // validate(idParamsSchema, 'params'),
  authenticateJWT,
  updateLogin,
);

// Update login
router.post(
  '/decryptpassword',
  // validate(idParamsSchema, 'params'),
  authenticateJWT,
  decryptPassword,
);

export default router;
