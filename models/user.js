const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	provider: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
	},
});

module.exports = mongoose.model("User", userSchema);
