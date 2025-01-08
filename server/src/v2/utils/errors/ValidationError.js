// src/utils/ValidationError.js
import { CustomError } from './CustomError.js';

export class ValidationError extends CustomError {
  constructor(errors) {
    super('Validation Error', 400, errors);
  }
}
