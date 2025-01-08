import { CustomError } from './CustomError.js';

export class DatabaseError extends CustomError {
  constructor(message) {
    super(message || 'Database Error', 500);
  }
}
