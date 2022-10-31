const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const mongoose = require("mongoose");

router.use(express.json());

// route for updating a field of an existing user
router.post("/update", async (req, res) => {
	// this request should contain:
	// "id":        the `_id` of the user,
	// "fieldName": the name of the field to be changed,
	// "value":     and the new value
	const userToUpdate = await User.findById(req.body.id);
	
	try {
		switch (req.body.fieldName) {
			case "rooms":
				// to add or remove a room, request should also contain ONE of the following:
				// "add":		true
				// "remove":	true
				if (req.body.add) { userToUpdate.rooms.push(req.body.value); }
				else if (req.body.remove) { userToUpdate.rooms.pull(req.body.value); }
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

module.exports = router;