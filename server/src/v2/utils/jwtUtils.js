import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate a new refresh token along with the regular JWT
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  }); // Longer expiry
};

// Generate the JWT with a short expiration time (e.g., 1 hour)
export const generateJWT = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// When a token expires, allow users to refresh it using the refresh token
const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    // Reissue a new access token using the decoded user ID
    return generateToken(decoded); // New JWT generated
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Invalid refresh token');
  }
};
