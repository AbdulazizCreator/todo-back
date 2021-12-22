const express = require("express"),
  config = require("./app"),
  path = require("path");
(app = express()), (dotenv = require("dotenv").config());

app = config(app);
app.set("port", process.env.PORT || 5000);

// Connect mongo
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("open", function () {
  console.log("Mongoose Connected Successfully!");
});
mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!");
  return console.log(err.message);
});

//  Server
const server = app.listen(app.get("port"), function () {
  console.log("Server up: http://localhost:" + app.get("port"));
});
