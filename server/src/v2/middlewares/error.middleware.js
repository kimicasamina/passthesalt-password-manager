import { CustomError } from '../utils/errors/CustomError.js';
import { DatabaseError } from '../utils/errors/DatabaseError.js';
// errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.log('ERROR FROM ERROR HANDLER: ', err); // Log error for debugging

  // If it's an instance of CustomError, handle it differently
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details || [],
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
  }

  // Handle other errors generically
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Something went wrong.',
    error: err.details || [],
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });
};
