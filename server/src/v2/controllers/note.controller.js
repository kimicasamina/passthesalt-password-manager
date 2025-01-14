import { User, Folder, Note } from '../models';
import asyncHandler from 'express-async-handler';

// Create a new note entry
export const createNote = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { folder_id, name, content } = req.body;

  try {
    // Find the user and folder
    const user = await User.findByPk(user_id);
    const folder = folder_id ? await Folder.findByPk(folder_id) : null;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // optional
    // if (!folder) {
    //   return res.status(404).json({ message: 'Folder not found' });
    // }

    // Create the note
    const note = await Note.create({
      user_id,
      folder_id: folder ? folder.id : null,
      name,
      content,
    });

    return res.status(201).json({
      success: true,
      message: 'New Note created successfully',
      note,
    });
  } catch (error) {
    console.error('Error creating note:', error);
    return res.status(500).json({ message: 'Error creating note' });
  }
});

// Delete a note by ID
export const deleteNote = asyncHandler(async (req, res) => {
  const note_id = req.params.id;

  const note = await Note.findByPk(note_id);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  await note.destroy();

  return res.status(200).json({
    success: true,
    message: 'Note deleted successfully.',
  });
});

// Update note information
export const updateNote = asyncHandler(async (req, res) => {
  const note_id = req.params.id;

  const note = await Note.findByPk(note_id);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  // Update note with new data
  await note.update(req.body);

  return res.status(200).json({
    success: true,
    message: 'Note updated successfully.',
    note,
  });
});

// Get note by ID
export const getNoteById = asyncHandler(async (req, res) => {
  const note_id = req.params.id;

  const note = await Note.findOne({
    where: { id: note_id },
    // include: ['user', 'folder'], // Including associated User and Folder
  });

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Note retrieved successfully.',
    note,
  });
});

// Get all notes by User Id
export const getAllNotes = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const notes = await Note.findAll({
    where: { user_id: id },
    // include: ['user', 'folder'], // Including associated User and Folder
  });

  if (!notes) {
    return res.status(404).json({ error: 'Note not found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Note retrieved successfully.',
    notes,
  });
});
