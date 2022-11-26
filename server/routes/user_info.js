const express = require("express");
const router = express.Router();
const Room = require("../models/RoomModel");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel");

const mongoose = require("mongoose");

//setting about me
router.post("/create/about_me", async (req, res) => {
  try {
    const data = req.body;

    const aboutMe = data.aboutMe;
    const userId = data.userId;
    const roomId = data.roomId;
    console.log(aboutMe, userId, roomId);
    // const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    console.log(user);
    user.aboutMe.set(roomId, aboutMe);
    await user.save();
    return res.status(200).json({ msg: "About Me has been stored." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//getting about me
router.post("/get/about_me", async (req, res) => {
  try {
    const data = req.body;

    const userId = data.userId;
    const roomId = data.roomId;
    // console.log(aboutMe, userId, roomId);
    // const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    // console.log(user);
    let aboutMe;
    if (user.aboutMe.has(roomId)) {
      aboutMe = user.aboutMe.get(roomId);
    } else {
      aboutMe = "";
    }
    // aboutMe = user.aboutMe.get(roomId);
    // user.aboutMe.set(roomId, aboutMe);
    // await user.save();
    return res.status(200).json(aboutMe);
  } catch (err) {
    res.status(500).json(err);
  }
});

//change password after user is logged in
router.post("/change_password", async (req, res) => {
  try {
    const data = req.body;

    const userId = data.userId;
    const roomId = data.roomId;
    // console.log(aboutMe, userId, roomId);
    // const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    // console.log(user);
    let aboutMe;
    if (user.aboutMe.has(roomId)) {
      aboutMe = user.aboutMe.get(roomId);
    } else {
      aboutMe = "";
    }
    // aboutMe = user.aboutMe.get(roomId);
    // user.aboutMe.set(roomId, aboutMe);
    // await user.save();
    return res.status(200).json(aboutMe);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
