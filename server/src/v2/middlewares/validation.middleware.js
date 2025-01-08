import { ValidationError } from '../utils/errors/ValidationError.js';

export const validate = (schema, location = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[location];
    const { error } = schema.validate(dataToValidate);

    if (error) {
      // Extract all error messages from Joi validation
      const validationErrors = error.details.map((err) => err.message);
      // Throw a ValidationError to be handled by the global error handler
      return next(new ValidationError(validationErrors));
    }

    next(); // Validation passed, move to the next middleware
  };
};
