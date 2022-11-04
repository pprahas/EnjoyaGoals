const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
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
    completedTime: {
      type: Date,
      required: false,
    },
    points: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    assignedUser: {
      type: String,
      required: false,
    },
    completedBy: {
      type: String,
      required: false,
    },
    roomId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    feedback: {
      type: String,
      required: false,
    },
    creatorId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
