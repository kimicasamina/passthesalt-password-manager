import express from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createLogin,
  updateLogin,
  deleteLogin,
  getLoginById,
} from '../controllers/login.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a login
router.post('/', createLogin);

// Get a login by ID
router.get('/:id', getLoginById);

// Delete a login
router.delete('/:id', deleteLogin);

// Update login
router.put('/:id', updateLogin);

export default router;
