import express from "express";
import {
  userLogin,
  userOAuthLogin,
  userSignup,
} from "../controllers/user.controller.js";

import { googleOAuthMiddleware } from "../middlewares/google.oauth.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);
userRouter.post("/googleSignup", googleOAuthMiddleware, userOAuthLogin);

export default userRouter;
