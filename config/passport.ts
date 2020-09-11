import passport from "passport";
import strategies from "../config/strategies";
import User from "../models/user";

type PROFILE = {
	emails: [{ value: String }];
	photos: [{ value: String }];
	displayName: String;
	provider: String;
};

export default (passport: passport.PassportStatic) => {
	strategies.forEach((provider) => {
		passport.use(
			new provider.strategy(
				{
					clientID: provider.CLIENT_ID,
					clientSecret: provider.CLIENT_SECRET,
					callbackURL: `/auth/${provider.name}/callback`,
				},
				async (
					accessToken: String,
					refreshToken: String,
					profile: PROFILE,
					cb
				) => {
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
