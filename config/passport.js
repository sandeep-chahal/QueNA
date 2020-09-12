const passport = require("passport");
const strategies = require("./strategies");
const User = require("../models/user");

module.exports = (passport) => {
	strategies.forEach((provider) => {
		passport.use(
			new provider.strategy(
				{
					clientID: provider.CLIENT_ID,
					clientSecret: provider.CLIENT_SECRET,
					callbackURL: `/auth/${provider.name}/callback`,
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
	});

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});
};
