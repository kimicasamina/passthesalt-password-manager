class CustomError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errors = errors;
    this.name = this.constructor.name;
  }
}

export { CustomError };
