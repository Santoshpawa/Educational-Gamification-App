import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDb from "./configs/mongo.config.js";
import questionRouter from "./routes/question.route.js";
import userRouter from "./routes/user.route.js";
import discussonRouter from "./routes/discussion.route.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://educational-gamification-60irik5ae.vercel.app",
];

// app.set('trust proxy', 1);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);

app.use("/api/questions", questionRouter);

app.use("/api/discuss", discussonRouter);

const PORT = process.env.PORT || 3000;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening to the requests at port ${PORT}`);
  });
});
