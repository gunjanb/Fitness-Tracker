// modules required
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// HTTP request logger middleware for node.js
const logger = require("morgan");
const routes = require("./routes");
const path = require("path");
//port
const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "public")));

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// routes
app.use(routes);

//turn on server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
