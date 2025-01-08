import { ValidationError } from '../utils/errors/ValidationError.js';
import { DatabaseError } from '../utils/errors/DatabaseError.js';

export const errorHandler = (err, req, res, next) => {
  // Check if the error is a custom error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.errors || [],
    });
  }

  // Handle database error
  if (err instanceof DatabaseError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Handle validation error
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.errors || [],
    });
  }

  // Handle other unexpected errors
  console.error(err); // Log the error for debugging purposes
  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server',
  });
};
