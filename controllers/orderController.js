// controllers/orderController.js
const Order = require("../models/mydataschema");

exports.getIndex = async (req, res) => {
  try {
    const ordersArray = await Order.find({});
    res.render("index", { arr: ordersArray });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateOrder = async (req, res) => {
  const orderIndex = parseInt(req.body.Ordertoedit, 10) - 1;
  const { plan, duration, price } = req.body;

  const ordersArray = await Order.find({});
  const orderId = ordersArray[orderIndex]._id;

  try {
    await Order.updateOne({ _id: orderId }, { plan, duration, price });
    console.log(`Updated order with ID: ${orderId}`);
    res.redirect("/index.html");
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.createOrder = (req, res) => {
  const order = new Order(req.body);
  order.save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.error('Error creating order:', err);
      res.status(500).send('Internal Server Error');
    });
};

exports.deleteOrder = async (req, res) => {
  const orderIndex = parseInt(req.body.OrderIDDelete, 10) - 1;
  
  const ordersArray = await Order.find({});
  const orderId = ordersArray[orderIndex]._id;

  try {
    await Order.deleteOne({ _id: orderId });
    console.log(`Deleted order with ID: ${orderId}`);
    res.redirect("/index.html");
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).send('Internal Server Error');
  }
};
