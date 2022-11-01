const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const mongoose = require("mongoose");

router.use(express.json());

// route for creating a new task
router.post("/create", async (req, res) => {
  // this request MUST contain:
  // "creatorId":     the id of the user sending the request to create a new task
  // "name":		    the name of the new task
  // "completed":		a boolean indicating whether this task has been completed or not
  const task = req.body;

  try {
    const dbTask = new Task(
      {
        _id: new mongoose.Types.ObjectId(), // not part of request
        creatorId: task.creatorId, // required, id (as a String)
        name: task.name, // required; String
        description: task.description, // optional; String
        difficulty: task.difficulty, // optional; String
        deadline: task.deadline, // optional; Date
        points: task.points, // optional; Number
        status: task.status, // required; Boolean
        assignedUser: task.assignedUser, // optional; id (as a String)
      },
      { timestamps: true }
    );

    await dbTask.save();

    return res.status(200).json({ msg: "Task created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Task creation failed." });
  }
});

// route for deleting an existing task
router.post("/delete", async (req, res) => {
  // this request should contain the `_id` of the task to be deleted
  const taskToDelete = req.body;

  try {
    const findRes = await Task.findByIdAndDelete(taskToDelete.id);

    return res.status(200).json({ msg: "Task deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Deleting task failed." });
  }
});

// route for updating a field of an existing task
router.post("/update", async (req, res) => {
  // this request should contain:
  // "id":        the `_id` of the task,
  // "fieldName": the name of the field to be changed,
  // "value":     and the new value
  const taskToUpdate = await Task.findById(req.body.id);

  try {
    // I'm sorry this looks awful - Nick
    switch (req.body.fieldName) {
      case "name":
        taskToUpdate.update({ name: req.body.value });
        break;
      case "description":
        taskToUpdate.update({ description: req.body.value });
        break;
      case "difficulty":
        taskToUpdate.update({ difficulty: req.body.value });
        break;
      case "deadline":
        taskToUpdate.update({ deadline: req.body.value });
        break;
      case "points":
        taskToUpdate.update({ points: req.body.value });
        break;
      case "completed":
        taskToUpdate.update({ completed: req.body.value });
        // TODO: Make it so that when a task has its "completed" status changed, it gets
        // moved to the array corresponding to its new value.
        // If a Task is in a Room's "todoTasks" list and its "completed" status gets changed
        // to true, then it should get moved to the "completedTasks" list.

        break;
      case "assignedUser":
        taskToUpdate.update({ assignedUser: req.body.value });
        break;
    }

    await taskToUpdate.save();
    return res.status(200).json({ msg: "Task updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Updating task failed." });
  }
});

module.exports = router;
