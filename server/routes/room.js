const express = require("express");
const router = express.Router();
const Room = require("../models/RoomModel");
const mongoose = require("mongoose");

router.use(express.json());

// route for creating a new room
router.post("/create", async (req, res) => {
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
			case "name":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"name": roomToUpdate.value} );			break;
			case "password":	findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"description": roomToUpdate.value} );	break;
			case "owner":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"difficulty": roomToUpdate.value} );	break;
			case "type":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"deadline": roomToUpdate.value} );		break;
			case "users":		findRes = await Room.findByIdAndUpdate(roomToUpdate.id, {"points": roomToUpdate.value} );		break;
		}
		
		return res.status(200).json({ msg: "Room updated successfully." });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Updating room failed." });
	}
});

module.exports = router;