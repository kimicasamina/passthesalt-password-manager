import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // remove this on production
  // console.log('req.cookies', req.cookies)
  let token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.clearCookie("access_token");
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
