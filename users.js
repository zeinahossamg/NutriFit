const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Schema (the structure of the user)
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default:"Client",
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on that schema
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;