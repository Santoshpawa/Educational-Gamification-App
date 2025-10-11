import questionModel from "../models/question.model.js";

async function addQuestionController(req, res) {
  try {
    await questionModel.create(req.body);
    res.json({ msg: "Question Added Successfully" });
  } catch (error) {
    res.json({ msg: "Something went wrong." });
  }
}

async function getQuestionController(req, res) {
  try {
    let data = await questionModel.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.json({ msg: "Something went wrong." });
  }
}

async function getQuestionById(req, res) {
  try {
    let id = req.params.id; 
    let question = await questionModel.findOne({ _id: id });
    res.json(question);
  } catch (error) {
    res.json({ msg: "Something went wrong." });
  }
}

export { addQuestionController, getQuestionController , getQuestionById};
