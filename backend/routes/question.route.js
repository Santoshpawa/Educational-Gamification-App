// only for backend developers

import express from "express";
import { addQuestionController, getQuestionByTitle, getQuestionController } from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.post("/", addQuestionController);

questionRouter.get("/", getQuestionController);

questionRouter.get("/:title", getQuestionByTitle);


export default questionRouter; 