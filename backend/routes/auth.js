// import express from "express";
// import { checkAuth, createUser, signIn, signOut } from "../controllers/authController.js";
// import { protect } from "../middlewares/authMiddleware.js";

// const authRouter = express.Router()

// // authRouter.post("/signup", signUp);
// authRouter.post("/signin", signIn);
// authRouter.post("/signout", signOut);
// // Create User (Protected, Admin Only)
// authRouter.post("/create-user", createUser);
// authRouter.get("/current", protect, checkAuth);


// export default authRouter;



import express from "express";
import { checkAuth, createUser, signIn, signOut} from "../controllers/authController.js";
// 👇 IMPORT CHECK KAR (protect hona chahiye)
import { protect } from "../middlewares/authMiddleware.js"; 

const authRouter = express.Router();

// authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);

// 🛑 GALTI YAHAN THI: Pehle ye bina 'protect' ke tha
// 👇 AB AISE LIKHNA HAI:
authRouter.post("/create-user", protect, createUser); // ✅ 'protect' add kiya

authRouter.get("/current", protect, checkAuth);

export default authRouter;