const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
  Email:String,  
  Address:String,
  Country:String,
  City:String,
  ZipCode:Number,
  CARDNUMBER:Number,
  CARDHOLDER:String,
  VALIDTHRU:Number,
  CVV:Number,
  });




  // Create a model based on that schema
const Mydata = mongoose.model("Mydataa", articleSchema);

//export the model
module.exports = Mydata