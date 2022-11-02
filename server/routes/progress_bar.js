const Room = require("../models/RoomModel");
const express = require("express");
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
      res.status(200).send({ percent: percent });
    } else {
      let percent = (done.length / todo.length) * 100;
      percent = Math.floor(percent);
      res.status(200).send({ percent: percent });
    }

    /*
    const percent = (todoT / doneT) * 100;
    res.status(200).send({ percent: percent });*/
  } catch (error) {
    res.status(400).send({ error: "Error occurred." });
  }
});

module.exports = router;
