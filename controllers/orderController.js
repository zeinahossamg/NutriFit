// controllers/orderController.js
const { check,validationResult } = require("express-validator");
const Order = require("../models/mydataschema");

exports.renderAddOrders = async (req, res) => {
  const ordersArray = await Order.find({});
  
  res.render('admin/Orders-Crud/AddOrders', { arr: ordersArray , success : req.session.success , message : req.session.message  });
};
exports.renderEditOrders = async (req, res) => {
  const ordersArray = await Order.find({});
  
  res.render('admin/Orders-Crud/EditOrders', { arr: ordersArray , success : req.session.success , message : req.session.message  });
};
exports.renderDeleteOrders = async (req, res) => {
  const ordersArray = await Order.find({});
  
  res.render('admin/Orders-Crud/DeleteOrders', { arr: ordersArray , success : req.session.success , message : req.session.message  });
};

exports.getIndex = async (req, res) => {
  try {
    const ordersArray = await Order.find({});
    console.log("rerendered");
    
    res.render("index", { arr: ordersArray , success : req.session.success , message : req.session.message  });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateOrder = async (req, res) => {
  const orderIndex = parseInt(req.body.Ordertoedit, 10) - 1;
  const { plan, duration } = req.body;

  console.log(orderIndex,plan,duration);
  try {
    // Fetch the current orders array
    const ordersArray = await Order.find({});
    
    // Validate orderIndex
    if (isNaN(orderIndex) || orderIndex < 0 || orderIndex >= ordersArray.length) {
      console.error('Invalid order index:', orderIndex);
      req.session.message = 'Invalid order index';
      req.session.success = false;
      console.log('Session success message:', req.session.success);
      res.redirect("/Orders-Crud/EditOrders");
    } else{

      const orderId = ordersArray[orderIndex]._id;

      // Perform the update operation
      await Order.updateOne({ _id: orderId }, { plan, duration });
      console.log(`Updated order with ID: ${orderId}`);
  
      // Set success message
      req.session.message = "Order updated successfully";
      req.session.success = true;
  
      // Redirect after successful update
      res.redirect("/index.html");
    }

    

  } catch (err) {
    console.error('Error updating order:', err);
    
    // Set error message
    req.session.message = 'Error updating order';
    req.session.success = false;

    // Redirect to index.html with error status
    res.status(500).send('Internal Server Error');
  }
};


exports.createOrder = async (req, res) => {
  const { plan, duration } = req.body;

  try {
    // Validate input fields (if needed)
    if (!plan || !duration ) {
      console.error('Invalid input data');
      console.log(plan,duration)
      req.session.message = 'Invalid input data';
      req.session.success = false;
      res.redirect("/Orders-Crud/AddOrders");
    }else{

      const Order = new Order({ plan, duration });
      await Order.save();
      console.log('Order created successfully');
  
      req.session.message = "Order created successfully";
      req.session.success = true;
      res.redirect("/index.html");

    }

    

  } catch (err) {
    console.error('Error creating order:', err);
    req.session.message = 'Internal Server Error';
    req.session.success = false;
    res.redirect("/index.html");
  }
};


exports.deleteOrder = async (req, res) => {
  const orderIndex = parseInt(req.body.OrderIDDelete, 10) - 1;
console.log("backend delte");
  try {
    // Fetch the current orders array
    const ordersArray = await Order.find({});
    
   
    // Validate orderIndex
    if (isNaN(orderIndex) || orderIndex < 0 || orderIndex >= ordersArray.length) {
      console.error('Invalid order index:', orderIndex);
      req.session.message = 'Invalid order index ';
      req.session.success = false;
      console.log('Session success message:', req.session.success);
      res.redirect("/Orders-Crud/DeleteOrders");

    } else{

      const orderId = ordersArray[orderIndex]._id;

    // Delete the order
    await Order.deleteOne({ _id: orderId });
    console.log(`Deleted order with ID: ${orderId}`);

    req.session.message = "Order Deleted succesfully";
      req.session.success = true;

    // Redirect after deletion
    res.redirect("/index.html");
    }

  } catch (err) {
    console.error('Error deleting order:', err);
   
    res.redirect("/index.html");
  }
};


