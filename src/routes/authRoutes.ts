import express from "express";
import {
  loginController,
  logoutController,
  signUpController,
} from "../controllers/authController";
const authRouter = express.Router();

authRouter.post("/signup", signUpController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
export default authRouter;
