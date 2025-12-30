import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Token not found" });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Dono check kar lo taaki galti na ho
    req.userId = verifyToken.id || verifyToken.userId; 

    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};
export default isAuth;