// const Room = require("../models/RoomModel");
// const express = require("express");
// require("dotenv").config();

// const router = express.Router();

// router.use(express.json());

// router.post("/", async (req, res) => {
//   this is just taking in a room_id

//   try {
//     const todoT = await Room.findOne({ _id: req.body.id }).select(todoTasks);
//     const doneT = await Room.findOne({ _id: req.body.id }).select(
//       completedTasks
//     );

//     const percent = (todoT / doneT) * 100;
//     res.status(200).send({ percent: percent });
//   } catch (error) {
//     res.status(400).send({ error: "Error occurred." });
//   }
// });
