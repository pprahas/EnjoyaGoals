const express = require("express");
const router = express.Router();
const Room = require("../models/RoomModel");
const mongoose = require("mongoose");

router.use(express.json());

// route for creating a new room
router.post("/create", async (req, res) => {
	// this request should contain:
	// "name":		the name of the new room
	// "password":	the password of the new room (if applicable)
	// "owner":		the username of the owner of the new room (whoever requested to create the new room)
	// "type":		either "democracy" or "monoarchy" (? this may change depending on what we decide to name the types)
	// "users":		an array of `_id`s of the users part of the room, i think it'll just be ["owner_id"] at creation
	const room = req.body;

	try {
		const dbRoom = new Room({
			_id:        new mongoose.Types.ObjectId(),
			name:       room.name,
			password:   room.password,
			owner:      room.owner,
			type:       room.type,
			users:      room.users
		}, { timestamps: true });

		await dbRoom.save();

		return res.status(200).json({ msg: "Room created successfully." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Room creation failed." });
	}
});

// route for deleting an existing room
router.post("/delete", async (req, res) => {
	// this request should contain the `_id` of the room to be deleted
	const roomToDelete = req.body;

	try {
		const findRes = await Room.findByIdAndDelete(roomToDelete.id);
		
		return res.status(200).json({ msg: "Room deleted successfully." });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Deleting room failed." });
	}
});

// route for updating a field of an existing room
router.post("/update", async (req, res) => {
	// this request should contain:
	// "id":        the `_id` of the room,
	// "fieldName": the name of the field to be changed,
	// "value":     and the new value
	const roomToUpdate = req.body;

	var findRes;
	
	try {
		// I'm sorry this looks awful - Nick
		switch (roomToUpdate.fieldName) {
			case "name":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"name": roomToUpdate.value});			break;
			case "password":	findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"password": roomToUpdate.value});		break;
			case "owner":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"owner": roomToUpdate.value});			break;
			case "type":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"type": roomToUpdate.value});			break;
			case "users":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"users": roomToUpdate.value});			break;
			case "tasks":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"tasks": roomToUpdate.value});			break;
		}
		
		return res.status(200).json({ msg: "Room updated successfully." });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Updating room failed." });
	}
});

module.exports = router;