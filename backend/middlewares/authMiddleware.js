// middlewares/authMiddleware.js

// ✅ Admin Only Access (For purely admin features like creating users)
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.userType === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin only."
    });
  }
};

// ✅ Check if Account is Frozen
export const checkFrozen = (req, res, next) => {
  if (req.user && req.user.isFrozen) {
    return res.status(403).json({
      success: false,
      message: "Your account has been frozen. Please contact admin."
    });
  }
  next();
};