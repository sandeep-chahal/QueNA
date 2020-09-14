const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		index: true,
	},
	askedBy: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	views: {
		type: Number,
		default: 0,
	},
	answers: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("Question", questionSchema);
