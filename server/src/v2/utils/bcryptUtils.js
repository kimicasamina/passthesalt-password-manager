import bcrypt from 'bcryptjs';
export const hashPassword = async (userPassword, saltLength) => {
  return bcrypt.hash(userPassword, saltLength);
};

export const comparePassword = async (userPassword, hashedPassword) => {
  return bcrypt.compare(userPassword, hashedPassword);
};
