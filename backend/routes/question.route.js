// only for backend developers

import express from "express";
import { addQuestionController, getQuestionById, getQuestionController } from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.post("/", addQuestionController);

questionRouter.get("/", getQuestionController);

questionRouter.get("/:id", getQuestionById);


export default questionRouter;