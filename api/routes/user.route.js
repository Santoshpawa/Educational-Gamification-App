import express from "express";
import {
  getTotalSolvedQuestions,
  userLogin,
  userOAuthLogin,
  userSignup,
  userSolvedAQuestion,
} from "../controllers/user.controller.js";

import { googleOAuthMiddleware } from "../middlewares/google.oauth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);
userRouter.post("/googleSignup", googleOAuthMiddleware, userOAuthLogin);

userRouter.post("/solved", verifyJWT, userSolvedAQuestion);

userRouter.get("/solvedQuestions",  verifyJWT, getTotalSolvedQuestions);
export default userRouter;
