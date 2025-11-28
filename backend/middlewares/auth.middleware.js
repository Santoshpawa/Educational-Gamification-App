import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export async function verifyJWT(req, res, next) {
  try {
    var token =
      req.cookies?.accessToken || req.header("Authorization").split(" ")[1];

    if (!token) {
      token = req.header("Authorization")?.replace("Bearer ", "");
    }
    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({ message: "Please Login." });
    }

    try {
      var decodedToken = jwt.verify(token, process.env.Access_Token_Secret);
    } catch (error) {
      token = req.cookies?.refreshToken;
    }
    if (!decodedToken) {
      try {
        decodedToken = jwt.verify(token, process.env.Refresh_Token_Secret);
      } catch (error) {
        return res.status(401).json({ message: "Please Login." });
      }
    }
    const user = await userModel.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid token. Please login again." });
    }

    req.user = user._id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Something went wrong in authMiddleware" });
  }
}
