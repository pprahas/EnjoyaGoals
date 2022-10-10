const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
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
    deadline: {
        type: Date,
        required: false,
    },
    points: {
        type: Number,
        required: false,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    assignedUser: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;