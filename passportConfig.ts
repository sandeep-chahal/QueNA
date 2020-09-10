import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "./models/user";

export default (passport: passport.PassportStatic) => {
	passport.use(
		new GoogleStrategy.Strategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID || "",
				clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
				callbackURL: "/auth/google/callback",
			},
			async (accessToken, refreshToken, profile, cb) => {
				const email = profile.emails[0].value;
				const name = profile.displayName;
				const photo = profile.photos[0].value || "";
				const provider = profile.provider;
				const newUser = new User({ email, name, provider, photo });
				const user = await User.findOne({ email });
				if (user) {
					console.log("user already exist");
					cb(null, user);
				} else {
					console.log("new user created");
					await newUser.save();
					cb(null, newUser);
				}
			}
		)
	);
};
