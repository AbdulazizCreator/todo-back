const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const TodoSchema = new Schema({
  todo: {
    type: String,
    required: [true, "The todo text field is required"],
  },
});

//create model for todo
const Todos = mongoose.model("todo", TodoSchema);
module.exports = Todos;
