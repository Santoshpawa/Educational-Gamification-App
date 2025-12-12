import express from "express";
import {
  userLogin,
  userLogout,
  userOAuthLogin,
  userSignup,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { googleOAuthMiddleware } from "../middlewares/google.oauth.middleware.js";

const userRouter = express.Router();


userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);
userRouter.post("/googleSignup", googleOAuthMiddleware ,userOAuthLogin);

userRouter.get("/logout",verifyJWT, userLogout);

export default userRouter;
