const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require('express-session');
const store = new session.MemoryStore();
const users = require("./models/users");
const userRoutes = require("./routes/userRoutes");


const app = express();


const connect = mongoose.connect("mongodb+srv://zeina123:zeina123@cluster0.gu5krui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
let port =3000;

app.set("views", path.join(__dirname, "../frontend/views"))
app.set("view engine", "ejs");

// Middleware
app.use(session({
  secret: 'some secret',
  cookie:{maxAge:30000},
  saveUninitialized:false,
  store: store
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../frontend/public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes

app.use("/user", userRoutes);

//zeina

app.get("/", (req,res) => {
  res.render("signin-signup.ejs");
});                     

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await users.findOne({ username, password });

    if (user) {
      req.session.authenticated = true;
      req.session.user = user;
      res.json({ username: user.username, role: user.role });
    } else {
      res.status(403).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// MongoDB connection
connect .then(() => {
    app.listen(port, () => {
      console.log("database connected successfully");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("database cannot connect");
  });
