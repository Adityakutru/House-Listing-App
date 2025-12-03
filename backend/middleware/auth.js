import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // FIX: your token payload contains {id: ...}
    req.user = { id: decoded.id }; 

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default auth;
