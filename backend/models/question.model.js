import mongoose from "mongoose";

const testCaseSchema = mongoose.Schema({
  testCase: [{ type: mongoose.Schema.Types.Mixed, required: true }],
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
});

const questionSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, required: true, enum: ["easy", "medium", "hard"] },
  question: { type: String, required: true, unique: true },
  codeTemplate: { type: String, required: true },
  functionName : {type:String, required : true},
  parametersName : [{type: String, required: true}],
  testCases: [testCaseSchema]
});

const questionModel = mongoose.model("questions", questionSchema);

export default questionModel;
