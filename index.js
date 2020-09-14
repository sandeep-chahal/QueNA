const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passportConfig = require("./config/passport");
const passport = require("passport");
const AuthRoute = require("./routes/auth");
const QuestionRoute = require("./routes/question");
const AnswerRoute = require("./routes/answer");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = express();
const isProd = process.env.NODE_ENV === "production";

const main = async () => {
	// connect to db
	const MONGO_URI = process.env.MONGO_URI || "";
	await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	passportConfig(passport);

	// sessions
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			store: new MongoStore({ mongooseConnection: mongoose.connection }),
		})
	);
	// other middlewares
	if (!isProd) app.use(morgan("dev"));
	app.use(express.json());
	app.use(helmet());
	app.use(cookieParser());

	// passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// routes
	app.use(AuthRoute);
	app.use(QuestionRoute);
	app.use(AnswerRoute);

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
