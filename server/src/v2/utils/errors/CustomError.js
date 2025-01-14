// class CustomError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.name = this.constructor.name;
//   }
// }

// class ValidationError extends CustomError {
//   constructor(message, details = []) {
//     super(message); // 400 Bad Request
//     this.details = details;
//   }
// }

// class DatabaseError extends CustomError {
//   constructor(message) {
//     super(message, 500); // 500 Internal Server Error
//   }
// }

// module.exports = { ValidationError, DatabaseError, CustomError };

// utils/errors/CustomError.js

// class CustomError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.name = this.constructor.name;
//   }
// }

// class ValidationError extends CustomError {
//   constructor(message) {
//     super(message, 400);
//   }
// }

// class DatabaseError extends CustomError {
//   constructor(message) {
//     super(message, 500);
//   }
// }

// export { CustomError, ValidationError, DatabaseError };

// export class CustomError extends Error {
//   constructor(message, statusCode, details = []) {
//     super(message);
//     this.statusCode = statusCode || 500;
//     this.details = details;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export class CustomError extends Error {
//   constructor(message, statusCode = 500, details = []) {
//     super(message);
//     this.statusCode = statusCode;
//     this.details = details;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// CustomError.js
// export class CustomError extends Error {
//   constructor(message, statusCode = 500, details = []) {
//     super(message);
//     this.statusCode = statusCode;
//     this.details = details;

//     // Set the prototype explicitly to ensure instanceof works correctly
//     Object.setPrototypeOf(this, CustomError.prototype);
//   }

//   serialize() {
//     return {
//       message: this.message,
//       details: this.details || [],
//     };
//   }
// }

export class CustomError extends Error {
  constructor(message, statusCode = 500, details = []) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      details: this.details || [],
    };
  }
}
