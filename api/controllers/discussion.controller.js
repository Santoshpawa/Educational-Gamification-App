import { discussModel } from "../models/discuss.model.js";
import { userModel } from "../models/user.model.js";

async function addDiscussion(req, res) {
  try {
    
    const title = req.body.title;
    console.log("Title:", title);
    console.log("Req.user", req.userId);
    const user = await userModel.findById(req.userId);
    await discussModel.create({
      title,
      email: user.email,
    });

    return res.status(200).json({ message: "Discussion Title Added" });
  } catch (error) {
    console.log("Error: ",error);
    return res
      .status(500)
      .json({ message: "Something went wrong in adding Discussion Title" });
  }
}

async function getDiscussion(req, res) {
  try {
    
    const titles = await discussModel.find(); // array or object ?
   
    return res.status(200).json({ titles, message: "Discussion titles" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong in fetching discussion titles" });
  }
}

async function getThreads(req, res) {
  try {
    console.log("inside get threads section");
    let id = req.params.id;
    let title = await discussModel.findById(id);
    let threadsFromServer = title.threads;
    return res
      .status(200)
      .json({ threadsFromServer, message: "Threads fetched successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong in fetching threads" });
  }
}

async function addThreads(req, res) {
  try {
    console.log("Inside add thread section.");
    let id = req.params.id;
    let thread = req.body;
    let title = await discussModel.findById(id);
    let newThreads = [thread, ...title.threads];
    title.threads = newThreads;
    await title.save();
    return res.status(200).json({ message: "Thread added successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong in adding thread" });
  }
}

export { addDiscussion, getDiscussion, getThreads, addThreads };
