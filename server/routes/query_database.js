const User = require("../models/UserModel");
const Task = require("../models/TaskModel");
const Room = require("../models/RoomModel");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
router.use(express.json());

// query all User data in the database (except for passwords)
router.get("/", async (req, res) => {
    try {
        const findRes = await User.find().select("-password");
        
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Query failed." });
    }
});

// query all User usernames in the database
router.get("/usernames", async (req, res) => {
    try {
        const findRes = await User.find().select("username");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Query failed." });
    }
});

// query all User emails in the database
router.get("/emails", async (req, res) => {
    try {
        const findRes = await User.find().select("email");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Query failed." });
    }
});

// query all User firstNames in the database
router.get("/firstNames", async (req, res) => {
    try {
        const findRes = await User.find().select("firstName");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Query failed." });
    }
});

// query all User lastNames in the database
router.get("/lastNames", async (req, res) => {
    try {
        const findRes = await User.find().select("lastName");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Query failed." });
    }
});

// query all the data from the database for a User specified by username
router.get("/user", async (req, res) => {
    // this request should contain:
    // "id":        the `_id` of the User,

    console.log("req = " + req.body);

    try {
        const findRes = await User.findById(req.body.id).select("-password");
        console.log("user id = " + req.body.id);
        console.log("findRes = " + findRes);
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "User query failed." });
    }
});

// query all the data from the database for a Task specified by username
router.get("/task", async (req, res) => {
    // this request should contain:
    // "id":        the `_id` of the task,
    const taskToFind = req.body;

    try {
        const findRes = await Task.findById(taskToFind.id);
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Task query failed." });
    }
});

// query all the data from the database for a Room specified by username
router.get("/room", async (req, res) => {
    // this request should contain:
    // "id":        the `_id` of the room,
    const roomToFind = req.body;

    try {
        const findRes = await Room.findById(roomToFind.id).select("-password");
        res.send(findRes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Room query failed." });
    }
});

module.exports = router;