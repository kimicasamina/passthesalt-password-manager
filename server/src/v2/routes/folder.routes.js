import express from 'express';
import {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolderById,
  getAllFolder,
} from '../controllers/folder.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a folder
router.post('/', authenticateJWT, createFolder);

// Get a folder by ID
router.get('/:id', authenticateJWT, getFolderById);

// Get a all folders by User ID
router.get('/', authenticateJWT, getAllFolder);

// Delete a folder
router.delete('/:id', authenticateJWT, deleteFolder);

// Update folder
router.put('/:id', authenticateJWT, updateFolder);

export default router;
