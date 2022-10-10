const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const mongoose = require("mongoose");

router.use(express.json());

// route for creating a new post
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
});

// route for deleteing an existing task
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
    const taskToUpdate = req.body;

    var findRes;
    
    try {
        // I'm sorry this looks awful - Nick
        switch (taskToUpdate.fieldName) {
            case "name":			findRes = await Task.findByIdAndUpdate(taskToUpdate.id, {"name": taskToUpdate.value} );			break;
            case "description":		findRes = await Task.findByIdAndUpdate(taskToUpdate.id, {"description": taskToUpdate.value} );	break;
            case "difficulty":		findRes = await Task.findByIdAndUpdate(taskToUpdate.id, {"difficulty": taskToUpdate.value} );	break;
            case "deadline":		findRes = await Task.findByIdAndUpdate(taskToUpdate.id, {"deadline": taskToUpdate.value} );		break;
            case "points":			findRes = await Task.findByIdAndUpdate(taskToUpdate.id, {"points": taskToUpdate.value} );		break;
            case "completed":		findRes = await Task.findByIdAndUpdate(taskToUpdate.id, {"completed": taskToUpdate.value} );	break;
            case "assignedUser":	findRes = await Task.findByIdAndUpdate(taskToUpdate.id, {"assignedUser": taskToUpdate.value} );	break;
        }
        
        return res.status(200).json({ msg: "Task updated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Updating task failed." });
    }
});

module.exports = router;