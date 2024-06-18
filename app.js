const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const methodOverride = require("method-override");
const orderRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(connectLivereload());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Livereload setup
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Routes
app.use("/", orderRoutes);
app.use("/admin", adminRoutes);
app.use("/", authRoutes);  // or app.use("/auth", authRoutes) depending on your preference

// MongoDB connection
mongoose
  .connect("mongodb+srv://ismailtaha:dkZwhZAWs7qc5e6A@cluster0.833yijf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
