const express = require("express");
const router = express.Router();
const Room = require("../models/RoomModel");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel");

const mongoose = require("mongoose");

router.post("/create/about_me", async (req, res) => {
  try {
    const data = req.body;

    const aboutMe = data.aboutMe;
    const userId = data.userId;
    const roomId = data.roomId;
    // const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    user.aboutMe.set(roomId, aboutMe);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
