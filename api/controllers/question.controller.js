import questionModel from "../models/question.model.js";

async function addQuestionController(req, res) {
  try {
    await questionModel.create(req.body);
    res.json({ message: "Question Added Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong in adding question." });
  }
}

async function getAllQuestionController(req, res) {
  try {
    let data = await questionModel.find();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong during fetching all questions." });
  }
}

async function getQuestionByTitle(req, res) {
  try {
    let title = req.params.title;
    console.log(title);
    let question = await questionModel.findOne({ title });
    if(!question){
      return res.status(400).json({message:"Something went wrong during fetching question by title"})
    }
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong during fetching question by title. ",
    });
  }
}

async function getTotalQuestions(req, res) {
  console.log("Inside get total questions");
  try {
    var totalQuestions = await questionModel.countDocuments();
    console.log("Total Question",totalQuestions);
    return res.status(200).json({
      totalQuestions,
      message: "Successfully fetched total number of questions",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in fetching number of questions",
    });
  }
}

export {
  addQuestionController,
  getAllQuestionController,
  getQuestionByTitle,
  getTotalQuestions,
};
