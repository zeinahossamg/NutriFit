const Person = require('../models/nutritionperson');
const User = require("../models/users")


exports.getCreateNP = (req, res) => {
    res.render('CreateNP');
  };

  exports.getCNPP = (req, res) => {
    res.render('CNPP');
  };




exports.getUser = async (req, res) => {
  const { email } = req.session.user;

  try {
    const user = await Person.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addPerson = async (req, res) => {
  const { name, age, email, Target, Height, Weight, BurnRate, BodyFatPercent, Gender, nutrition_data, food_Items } = req.body;
  const { user } = req.session;

  if (!user || !user.email) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  if (user.email !== email) {
    return res.status(403).json({ error: 'Unauthorized access to user data' });
  }

  const newPerson = new Person({ name, age, email, Target, Height, Weight, BurnRate, BodyFatPercent, Gender, nutrition_data, food_Items });

  try {
    await newPerson.save();
    res.status(201).send('Person added successfully');
    console.log("Data saved successfully");
  } catch (error) {
    res.status(400).send('Error adding person');
    console.error("Error adding person:", error);
  }
};
exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username, password });
  
      if (user) {
        req.session.authenticated = true;
        req.session.userID = user._id;
        req.session.role = user.role;
  
        if (user.role === 'admin') {
          res.json({ redirectTo: '/index.html' });
        } else {
          res.json({ redirectTo: '/CreateNP.html' });
        }
      } else {
        res.status(403).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/');
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  };