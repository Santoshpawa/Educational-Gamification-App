// only for backend developers

import express from "express";
import { addQuestionController, getQuestionByTitle, getAllQuestionController, getTotalQuestions } from "../controllers/question.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const questionRouter = express.Router();

questionRouter.post("/", addQuestionController);

questionRouter.get("/", getAllQuestionController);

questionRouter.get("/totalQuestions", verifyJWT, getTotalQuestions);
questionRouter.get("/:title",verifyJWT,getQuestionByTitle);



export default questionRouter; 