import { generateHashedPassword, userModel } from "../models/user.model.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  priority: "High",
};

async function generateAccessTokenAndRefreshToken(id) {
  const user = await userModel.findById(id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken };
}

async function userSignup(req, res) {

  const { email, password } = req.body;
  try {
    let [user] = await userModel.find({ email });
    if (!user) {
      const hashedPassword = await generateHashedPassword(password);
      user = await userModel.create({ email, password: hashedPassword });
      const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);
      user.refreshToken = refreshToken;
      await user.save();
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .cookie("user", email)
        .cookie("picture", user.picture)
        .json({
          email,
          picture: user.picture,
          message: "User signed up successfully.",
        });
    } else {
      return res.status(400).json({ message: "User already present. Please Login." });
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

      let { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .cookie("user", email)
        .cookie("picture", user.picture)
        .json({
          email,
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
    console.log("OAuth Login - User after creation/check: ", user);
    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .cookie("user", email)
      .json({
        email,
        picture: user.picture,
        message: "User Login Successfully",
      });
  } catch (error) {
    console.log("Error in userOAuthLogin: ", error);
    return res
      .status(500)
      .json({ message: "Something went wrong in OAuth login" });
  }
}

async function userLogout(req, res) {
  try {
    console.log("Logging out user with ID: ", req.userId);
    let user = await userModel.findById(req.userId);
    user.refreshToken = "";
    await user.save();
    console.log("User logged out: ", user.email);
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .clearCookie("user")
      .clearCookie("picture")
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error during logout: ", error);
    return res
      .status(500)
      .json({ message: "Something went wrong during logging out" });
  }
}

export { userSignup, userLogin, userOAuthLogin, userLogout };
