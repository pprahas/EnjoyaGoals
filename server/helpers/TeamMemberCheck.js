const Room = require("../models/RoomModel");

async function userInRoomCheck(roomID, userID) {
	try {
		const findRes = await Room.findById(roomID);
		const temp = Object.values(findRes.users);
		for (var i = 0; i < temp.length; i++) {
			if (temp[i] == userID) {
				console.log("user found woo");
				return true;
			}
		}

		return false;
	} catch (error) {
		console.log("uh oh, error");
		console.log(error);
	}
}

module.exports = { userInRoomCheck };