import bcrypt from 'bcryptjs';
import { generateJWT } from '../utils/jwtUtils.js';
import AuthService from '../services/Auth.service.js';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import { CustomError } from '../utils/errors/CustomError.js';
import { createError } from '../utils/errors/createError.js';
import { DatabaseError } from '../utils/errors/DatabaseError.js';
import { comparePassword } from '../utils/bcryptUtils.js';

// Register new user
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({
    where: { email },
    // Use the 'withoutPassword' scope to exclude the password field
    // ...User.scope('withoutPassword'),
  });
  if (existingUser) {
    // throw new CustomError('User already registered', 400);
    // const error = createError('User already registered.', 400);
    // throw error;
    return res.status(400).json({
      success: false,
      message: 'User already registered',
    });
  }

  const user = await AuthService.createUser(username, email, password);
  const token = generateJWT(user);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 3600000,
    path: '/',
  });

  return res.status(201).json({
    success: true,
    message: 'User successfully registered.',
    token,
  });
});

// Login existing user
export const login = asyncHandler(async (req, res, next) => {
  const user = await AuthService.findUserByEmail(req.body.email);
  // if (!user) throw new Error('User not found.', 404); // Throw a custom error with statusCode
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
    // return next(new CustomError('User not found.', 404));
  }

  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password,
  );
  if (!isPasswordCorrect)
    return res.status(400).json({
      success: false,
      message: 'Invalid credentials.',
    });

  // Pass the entire user object (not just the user.id) to generateJWT
  const token = generateJWT(user);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 3600000,
    path: '/',
  });

  return res.status(200).json({
    success: true,
    message: 'User logged in successfully.',
    token,
    user,
  });
});

// Logout user
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie('access_token');
  return res.status(200).json({
    success: true,
    message: 'User logged out successfully.',
  });
});

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await AuthService.findUserById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User details retrieved successfully.',
      });
      // return next(createError('User not found.', 404)); // Handle user not found
    }

    // Prepare the user data excluding internal fields
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      logins: user.logins,
      notes: user.notes,
      folders: user.folders,
    };

    return res.status(200).json({
      success: true,
      message: 'User details retrieved successfully.',
      user: userData,
    });
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
});
