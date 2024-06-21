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

orderSchema.methods.calculatePrice = function() {
    const prices = {
        'basic': {
            '1-month': 50,
            '3-months': 120,
            '6-months': 200
        },
        'premium': {
            '1-month': 80,
            '3-months': 200,
            '6-months': 350
        }
    };

    return prices[this.plan][this.duration];
};
 
// export the model
module.exports = Order;