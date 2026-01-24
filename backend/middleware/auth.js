import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // console.log("🔥 Auth middleware received request");
  // console.log("🔥 Authorization header:", req.header("Authorization"));

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };  // ✅ FIXED

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default auth;
