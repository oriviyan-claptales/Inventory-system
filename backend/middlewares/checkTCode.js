// middlewares/checkTCode.js

export const requireTCode = (requiredCode) => {
  return (req, res, next) => {
    const user = req.user; // Ye user tumhare 'isAuth' middleware se aa raha hai

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // 1. Admin ko sab allow hai
    if (user.userType === "admin") {
      return next();
    }

    // 2. Normal user ke tcodes array me check karo
    if (user.tcodes && user.tcodes.includes(requiredCode)) {
      return next();
    }

    // 3. Permission nahi hai toh fail kar do
    return res.status(403).json({ 
      success: false,
      message: `Access Denied. You need '${requiredCode}' permission.` 
    });
  };
};