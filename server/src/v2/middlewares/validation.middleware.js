// import { ValidationError } from '../utils/errors/CustomError.js';

export const validate = (schema, location = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[location]; // Body, query, params, etc.
    const { error } = schema.validate(dataToValidate);

    if (error) {
      // If validation fails, return a 400 status code and the error details
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: error.details[0].message,
      });
    }

    next(); // Proceed to the next middleware/route handler
  };
};
