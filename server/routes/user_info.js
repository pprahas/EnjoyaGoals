const express = require("express");
const router = express.Router();
const Room = require("../models/RoomModel");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel");
const bcrypt = require("bcrypt");
const cookieHandler = require("../helpers/CookieHandler");

const mongoose = require("mongoose");

//setting about me
router.post("/create/about_me", cookieHandler.checkCookie2, async (req, res) => {
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
router.post("/get/about_me", cookieHandler.checkCookie2, async (req, res) => {
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
router.post("/change_password", cookieHandler.checkCookie2, async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    return res.status(200).json({ msg: "Password changed." });
  } catch (error) {
    return res.status(403).json({ msg: "Password was not changed." });
  }
});


router.post("/first_name", cookieHandler.checkCookie2, async (req, res) => {
  try {
    const data = req.body;

    const userId = data.userId;
    const firstName = data.firstName;
    // console.log(aboutMe, userId, roomId);
    // const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    // console.log(user);
    user.firstName = firstName;
    // aboutMe = user.aboutMe.get(roomId);
    // user.aboutMe.set(roomId, aboutMe);
    await user.save();
    return res.status(200).json({ msg: "First name changed." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/last_name", cookieHandler.checkCookie2, async (req, res) => {
  try {
    const data = req.body;

    const userId = data.userId;
    const lastName = data.lastName;
    // console.log(aboutMe, userId, roomId);
    // const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    // console.log(user);
    user.lastName = lastName;
    // aboutMe = user.aboutMe.get(roomId);
    // user.aboutMe.set(roomId, aboutMe);
    await user.save();
    return res.status(200).json({ msg: "Last name changed." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/username", cookieHandler.checkCookie2, async (req, res) => {
  try {
    const data = req.body;

    const userId = data.userId;
    const username = data.username;
    // console.log(aboutMe, userId, roomId);
    // const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    const user2 = await User.find(username);
    if (user2) {
      return res.status(500).json({ msg: "Username exists." });
    }
    // console.log(user);
    user.username = username;
    // aboutMe = user.aboutMe.get(roomId);
    // user.aboutMe.set(roomId, aboutMe);
    await user.save();
    return res.status(200).json({ msg: "Last name changed." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
