import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
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

export default mongoose.model("User", userSchema);
