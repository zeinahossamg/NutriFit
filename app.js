const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // Use connect-mongo for MongoDB session store
const exerciseRoutes = require("./routes/exerciseRoutes");
const users = require("./models/users");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config({ path: "./.env" });

let uri = process.env.MONGODB_URI;
let port = process.env.PORT;

app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Use connect-mongo to store sessions in MongoDB
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ mongoUrl: uri }),
    cookie: { maxAge: 1000 * 60 * 60 }, // 24 hours
  })
);

// Routes
app.use("/exercise", exerciseRoutes);
app.use("/user", userRoutes);

// View routes
app.get("/exercises", function (req, res) {
  if (req.session.authenticated) {
    res.render("exercisesLandingPage");
  }
});

app.get("/viewAllExercises", function (req, res) {
  if (req.session.authenticated) {
    res.render("viewAllExercises");
  }
});

app.get("/addExercise", function (req, res) {
  if (req.session.authenticated) {
    res.render("addExercise");
  }
});

app.get("/", (req, res) => {
  res.render("signin-signup.ejs");
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await users.findOne({ username, password });

    if (user) {
      req.session.authenticated = true;
      req.session.userID = user._id;
      res.json({
        username: user.username,
        role: user.role,
      });
    } else {
      res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
