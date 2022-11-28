const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: false,
    },
    aboutMe: {
      type: Map,
      of: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokenString: {
      type: String,
      required: false,
    },
    rooms: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Room" }],
      required: false,
    },
    pointsEarned: {
      type: Map,
      of: Number,
      required: true,
    },
    deadlines: {
      type: Map,
      of: Date,
      required: false,
    },
    progressBar: {
      type: Map,
      of: Number,
      required: false,
    },
    pendingTasks: {
      type: Map,
      of: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
      required: false,
    },
    completedTasks: {
      type: Map,
      of: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
      required: false,
    },
    pfp: {
      type: mongoose.Schema.ObjectId,
      required: false,
    },
    banner: {
      type: mongoose.Schema.ObjectId,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
