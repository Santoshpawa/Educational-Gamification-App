import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const submissionSchema = mongoose.Schema({
  questionId: {
    type: mongoose.Schema.ObjectId,
    ref: "questions",
    required: true,
  },
  isCorrect: { type: Boolean, default: false },
});

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  attempts: [submissionSchema],
  refreshToken: { type: String },
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

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.Refresh_Token_Secret,
    { expiresIn: process.env.Refresh_Token_Expire }
  );
};

const userModel = mongoose.model("users", userSchema);

export { userModel, generateHashedPassword };
