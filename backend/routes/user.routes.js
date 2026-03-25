// // import express from "express";
// // import isAuth from "../middlewares/isAuth.js";
// // import { 
// //   getCurrentUser, 
// //   getAllUsers, 
// //   deleteUser, 
// //   updateUser, 
// //   adminResetPassword,
// //   toggleUserFreeze // 👈 Import This
// // } from "../controllers/userController.js";

// // const router = express.Router();

// // router.get("/current", isAuth, getCurrentUser);
// // router.get("/all", isAuth, getAllUsers);
// // router.delete("/:id", isAuth, deleteUser);
// // router.put("/:id", isAuth, updateUser);
// // router.put("/reset-password/:id", isAuth, adminResetPassword);

// // // ✅ NEW ROUTE FOR FREEZE/UNFREEZE
// // router.put("/toggle-freeze/:id", isAuth, toggleUserFreeze);

// // export default router;


// import express from "express";
// import isAuth from "../middlewares/isAuth.js"; // ✅ Tera purana sahi middleware
// import { 
//   getCurrentUser, 
//   getAllUsers, 
//   deleteUser, 
//   updateUser, 
//   adminResetPassword,
//   toggleUserFreeze 
// } from "../controllers/userController.js";

// const router = express.Router();

// router.get("/current", isAuth, getCurrentUser);
// router.get("/all", isAuth, getAllUsers);
// router.delete("/:id", isAuth, deleteUser); // ✅ isAuth use ho raha hai
// router.put("/:id", isAuth, updateUser);
// router.put("/reset-password/:id", isAuth, adminResetPassword);
// router.put("/toggle-freeze/:id", isAuth, toggleUserFreeze);

// export default router;





















// routes/userRoutes.js
import express from "express";
import isAuth from "../middlewares/isAuth.js"; 
import { adminOnly } from "../middlewares/authMiddleware.js"; // 👈 Import adminOnly

import { 
  getCurrentUser, 
  getAllUsers, 
  deleteUser, 
  updateUser, 
  adminResetPassword,
  toggleUserFreeze 
} from "../controllers/userController.js";

const router = express.Router();

// 🟢 Current user koi bhi fetch kar sakta hai (Frontend ProtectedRoute ke liye)
router.get("/current", isAuth, getCurrentUser);

// 🔴 Baaki sab sirf ADMIN kar sakta hai
router.get("/all", isAuth, adminOnly, getAllUsers);
router.delete("/:id", isAuth, adminOnly, deleteUser); 
router.put("/:id", isAuth, adminOnly, updateUser);
router.put("/reset-password/:id", isAuth, adminOnly, adminResetPassword);
router.put("/toggle-freeze/:id", isAuth, adminOnly, toggleUserFreeze);

export default router;