import express from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import {
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
  getAllNotes,
} from '../controllers/note.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a note
router.post('/', authenticateJWT, createNote);

// Get a note by ID
router.get('/:id', authenticateJWT, getNoteById);

// Get a all notes by User ID
router.get('/', authenticateJWT, getAllNotes);

// Delete a note
router.delete('/:id', authenticateJWT, deleteNote);

// Update note
router.put('/:id', authenticateJWT, updateNote);

export default router;
