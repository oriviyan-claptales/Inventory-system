// import jwt from "jsonwebtoken";

// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const token = authHeader.split(" ")[1]; // Bearer token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default auth;


import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Tera User model import kar

const isAuth = async (req, res, next) => {
  try {
    // 1. Token nikalo (Header ya Cookie se)
    let token;
    
    // Header me "Bearer <token>" check karo
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } 
    // Ya fir Cookies check karo (agar cookie parser use kiya hai)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Agar token nahi mila
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. User ko Database se dhundo aur req.user me daalo
    // .select("-password") ka matlab password chhod kar sab le aao
    req.user = await User.findById(decoded.id || decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Token valid but User not found" });
    }

    // 4. req.userId bhi set kar dete hain (backup ke liye)
    req.userId = req.user._id;

    next(); // Aage badho controller ke paas

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default isAuth;