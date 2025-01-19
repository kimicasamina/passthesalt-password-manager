import jwt from 'jsonwebtoken';
import { createError } from '../utils/errors/CustomError.js';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateJWT = expressAsyncHandler(async (req, res, next) => {
  const token =
    req.cookies.access_token ||
    req.header('Authorization')?.replace('Bearer ', ''); // Extract token from either cookies or header

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'No token found. Please log in.',
    });
  }

  try {
    // Verify the JWT token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token.',
      });
    }

    // Attach decoded user info to req.user
    req.user = decoded; // { id, email, username }

    // Proceed to the next middleware/controller
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
});
