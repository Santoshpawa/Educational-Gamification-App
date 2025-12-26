import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  solvedQuestions: [String], 
  picture: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9MB1JwKRsXEPgcjMb0uTHfSA09mMat-VY5g&s"}, 
});

const generateHashedPassword = async function (password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.Access_Token_Secret,
    { expiresIn: process.env.Access_Token_Expire }
  );
};



const userModel = mongoose.model("users", userSchema);

export { userModel, generateHashedPassword };
