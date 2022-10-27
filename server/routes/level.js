const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const mongoose = require("mongoose");

router.use(express.json());


router.post("/assign", async (req, res) => {
    const taskToUpdate = await Task.findById(req.body.id);
    const user = await User.findById(req.body.userId);
    const room = await Room.findById(req.body.roomId);
    const taskLevel = user.taskLevel;
    const taskPoints = taskToUpdate.points;
    const roomPoints = room.points;
    const taskName = taskToUpdate.name;
    const roomName = room.name;
    const taskLevelKey = roomName + taskName;
    const taskLevelValue = taskLevel.get(taskLevelKey);
    const newTaskLevelValue = taskLevelValue + taskPoints;
    taskLevel.set(taskLevelKey, newTaskLevelValue);
    user.taskLevel = taskLevel;
    user.save();
    return res.status(200).json({ msg: "Task assigned successfully." });
});
