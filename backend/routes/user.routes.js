// import express from "express";
// import isAuth from "../middlewares/isAuth.js";
// import { 
//   getCurrentUser, 
//   getAllUsers, 
//   deleteUser, 
//   updateUser, 
//   adminResetPassword,
//   toggleUserFreeze // 👈 Import This
// } from "../controllers/userController.js";

// const router = express.Router();

// router.get("/current", isAuth, getCurrentUser);
// router.get("/all", isAuth, getAllUsers);
// router.delete("/:id", isAuth, deleteUser);
// router.put("/:id", isAuth, updateUser);
// router.put("/reset-password/:id", isAuth, adminResetPassword);

// // ✅ NEW ROUTE FOR FREEZE/UNFREEZE
// router.put("/toggle-freeze/:id", isAuth, toggleUserFreeze);

// export default router;


import express from "express";
import isAuth from "../middlewares/isAuth.js"; // ✅ Tera purana sahi middleware
import { 
  getCurrentUser, 
  getAllUsers, 
  deleteUser, 
  updateUser, 
  adminResetPassword,
  toggleUserFreeze 
} from "../controllers/userController.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);
router.get("/all", isAuth, getAllUsers);
router.delete("/:id", isAuth, deleteUser); // ✅ isAuth use ho raha hai
router.put("/:id", isAuth, updateUser);
router.put("/reset-password/:id", isAuth, adminResetPassword);
router.put("/toggle-freeze/:id", isAuth, toggleUserFreeze);

export default router;