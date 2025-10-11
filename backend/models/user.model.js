import mongoose from "mongoose";

const submissionSchema = mongoose.Schema({
    questionId : {type: mongoose.Schema.ObjectId, ref: "questions",required: true},
    isCorrect : {type:Boolean, default: false}
})

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true},
    attempts : [submissionSchema]
});

const userModel = mongoose.model("users",userSchema);

export {userModel};