import bcrypt from 'bcryptjs';
export const hashPassword = async (userPassword) => {
  return bcrypt.hash(userPassword, 10);
};

export const comparePassword = async (userPassword, hashedPassword) => {
  return bcrypt.compare(hashedPassword, userPassword);
};
