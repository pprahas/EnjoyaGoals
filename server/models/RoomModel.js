const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: false,
	},
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	users: {
		type: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
		required: true,
	},
	todoTasks: {
		type: [{ type: mongoose.Schema.ObjectId, ref: 'Task' }],
		required: false,
	},
	completedTasks: {
		type: [{ type: mongoose.Schema.ObjectId, ref: 'Task' }],
		required: false,
	}

}, {timestamps: true});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;