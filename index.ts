import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
// const isProd = process.env.NODE_ENV === "production";

const main = async () => {
	// connect to db
	const MONGO_URI = process.env.MONGO_URI || "";
	await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	// setup server
	const PORT = process.env.PORT || 3005;
	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
};

main().catch((err) => {
	if (err) {
		console.log("error from main function");
		console.log(err);
	}
});
