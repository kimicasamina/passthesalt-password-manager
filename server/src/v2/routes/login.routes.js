import express from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createLogin,
  updateLogin,
  deleteLogin,
  getLoginById,
  getAllLogins,
} from '../controllers/login.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a login
router.post('/', authenticateJWT, createLogin);

// Get a login by ID
router.get('/:id', authenticateJWT, getLoginById);

// Delete a login
router.delete('/:id', authenticateJWT, deleteLogin);

// Get a all logins by User ID
router.get('/', authenticateJWT, getAllLogins);

// Update login
router.put('/:id', authenticateJWT, updateLogin);

export default router;
