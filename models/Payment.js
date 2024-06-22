const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
  Email:String,  
  Address:String,
  Country:String,
  City:String,
  Zip_Code:Number,
  CARD_NUMBER:Number,
  CARD_HOLDER:String,
  VALID_THRU:Number,
  CVV:Number,
  });




  // Create a model based on that schema
const Mydata = mongoose.model("Mydataa", articleSchema);

//export the model
module.exports = Mydata