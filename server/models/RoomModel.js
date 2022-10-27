const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    users: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
      required: true,
    },
    // completed + incomplete for TEAM
    teamTasks: {
      type: [{ typ: mongoose.Schema.ObjectId, ref: "Task" }],
      required: false,
    },
    // completed for TEAM
    completedTasks: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
      required: false,
    },
    // all pending tasks for a USER
    assignedTasks: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
      required: false,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
