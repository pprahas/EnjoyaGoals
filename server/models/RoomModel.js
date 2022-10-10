const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId,
		required: true
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
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	users: {
		type: String,
		required: true,
	}
}, {timestamps: true})

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;