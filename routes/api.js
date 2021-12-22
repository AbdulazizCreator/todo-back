const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");

// Get all Todos
router.get("/todos", async (req, res) => {
  //this will return all the data, exposing only the id and todo field to the client
  try {
    const todos = await Todo.find({}, "todo");
    if (!todos) {
      return res.status(400).json({
        success: false,
        message: "Todos not retrieved",
        todos: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      todos: todos,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Create a Todo
router.post("/todos", async (req, res) => {
  try {
    const { todo } = req.body;
    const todos = await Todo.create({ todo });
    if (!todos) {
      return res.status(400).json({
        success: false,
        message: "Problem creating Todo",
        todo: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully created Todo",
      todo: todos,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Update a Todo
router.patch("/todos/:id", async (req, res) => {
  try {
    const { todo } = req.body;
    const update = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { todo }
    );
    if (!update) {
      return res.status(400).json({
        success: false,
        message: "Not successfully updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo successfully updated",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete a Todo
router.delete("/todos/:id", async (req, res) => {
  try {
    const deleteTodo = await Todo.findOneAndDelete({ _id: req.params.id });
    if (!deleteTodo) {
      return res.status(400).json({
        success: false,
        message: "Todo not deleted",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
