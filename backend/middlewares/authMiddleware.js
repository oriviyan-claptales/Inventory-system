// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };







import jwt from "jsonwebtoken";
import User from "../models/User.js"; // 👈 IMPORT ZAROORI HAI

export const protect = async (req, res, next) => { // 👈 ASYNC KARO
  let token;

  // 1. Token Check karo (Cookie ya Header dono jagah dekhna safe hai)
  if (req.cookies.token) {
    token = req.cookies.token;
  } 
  // Agar frontend headers bhej raha hai to wahan se bhi le lo
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🛑 PURANA CODE GALAT THA: req.user = decoded.id; ❌
    
    // ✅ NAYA CODE: Database se pura user laao (Password chhod kar)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
        return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};