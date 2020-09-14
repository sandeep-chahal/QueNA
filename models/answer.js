const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
	forQuestion: {
		type: mongoose.Types.ObjectId,
		ref: "Question",
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	answeredBy: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	likes: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("Answer", answerSchema);
