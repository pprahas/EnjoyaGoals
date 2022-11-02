const User = require("../models/UserModel");
const Task = require("../models/TaskModel");
const Room = require("../models/RoomModel");
const express = require("express");
const mongoose = require("mongoose");
const convertID = require("../helpers/ConvertIDs");

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
router.post("/user", async (req, res) => {
    // this request should contain:
    // "id":        the `_id` of the User
    try {
        const findRes = await User.findById(req.body.id).select("-password");

        if (findRes == null) {
            console.log("Error at /query_database/user, findRes is null");
            console.log("req.body = ", req.body);
            console.log("req.body.id = ", req.body.id);
            return res.status(500).json({ msg: "User query failed." });
        }

        if (findRes.rooms != null) {
            // converting each Room _id in the User's rooms[] to a room object
            const newRoomPromises = findRes.rooms.map(convertID.convertRoomID);
            const newRooms = await Promise.all(newRoomPromises);
            // replace the rooms[] array with the array of Room Objects
            findRes.rooms = newRooms;
            // *NOTE, DO NOT DO findRes.save() !!!!! WE DO NOT WANT TO
            // REWRITE THE OBJECT IN THE DATABASE, WE WANT rooms[]
            // TO STORE IDs IN THE DATABASE
        } else {
            console.log("error converting user's rooms");
            console.log("findRes = ", findRes);
            res.status(500).json({ msg: "User query failed." });
        }
        
        
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