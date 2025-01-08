import jwt from 'jsonwebtoken';

export const generateJWT = (id, secret, expiresIn = '1h') => {
  return jwt.sign({ id }, secret, { expiresIn });
};
