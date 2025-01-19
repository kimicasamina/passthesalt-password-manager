import { User, Login, Note, Folder } from '../models/index.js';
import bcrypt from 'bcryptjs';
import { hashPassword } from '../utils/bcryptUtils.js';

class AuthService {
  // Find a user by their email
  static async findUserByEmail(email) {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'username', 'password'], // Specify the fields you want
      include: [
        {
          model: Login,
          as: 'logins', // Alias defined in associations
        },
        {
          model: Note,
          as: 'notes', // Alias defined in associations
        },
        {
          model: Folder,
          as: 'folders', // Alias defined in associations
          include: [
            {
              model: Note,
              as: 'notes', // Include notes within the folder
            },
            {
              model: Login,
              as: 'logins', // Include logins within the folder
            },
          ],
        },
      ],
    });

    return user;
  }

  // Create a new user
  static async createUser(username, email, password) {
    const hashedPassword = await hashPassword(password, 10);

    const user = await User.create({
      username,
      email,
      password: password, // Use hashed password instead of plain password
    });

    return user;
  }

  // Find a user by their ID
  static async findUserById(id) {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Login,
          as: 'logins', // Alias defined in associations
        },
        {
          model: Note,
          as: 'notes', // Alias defined in associations
        },
        {
          model: Folder,
          as: 'folders', // Alias defined in associations
          include: [
            {
              model: Note,
              as: 'notes', // Include notes within the folder
            },
            {
              model: Login,
              as: 'logins', // Include logins within the folder
            },
          ],
        },
      ],
    });

    // if (!user) {
    //   throw new Error('User not found'); // Throw an error that the controller will catch
    // }

    return user;
  }
}

export default AuthService;
