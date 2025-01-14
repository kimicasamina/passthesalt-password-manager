export class AuthenticationError extends Error {
  statusCode = 401;
  constructor() {
    super('User unauthenticated');
    Object.setPrototypeOf(this.AuthenticationError.prototype);
  }

  serialize() {
    return { message: 'User unauthenticated.' };
  }
}
