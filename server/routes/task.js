const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const mongoose = require("mongoose");

router.use(express.json());

router.post("/create", async (req, res) => {
    const task = req.body;

    try {
        const dbTask = new Task({
            _id: new mongoose.Types.ObjectId(),
            name: task.name,
            description: task.description,
            difficulty: task.difficulty,
            deadline: task.deadline,
            points: task.points,
            completed: task.completed,
            assignedUser: task.assignedUser
        }, { timestamps: true });

        await dbTask.save();

        return res.status(200).json({ msg: "Task created successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Task creation failed." });
    }
})

module.exports = router;