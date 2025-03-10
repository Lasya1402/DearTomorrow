const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String },
  file: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Capsule", capsuleSchema);
