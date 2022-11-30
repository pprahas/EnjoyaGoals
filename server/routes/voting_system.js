const express = require("express");
const router = express.Router();
const Room = require("../models/RoomModel");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.use(express.json());

router.post("/show/team_member", async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId);
    let voteMap = room.voteKickMember;
    // voteMap = voteMap.delete("yes");

    voteMap.delete("yes");
    // console.log(voteMap.delete("yes"));

    return res.status(200).send(voteMap);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/kick/team_member", async (req, res) => {
  try {
    const { roomId, userId, action } = req.body;

    const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    const voteMap = room.voteKickMember;
    const usersNum = room.users.length;

    //let value = voteMap.get(userId).substring(12);
    console.log(voteMap.get(userId));
    //console.log(value);
    let votes = voteMap.get(userId).split("!@#$")[1];
    if (votes !== "NaN") {
      currentVotes = parseInt(votes);
    } else {
      // just in case
      currentVotes = 0;
    }
    //   currentVotes = parseInt(voteMap.get(userId).substring(12));
    //   this only works if your username is exactly 8 characters long
    console.log(currentVotes);
    //action == true -> plus is clicked
    if (action) {
      currentVotes += 1;
    } else {
      currentVotes -= 1;
    }

    console.log(currentVotes);
    voteMap.set(userId, user.username + "!@#$" + currentVotes.toString());

    //if the member is being kicked
    // if (currentVotes == usersNum - 1) {
    //   room.users.pull(userId);
    //   // user.rooms.pull(roomId);
    //   return res.status(200).send({ msg: "The user got kicked." });
    // }

    await room.save();
    // await user.save();

    return res
      .status(200)
      .json({ msg: "The user is not being kicked, but the value changed." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/show/completed_tasks", async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId);
    let voteMap = room.voteRemoveTaskFromCompleted;
    // voteMap = voteMap.delete("yes");

    voteMap.delete("yes");
    // console.log(voteMap.delete("yes"));

    return res.status(200).send(voteMap);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/kick/completed_tasks", async (req, res) => {
  try {
    const { roomId, userId, action } = req.body;

    const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    const voteMap = room.voteKickMember;
    const usersNum = room.users.length;

    //let value = voteMap.get(userId).substring(12);
    console.log(voteMap.get(userId));
    //console.log(value);
    let votes = voteMap.get(userId).split("!@#$")[1];
    if (votes !== "NaN") {
      currentVotes = parseInt(votes);
    } else {
      // just in case
      currentVotes = 0;
    }
    //   currentVotes = parseInt(voteMap.get(userId).substring(12));
    //   this only works if your username is exactly 8 characters long
    console.log(currentVotes);
    //action == true -> plus is clicked
    if (action) {
      currentVotes += 1;
    } else {
      currentVotes -= 1;
    }

    console.log(currentVotes);
    voteMap.set(userId, user.username + "!@#$" + currentVotes.toString());

    //if the member is being kicked
    // if (currentVotes == usersNum - 1) {
    //   room.users.pull(userId);
    //   // user.rooms.pull(roomId);
    //   return res.status(200).send({ msg: "The user got kicked." });
    // }

    await room.save();
    // await user.save();

    return res
      .status(200)
      .json({ msg: "The user is not being kicked, but the value changed." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
