import express from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createFoler,
  updateFolder,
  deleteFolder,
  getFolderById,
} from '../controllers/folder.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a login
router.post('/', createFoler);

// Get a login by ID
router.get('/:id', getFolderById);

// Delete a login
router.delete('/:id', deleteFolder);

// Update login
router.put('/:id', updateFolder);

export default router;
