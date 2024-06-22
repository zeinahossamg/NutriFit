
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const planSchema = new Schema({
    
    plan :String,
    duration:String,
    price: Number,
   });


   const Plan = mongoose.model("Plan", planSchema);
   module.exports = Plan;