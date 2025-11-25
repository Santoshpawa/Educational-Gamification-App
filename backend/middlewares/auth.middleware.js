import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export async function verifyJWT(req, res, next) {
  try {

    console.log("Request headers:", req.header('Cookie'));

    const token =
      req.cookies?.accessToken || req.header("Authorization").split(" ")[1];
    console.log("Accesstoken:",token);
    if (!token) {
      return res.status(400).json({ message: "Unauthorized access" });
    }
    
    let decodedToken = jwt.verify(token, process.env.Access_Token_Secret);

    const user = await userModel.findById(decodedToken?._id);

    if (!user) {
      return res.status(400).json({ message: "Invalid Access token" });
    }

    req.user = user._id;
    next();
  } catch (error) {
    console.log("Error in auth middleware")
    return res
      .status(401)
      .json({ message: "Something went wrong in authMiddleware" });
  }
}
