// Define MongoDB schema and model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    Target: String,
    Height: String,
    Weight: String,
    BurnRate: Number,
    BodyFatPercent: Number,
    Gender: String,
    nutrition_data: Object,
    food_Items: { type: Array, default: [] }
  });
  const Person = mongoose.model('Person', personSchema);
  


  module.exports = Person