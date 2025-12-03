import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer token"
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id: "<userId>", iat: ..., exp: ... }
    req.user = { id: decoded.id }; // make req.user.id available
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default auth;
