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
import { checkAuth, createUser, signIn, signOut, verifyLoginOTP } from "../controllers/authController.js";

// 👇 Sirf 'isAuth' rakhte hain (consistency ke liye)
import isAuth from "../middlewares/isAuth.js"; 

const authRouter = express.Router();

// 1. Signin (Public Route)
authRouter.post("/signin", signIn);

// 2. Signout (Protected - Taaki Log entry ho sake)
authRouter.post("/signout", isAuth, signOut); 

// 3. Create User (Protected - Admin Only logic controller me hoga)
// Humne 'protect' hata kar 'isAuth' kar diya
authRouter.post("/create-user", isAuth, createUser); 

// 4. Check Current User (Protected)
authRouter.get("/current", isAuth, checkAuth);
authRouter.post("/verify-login-otp", verifyLoginOTP);

export default authRouter;