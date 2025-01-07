// utils/jwtUtils.js
import jwt from "jsonwebtoken";

export const generateJWT = (uuid, secret, expiresIn = "1h") => {
  return jwt.sign({ uuid }, secret, { expiresIn });
};
