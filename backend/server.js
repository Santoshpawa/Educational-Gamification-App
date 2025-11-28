import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDb from "./configs/mongo.config.js";
import questionRouter from "./routes/question.route.js";
import userRouter from "./routes/user.route.js";
import discussonRouter from "./routes/discussion.route.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173", // Keep local for testing
  "https://educational-gamification-7df52f.netlify.app", // <<< YOUR DEPLOYED FRONTEND URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl) or if origin is in the allowed list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// 2. Apply the CORS middleware
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  // Check if the error originated from the CORS middleware
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Access forbidden: Your origin domain is not permitted.",
    });
  }
  // Pass other errors down
  next(err);
});
app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRouter);

// this route below is only for backend to add and update  questions in database
app.use("/questions", questionRouter);

app.use("/discuss", discussonRouter);

const PORT = process.env.PORT || 3000;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening to the requests at port ${PORT}`);
  });
});
