import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question : {type: String, required: true, unique: true},
    level : {type:String, required:true, enum:["easy", "medium", "hard"]},
});

const questionModel = mongoose.model("questions",questionSchema);

export default questionModel;
