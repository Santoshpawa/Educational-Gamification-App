import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { options } from "../controllers/user.controller.js";

export async function verifyJWT(req, res, next) {
  try {
    var token = req.cookies?.accessToken;

    try {
      var decodedToken = jwt.verify(token, process.env.Access_Token_Secret);
      var  user = await userModel.findById(decodedToken?._id);
    } catch (error) {
      token = req.cookies?.refreshToken;
    }
    if (!decodedToken) {
      try {
        decodedToken = jwt.verify(token, process.env.Refresh_Token_Secret);
        user = await userModel.findById(decodedToken?._id);
        res.cookie("accessToken", user.generateAccessToken(), options );
      } catch (error) {
        return res.status(401).json({ message: "Please Login." });
      }
    }
    user = await userModel.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid token. Please login again." });
    }

    req.userId = user._id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Something went wrong in authMiddleware" });
  }
}
