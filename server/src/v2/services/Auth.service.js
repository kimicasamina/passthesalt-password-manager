import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import { hashPassword } from '../utils/bcryptUtils.js';

class AuthService {
  // Find a user by their email
  static async findUserByEmail(email) {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'username', 'password'],
    });

    if (!user) {
      // throw new Error('User not found', 400);
      return res.status(400).json({
        success: false,
        message: 'User not found.',
      });
    }

    return user; // This returns a promise, which can be awaited in the controller
  }

  // Create a new user
  static async createUser(username, email, password) {
    // const hashedPassword = await hashPassword(password); // hashPassword should return a promise

    const user = await User.create({
      username,
      email,
      password,
    });

    return user; // This returns a promise, which can be awaited in the controller
  }

  // Find a user by their ID
  static async findUserById(id) {
    const user = await User.findOne({
      where: { id },
      include: ['logins', 'notes', 'folders'],
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: 'User not found.',
      });
    // if (!user) {
    //   throw new Error('User not found'); // Throw an error that the controller can handle
    // }

    // return user;

    return user; // This returns a promise, which can be awaited in the controller
  }
}

export default AuthService;
