import { generateHashedPassword, userModel } from "../models/user.model.js";

export const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  priority: "High",
};

async function userSignup(req, res) {
  const { email, password } = req.body;
  try {
    let [user] = await userModel.find({ email });
    if (!user) {
      const hashedPassword = await generateHashedPassword(password);
      user = await userModel.create({ email, password: hashedPassword });
      const accessToken = user.generateAccessToken();

      return res.status(200).json({
        token: accessToken,
        user: email,
        picture: user.picture,
        message: "User signed up successfully.",
      });
    } else {
      return res
        .status(400)
        .json({ message: "User already present. Please Login." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while signing in" });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Sign up Please." });
    } else {
      const isPasswordCorrect = await user.checkPassword(password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Wrong input Credentials" });
      }

      let accessToken = user.generateAccessToken();

      return res.status(200).json({
        user: email,
        token: accessToken,
        picture: user.picture,
        message: "User logged in successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went worng while logging user." });
  }
}

// login using oauth
async function userOAuthLogin(req, res) {
  const { email, picture } = req.user;
  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({ email, picture });
    }
    const accessToken = user.generateAccessToken();
    return res.status(200).json({
      user: email,
      picture,
      token: accessToken,
      message: "User Login Successfully",
    });
  } catch (error) {
    console.log("Error in userOAuthLogin: ", error);
    return res
      .status(500)
      .json({ message: "Something went wrong in OAuth login" });
  }
}

// user solved question
async function userSolvedAQuestion(req, res) {
  const { questionId } = req.body;
  const userId = req.userId;

  try {
    var user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.solvedQuestions.includes(questionId)) {
      await user.solvedQuestions.push(questionId);
      await user.save();
      return res.status(200).json({ message: "Question marked as solved" });
    } else {
      return res
        .status(200)
        .json({ message: "Question already marked as solved" });
    }
  } catch (error) {
    console.log("Error in userSolved: ", error);
    return res
      .status(500)
      .json({
        message: "Something went wrong while marking question as solved",
      });
  }
}

async function getTotalSolvedQuestions(req, res) {
  const userId = req.userId;
  console.log("user who solved the questions", userId);
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  let solvedQuestions = user.solvedQuestions.length;
  return res
    .status(200)
    .json({
      solvedQuestions,
      message: "Successfully fetched total solved questions",
    });
}

export {
  userSignup,
  userLogin,
  userOAuthLogin,
  userSolvedAQuestion,
  getTotalSolvedQuestions,
};
