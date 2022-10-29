const Room = require("../models/RoomModel");
const express = require("express");

const router = express.Router();

router.use(express.json());

router.post("/progressBar", async (req, res) => {
    
    try {

    const todoT = await Room.findOne({ _id: req.body.id }).select(todoTasks);
    const doneT = await Room.findOne({ _id: req.body.id }).select(completedTasks);

    const percent = (todoT / doneT) * 100;


    res.json({ percent: percent });

    } catch (error) {
        console.log("yeee")
        res.status(400).json({ error: "Error occured" });
    }

    
    }
);
    



