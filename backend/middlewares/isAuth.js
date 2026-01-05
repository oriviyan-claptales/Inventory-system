// import jwt from "jsonwebtoken";

// const isAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;
//     if (!token) return res.status(401).json({ message: "Token not found" });

//     const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    
//     // ✅ Dono check kar lo taaki galti na ho
//     req.userId = verifyToken.id || verifyToken.userId; 

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Auth failed" });
//   }
// };
// export default isAuth;


import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isAuth = async (req, res, next) => {
  try {
    // 1. Cookie check karo (index.js me cookieParser hai isliye ye chalega)
    let token = req.cookies.token;

    console.log("🔍 Checking Cookie Token:", token ? "Found" : "NOT Found");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 2. Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. User dhundo
    const user = await User.findById(decoded.id || decoded._id).select("-password");

    if (!user) {
      console.log("❌ User not found in database for this token");
      return res.status(401).json({ message: "User not found" });
    }

    // 4. Sab sahi hai to set karo
    req.user = user;
    req.userId = user._id;

    console.log("✅ Auth Success for:", user.name);
    next(); // Aage badho controller pe

  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default isAuth;