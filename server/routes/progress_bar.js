const Room = require("../models/RoomModel");
const express = require("express");

const Task = require("../models/TaskModel");
require("dotenv").config();

const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const todoT = await Room.findById(req.body.id); /*.select(todoTasks);*/
    const doneT = await Room.findById(req.body.id); /*.select(
      completedTasks
    );*/
    //console.log(doneT.get("completedTasks"));
    const todo = todoT.get("teamTasks");
    const done = doneT.get("completedTasks");
    const percent = 100;
    if (todo.length == 0) {
      console.log("todo.length = 0", todo.length);
      res.status(200).send({ percent: percent });
    } else {
      let incomplete_tasks = 0;
      for (let i = 0; i < todo.length; i++) {
        const task = await Task.findById(todo[i]);
        if (task.status != "complete") {
          incomplete_tasks += 1;
        } else if (task.status != "missed") {
          complete_tasks += 1;
        }
      }

      // let percent = (done.length / todo.length) * 100;
      let percent = (complete_tasks/(incomplete_tasks + complete_tasks)) * 100;
      percent = Math.floor(percent);

      res.status(200).send({ percent: percent, number: incomplete_tasks });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
