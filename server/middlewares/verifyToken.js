import jwt from "jsonwebtoken";

// Middleware to verify the token
export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Please login!" });
  }

  const token = authHeader.split(" ")[1]; // Extract the actual token

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach decoded user info to the request
    next();
  } catch (err) {
    console.error("Token Verification Error:", err.message);

    return res.status(403).json({
      success: false,
      message: "Invalid or expired token!",
    });
  }
};
