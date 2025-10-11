import express from "express";
import cors from "cors";

import connectToDb from "./configs/mongo.config.js";
import authRouter from "./routes/auth.route.js";
import questionRouter from "./routes/question.route.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/auth",authRouter);

// this route below is only for backend to add and update  questions in database
app.use("/questions", questionRouter);

connectToDb().then(() => {
  app.listen(3000, () => {
    console.log("Server is listening to the requests at port 3000");
  });
});
