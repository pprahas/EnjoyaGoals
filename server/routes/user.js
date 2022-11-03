const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const convertID = require("../helpers/ConvertIDs");

router.use(express.json());

// route for updating a field of an existing user
router.post("/update", async (req, res) => {
	// this request should contain:
	// "id":        the `_id` of the user,
	// "fieldName": the name of the field to be changed,
	// "value":     and the new value
	const userToUpdate = await User.findById(req.body.id);
	if (userToUpdate == null) {
		console.log("Error at /user/update, userToUpdate is null");
		console.log("req.body = ", req.body);
		return res.status(500).json({ msg: "Updating user failed." });
	}

	try {
		switch (req.body.fieldName) {
			case "rooms":
				// to add or remove a room, request should also contain ONE of the following:
				// "add":		true
				// "remove":	true
				if (req.body.add) { userToUpdate.rooms.push(req.body.value); }
				else if (req.body.remove) {
					console.log("userToUpdate = ", userToUpdate);
					if (userToUpdate.rooms != null) {
						userToUpdate.rooms.pull(req.body.value);
					} else {
						console.log("error updating User's rooms");
						console.log("userToUpdate = ", userToUpdate);
						return res.status(501).json({ msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon." });
					}
				}
				else {
					console.log("SOMETHING IS WRONG WITH THE /user/update ROUTE FOR UPDATING rooms");
					return res.status(501).json({ msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon." });
				}
				break;
		}

		await userToUpdate.save();
		return res.status(200).json({ msg: "User updated successfully." });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Updating user failed." });
	}
});

// route for updating a field of an existing user *THAT DIRECTLY RETURNS USER OBJECT RATHER THAN A MESSAGE
router.post("/updateOM", async (req, res) => {
	// this request should contain:
	// "id":        the `_id` of the user,
	// "fieldName": the name of the field to be changed,
	// "value":     and the new value
	const userToUpdate = await User.findById(req.body.id);
	if (userToUpdate == null) {
		console.log("Error at /user/update, userToUpdate is null");
		console.log("req.body = ", req.body);
		return res.status(500).json({ msg: "Updating user failed." });
	}

	try {
		switch (req.body.fieldName) {
			case "rooms":
				// to add or remove a room, request should also contain ONE of the following:
				// "add":		true
				// "remove":	true
				if (req.body.add) { userToUpdate.rooms.push(req.body.value); }
				else if (req.body.remove) {
					console.log("userToUpdate = ", userToUpdate);
					if (userToUpdate.rooms != null) {
						userToUpdate.rooms.pull(req.body.value);
					} else {
						console.log("error updating User's rooms");
						console.log("userToUpdate = ", userToUpdate);
						return res.status(501).json({ msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon." });
					}
				}
				else {
					console.log("SOMETHING IS WRONG WITH THE /user/update ROUTE FOR UPDATING rooms");
					return res.status(501).json({ msg: "Sorry, we messed up and can't do this operation right now. We'll fix it soon." });
				}
				break;
		}

		await userToUpdate.save();

		if (userToUpdate.rooms != null) {
            // converting each Room _id in the User's rooms[] to a room object
            const newRoomPromises = userToUpdate.rooms.map(convertID.convertRoomID);
            const newRooms = await Promise.all(newRoomPromises);
            // replace the rooms[] array with the array of Room Objects
            userToUpdate.rooms = newRooms;
            // *NOTE, DO NOT DO findRes.save() !!!!! WE DO NOT WANT TO
            // REWRITE THE OBJECT IN THE DATABASE, WE WANT rooms[]
            // TO STORE IDs IN THE DATABASE

			return res.status(200).json(userToUpdate);
        } else {
            console.log("error converting user's rooms");
            console.log("userToUpdate = ", userToUpdate);
            res.status(500).json({ msg: "User query failed." });
        }
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Updating user failed." });
	}
});
router.post("/getInfo", async (req, res) => {
	const userToGet = await User.findById(req.body.id);
	try{        
        res.send(userToGet);
	} catch (error){
		console.log(error);
		res.status(500).json({ msg: "Getting user failed." });
	}
});

module.exports = router;