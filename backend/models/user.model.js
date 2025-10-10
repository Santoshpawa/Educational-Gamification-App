import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true}
});

const userModel = mongoose.model("users",userSchema);

export {userModel};