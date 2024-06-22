mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: { type: String, required: true, unique: true },
  muscleGroup: { type: String, required: true },
  difficultyLevel: { type: String, required: true },
  description: { type: String, require: true },
  equipmentNeeded: { type: String, require: true },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
