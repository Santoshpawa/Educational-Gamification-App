import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

async function signController(req, res) {
  try {
    let { name, email, password } = req.body;
   
    const hash = await bcrypt.hash(password, saltRounds); 

    await userModel.create({ name, email, password: hash });
    
    res.json({ msg: "User signed up successfully." });
  } catch (error) {
    res.json({ msg: "Something went wrong." });
    console.log(error);
  }
}

async function loginController(req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.json({ msg: "User not found." });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json({ msg: "User not found." });
      return;
    }else{
        res.json({msg: "User logged in successfully."})
    }

  } catch (error) {
    res.json({msg: "Something went wrong"});
  }
}

export { signController , loginController};
