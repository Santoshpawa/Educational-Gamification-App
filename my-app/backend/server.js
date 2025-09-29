import express from "express";
import connectToDb from "./configs/mongo.config.js";

const app = express();

connectToDb().then(() => {
  app.listen(3000, () => {
    console.log("Server is listening to the requests at port 3000");
  });
});
