import questionModel from "../models/question.model.js";

async function addQuestionController(req, res) {
  try {
    await questionModel.create(req.body);
    res.json({ msg: "Question Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Something went wrong." });
  }
}

async function getQuestionController(req, res) {
  try {
    let data = await questionModel.find();
    res.json(data);
  } catch (error) {
    res.json({ msg: "Something went wrong." });
  }
}

async function getQuestionByTitle(req, res) {
  try {
    let title = req.params.title;
    console.log(title);
    let question = await questionModel.findOne({ title });
    res.json(question);
  } catch (error) {
    res.json({ msg: "Something went wrong." });
  }
}

export { addQuestionController, getQuestionController, getQuestionByTitle };
