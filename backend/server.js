import express from "express";
import cors from "cors";

import connectToDb from "./configs/mongo.config.js";
import authRouter from "./routes/auth.route.js";
import questionRouter from "./routes/question.route.js";

const app = express();
console.log("Before cors");
const allowedOrigins = [
  'http://localhost:5173', // Keep local for testing
  'https://educational-gamification-7df52f.netlify.app' // <<< YOUR DEPLOYED FRONTEND URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl) or if origin is in the allowed list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// 2. Apply the CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

console.log("after cors");
app.use("/auth",authRouter);

// this route below is only for backend to add and update  questions in database
app.use("/questions", questionRouter);

const PORT = process.env.PORT || 3000;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening to the requests at port ${PORT}`);
  });
});
