import express from "express";
import {
  loginController,
  logoutController,
  signController,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();


userRouter.post("/signup", signController);

userRouter.post("/login", loginController);

userRouter.get("/logout",verifyJWT, logoutController);

export default userRouter;
