import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passportConfig from "./passportConfig";
import passport from "passport";
import AuthRoute from "./routes/auth";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
const isProd = process.env.NODE_ENV === "production";

const main = async () => {
	// connect to db
	const MONGO_URI = process.env.MONGO_URI || "";
	await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	// middlewares
	if (!isProd) app.use(morgan("dev"));
	app.use(express.json());
	app.use(helmet());
	app.use(cookieParser());

	// passport middleware
	app.use(passport.initialize());
	passportConfig(passport);

	// routes
	app.use(AuthRoute);

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
