import { Login, User, Folder } from '../models';
import asyncHandler from 'express-async-handler';
import { encrypt } from '../utils/encryptionHandler';

// Create a new login entry
export const createLogin = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { folder_id, name, email, username, password, website } = req.body;

  try {
    // Find the user and folder
    const user = await User.findByPk(id);
    const folder = folder_id ? await Folder.findByPk(folder_id) : null;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // optional
    // if (!folder) {
    //   return res.status(404).json({ message: 'Folder not found' });
    // }

    // encrypt password before saving to database
    const encryptedData = await encrypt(password);

    // Create the note
    const login = await Login.create({
      user_id: user.id,
      folder_id: folder ? folder.id : null,
      name,
      email,
      username,
      password: encryptedData.password,
      iv: encryptedData.iv, // Ensure iv is passed here
      website,
    });

    return res.status(201).json({
      success: true,
      message: 'New Login created successfully',
      login,
    });
  } catch (error) {
    console.error('Error creating login:', error);
    return res.status(500).json({ message: 'Error creating login' });
  }
});

// Delete a login by ID
export const deleteLogin = asyncHandler(async (req, res) => {
  const login_id = req.params.id;

  const login = await Login.findByPk(login_id);

  if (!login) {
    return res.status(404).json({ error: 'Login not found' });
  }

  await login.destroy();

  return res.status(200).json({
    success: true,
    message: 'Login deleted successfully.',
  });
});

// Update login information
export const updateLogin = asyncHandler(async (req, res) => {
  const login_id = req.params.id;

  const login = await Login.findByPk(login_id);

  if (!login) {
    return res.status(404).json({ error: 'Login not found' });
  }

  // Update login with new data
  await login.update(req.body);

  return res.status(200).json({
    success: true,
    message: 'Login updated successfully.',
    login,
  });
});

// Get login by ID
export const getLoginById = asyncHandler(async (req, res) => {
  const login_id = req.params.id;

  const login = await Login.findOne({
    where: { id: login_id },
    // include: ['user', 'folder'], // Including associated User and Folder
  });

  if (!login) {
    return res.status(404).json({ error: 'Login not found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Login retrieved successfully.',
    login,
  });
});

// Get all Logins by User Id
export const getAllLogins = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const logins = await Login.findAll({
    where: { user_id: id },
    // include: ['user', 'folder'], // Including associated User and Folder
  });

  if (!logins) {
    return res.status(404).json({ error: 'Login not found' });
  }

  return res.status(200).json({
    success: true,
    message: 'Login retrieved successfully.',
    logins,
  });
});
