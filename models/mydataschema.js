const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const orderSchema = new Schema({
 plan :String,
 duration:String,
 price: Number,
});
 
 
// Create a model based on that schema
const Order = mongoose.model("Order", orderSchema);
 
 
// export the model
module.exports = Order;