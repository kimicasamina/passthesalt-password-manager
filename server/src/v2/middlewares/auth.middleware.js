import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token =
    req.cookies.access_token ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(createError(400, 'No token found.'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(createError(400, err.message));
  }
};
