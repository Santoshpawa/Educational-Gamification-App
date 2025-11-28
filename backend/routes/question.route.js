// only for backend developers

import express from "express";
import { addQuestionController, getQuestionByTitle, getQuestionController } from "../controllers/question.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const questionRouter = express.Router();

questionRouter.post("/", addQuestionController);

questionRouter.get("/", getQuestionController);

questionRouter.get("/:title", verifyJWT ,getQuestionByTitle);


export default questionRouter; 