import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addDiscussion, addThreads, getDiscussion, getThreads } from "../controllers/discussion.controller.js";

const discussonRouter = express.Router();

discussonRouter.post("/", verifyJWT,addDiscussion);


discussonRouter.get("/", getDiscussion);

discussonRouter.get("/:id", getThreads);

discussonRouter.post("/:id",addThreads);


export default discussonRouter;