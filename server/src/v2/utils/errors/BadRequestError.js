import { CustomError } from './CustomError';

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this.DatabaseError.prototype);
  }

  serialize() {
    return { message: this.message };
  }
}
