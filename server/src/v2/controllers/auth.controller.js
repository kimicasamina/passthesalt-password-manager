import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import {
  findUserByEmail,
  createUser,
  findUserById,
} from '../services/auth.services.js';
import generateJWT from '../utils/jwtUtils.js';
// import { createError } from '../utils/createError.js';

// Register a new user
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    // if (user) {
    //   return next(createError(400, 'User is already registered'));
    // }

    // await createUser(username, email, password);
    res.status(201).json({ message: 'Successfully created a new user' });
  } catch (err) {
    next(err);
  }
};

// Login a user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return next(createError(400, 'User not found'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(400, 'Password is incorrect.'));
    }

    const token = generateJWT(user.id, process.env.JWT_SECRET);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000, // 1 hour
      path: '/',
    });

    const { password: _, ...userDetails } = user.get();
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: userDetails,
    });
  } catch (err) {
    next(createError(500, 'Failed to login'));
  }
};

// Logout user
export const logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(400, 'No token found'));
    }

    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    next(createError(500, 'Failed to logout'));
  }
};

// Get authenticated user info
export const getAuth = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await findUserById(id);

    if (!user) {
      return next(createError(400, 'User not found'));
    }

    res.status(200).json({ user });
  } catch (err) {
    next(createError(400, err.message));
  }
};
