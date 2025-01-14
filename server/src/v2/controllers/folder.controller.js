import { Login, User, Folder } from '../models';
import asyncHandler from 'express-async-handler';

// Create new Folder
export const createFoler = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { name, description } = req.body;

  try {
    // Find the user
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the folder
    const folder = await Folder.create({
      user_id: user.id,
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: 'New Folder created successfully',
      folder,
    });
  } catch (error) {
    console.error('Error creating folder:', error);
    return res.status(500).json({ message: 'Error creating folder' });
  }
});

// Delete a folder by ID
export const deleteFolder = asyncHandler(async (req, res) => {
  const folder_id = req.params.id;

  const folder = await Folder.findByPk(folder_id);

  if (!folder) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  await folder.destroy();

  return res.status(200).json({
    success: true,
    message: 'Folder deleted successfully.',
  });
});

// Update folder information
export const updateFolder = asyncHandler(async (req, res) => {
  const folder_id = req.params.id;

  const folder = await Folder.findOne({
    where: { id: folder_id },
    include: ['logins'], // Including associated Model
  });

  if (!folder) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  // Update folder with new data
  await folder.update(req.body);

  return res.status(200).json({
    success: true,
    message: 'Folder updated successfully.',
    folder,
  });
});

// Get folder by ID
export const getFolderById = asyncHandler(async (req, res) => {
  const folder_id = req.params.id;

  const folder = await Folder.findOne({
    where: { id: folder_id },
    include: ['logins'], // Including associated Model
  });

  if (!folder) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Folder retrieved successfully.',
    folder,
  });
});

// Get all folder by User Id
export const getAllFolder = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const folders = await Folder.findAll({
    where: { user_id: id },
    // include: ['user', 'folder'], // Including associated User and Folder
  });

  if (!folders) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Folder retrieved successfully.',
    folders,
  });
});
