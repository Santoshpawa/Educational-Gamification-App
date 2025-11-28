import mongoose from "mongoose";

const threadSchema = mongoose.Schema({
  text: { type: String, required: true },
  email: { type: String, required: true },
});

const discussSchema = mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  threads: [threadSchema],
});

const discussModel = mongoose.model("discussion", discussSchema);

export { discussModel };
