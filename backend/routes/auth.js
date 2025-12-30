import express from "express";
import { checkAuth, createUser, signIn, signOut, signUp } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRouter = express.Router()

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);
// Create User (Protected, Admin Only)
authRouter.post("/create-user", createUser);
authRouter.get("/current", protect, checkAuth);


export default authRouter;

