const express = require("express");
const router = express.Router();
const Room = require("../models/RoomModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.use(express.json());

// route for creating a new room
router.post("/create", async (req, res) => {
	// this request MUST contain:
	// "name":		the name of the new room
	// "owner":		the username of the owner of the new room (whoever requested to create the new room)
	// "type":		either "democracy" or "monarchy" (? this may change depending on what we decide to name the types)
	// "users":		an array of `_id`s of the users part of the room, i think it'll just be ["owner_id"] at creation
	const room = req.body;

	try {
		// hashing the password of the room
		if (room.password) {
			room.password = await bcrypt.hash(req.body.password, 10);
		}

		const dbRoom = new Room({
			_id:		new mongoose.Types.ObjectId(),	// not part of request
			name:       	room.name,					// required; String
			password:   	room.password,				// optional; String
			owner:      	room.owner,					// required; String
			type:       	room.type,					// required; String
			users:      	room.users,					// required; Array of ObjectIds as Strings (ex: ["6341946d6dab0e743279e7ed", "6341946d6dab0e743279e7eg"])
			todoTasks:		room.todoTasks,				// optional; Array of ObjectIds as Strings (ex: ["6341946d6dab0e743279e32a", "6341946d6dab0e7432acd82e"])
			completedTasks:	room.compeletedTasks		// optional; Array of ObjectIds as Strings (ex: ["6341946d6dab0e743279e32a", "6341946d6dab0e7432acd82e"])
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
	try {
		await Room.findByIdAndDelete(req.body.id);
		
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
	const roomToUpdate = await Room.findById(req.body.id);
	
	try {
		// I'm sorry this looks awful - Nick
		switch (req.body.fieldName) {
			case "name":		roomToUpdate.update({name: req.body.value});		break;
			case "password":	roomToUpdate.update({password: req.body.value});	break;
			case "owner":		roomToUpdate.update({owner: req.body.value});		break;
			case "type":		roomToUpdate.update({type: req.body.value});		break;
			case "users":
				// to add or remove a user, request should also contain ONE of the following:
				// "add":		true
				// "remove":	true
				if (req.body.add) { roomToUpdate.users.push(req.body.value); }
				else if (req.body.remove) { roomToUpdate.users.pull(req.body.value); }
				else {
					console.log("SOMETHING IS WRONG WITH THE /room/update ROUTE FOR UPDATING users");
					return res.status(501).json({ msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon." });
				}
				break;
			case "assignedTasks":
				// to add or remove a task, request should also contain ONE of the following:
				// "add":		true
				// "remove":	true
				if (req.body.add) { roomToUpdate.assignedTasks.push(req.body.value); }
				else if (req.body.remove) { roomToUpdate.assignedTasks.pull(req.body.value); }
				else {
					console.log("SOMETHING IS WRONG WITH THE /room/update ROUTE FOR UPDATING assignedTasks");
					return res.status(501).json({ msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon." });
				}
				break;
			case "completedTasks":
				// to add or remove a task, request should also contain ONE of the following:
				// "add":		true
				// "remove":	true
				if (req.body.add) { roomToUpdate.completedTasks.push(req.body.value); }
				else if (req.body.remove) { roomToUpdate.completedTasks.pull(req.body.value); }
				else {
					console.log("SOMETHING IS WRONG WITH THE /room/update ROUTE FOR UPDATING completedTasks");
					return res.status(501).json({ msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon." });
				}
				break;
			case "teamTasks":
				// to add or remove a task, request should also contain ONE of the following:
				// "add":		true
				// "remove":	true
				if (req.body.add) { roomToUpdate.teamTasks.push(req.body.value); }
				else if (req.body.remove) { roomToUpdate.teamTasks.pull(req.body.value); }
				else {
					console.log("SOMETHING IS WRONG WITH THE /room/update ROUTE FOR UPDATING teamTasks");
					return res.status(501).json({ msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon." });
				}
				break;
		}

		await roomToUpdate.save();
		return res.status(200).json({ msg: "Room updated successfully." });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Updating room failed." });
	}
});

module.exports = router;