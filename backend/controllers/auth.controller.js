import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

async function signController(req, res) {
  try {
    let { email, password } = req.body;

    if (await userModel.findOne({email})) {
      throw new Error("User already present.");
    }

    const hash = await bcrypt.hash(password, saltRounds);

    await userModel.create({ email, password: hash });

    res.json({ message: "User signed up successfully." });
  } catch (error) {
    console.log("hello");
    if(error.message == "User already present."){
      res.status(409).json({message:error.message});
    }
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function loginController(req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.json({ message: "User not found." });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(409).json({ message: "User not found." });
      return;
    } else {
      res.json({ message: "User logged in successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export { signController, loginController };
