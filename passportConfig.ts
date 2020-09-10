import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
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
				const email = profile.emails[0].value.toLowerCase();
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
	passport.use(
		new GithubStrategy.Strategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID || "",
				clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
				callbackURL: "/auth/github/callback",
			},
			async (accessToken, refreshToken, profile, cb) => {
				console.log(profile);
				const email = profile.emails[0].value.toLowerCase();
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
	passport.use(
		new FacebookStrategy.Strategy(
			{
				clientID: process.env.FACEBOOK_CLIENT_ID || "",
				clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
				callbackURL: "/auth/facebook/callback",
			},
			async (accessToken, refreshToken, profile, cb) => {
				console.log(profile);
				const email = profile.emails[0].value.toLowerCase();
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
