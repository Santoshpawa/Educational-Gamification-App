import { generateHashedPassword, userModel } from "../models/user.model.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "strict", // Cross-Site Request Forgery: other sites can access the cookies (strict means "no")
};

async function generateAccessTokenAndRefreshToken(userId) {
  const user = await userModel.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
}

async function signController(req, res) {
  try {
    let { email, password } = req.body;

    if (await userModel.findOne({ email })) {
      throw new Error("User already present.");
    }

    const hashedPassword = await generateHashedPassword(password);

    const user = await userModel.create({ email, password: hashedPassword });

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User signed up successfully.",
        user,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    if (error.message == "User already present.") {
      res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong during signup." });
  }
}

async function loginController(req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect) {
      res.status(409).json({ message: "Invalid login credentials." });
      return;
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully.",
        user,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong during login." });
  }
}

async function logoutController(req, res) {
  try {
    console.log("inside logout controller");
    console.log("User", req.user);
    await userModel.findByIdAndUpdate(req.user, {
      $set: { refreshToken: undefined },
    });

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logging out");
  }
}

export { signController, loginController, logoutController };
