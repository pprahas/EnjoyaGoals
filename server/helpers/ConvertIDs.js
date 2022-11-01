const User = require("../models/UserModel");
const Room = require("../models/RoomModel");
const Task = require("../models/TaskModel");

// takes a roomID and returns the Room as an object
async function convertRoomID(roomID) {
	const findRes = await Room.findById(roomID).select("-password");
	return findRes;
}

async function convertTaskID(taskID) {
	const findRes = await Task.findById(taskID);
	return findRes;
}

async function convertUserID(userID) {
	const findRes = await User.findById(userID).select("-password");
	return findRes;
}

module.exports = { convertRoomID, convertTaskID, convertUserID };