import { User } from '../models';
import { createError } from '../utils/createError.js';

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'username', 'password'],
      include: ['logins', 'notes'],
    });

    if (!user) {
      throw new DatabaseError('Database error: User not found.');
    }
  } catch (err) {
    next(err);
  }
};

export const createUser = async (username, email, password) => {
  try {
    const user = await User.create({ username, email, password });
    if (!user) {
      throw new DatabaseError('Database error: User not found.');
    }
  } catch (err) {
    next(err);
  }
};

export const findUserById = async (id) => {
  try {
    return await User.scope('withoutPassword').findOne({
      where: { id },
      include: ['logins', 'notes'],
    });
  } catch (error) {
    next(createError(400, 'Database error: Unable to find user.'));
  }
};
