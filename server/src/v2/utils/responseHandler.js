// utils/responseHandler.js

import { CustomError } from './errors/CustomError.js';

export const handleResponse = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const handleError = (error, next) => {
  console.log('ERROR FROM HANDLE ERROR: ', error);
  if (error instanceof Error) {
    console.log('TYPE', error.name);
    return next(error);
  }
  return next(new Error(error.message, error.statusCode));
};
