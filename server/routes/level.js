const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const User = require("../models/UserModel");
const Room = require("../models/RoomModel");


const mongoose = require("mongoose");

router.use(express.json());

router.post("/assign", async (req, res) => {
    const taskToUpdate = await Task.findById(req.body.id);
    const user = await User.findById(req.body.userId);
    const room = await Room.findById(req.body.roomId);
    const taskLevel = user.taskLevel;
    const taskPoints = taskToUpdate.points;
    const taskLevelKey = room._id;
    const taskLevelValue = taskLevel.get(taskLevelKey);
    const newTaskLevelValue = taskLevelValue + taskPoints;
    const taskLevelValueTo100 = Math.floor(newTaskLevelValue / 100);
    taskLevel.set(taskLevelKey, taskLevelValueTo100);
    user.taskLevel = taskLevel;
    user.save();
    return res.status(200).json({ msg: "Task assigned successfully." });
});

