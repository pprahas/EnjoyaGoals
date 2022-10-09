const mongoose = require("mongoose");
const User = require("./models/UserModel.js");

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    difficulty: {
        type: String,
        required: false,
    },
    points: {
        type: int,
        required: false,
    },
    completed: {
        type: boolean,
        required: true,
    },
    assignedUser: {
        type: User,
        required: true,
    }
}, {timestamps: true})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;