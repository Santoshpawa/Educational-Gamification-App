import express from "express";
import { loginController, signController } from "../controllers/auth.controller.js";

const authRouter = express.Router();


authRouter.post("/signup", signController);


authRouter.post("/login", loginController);


export default authRouter;