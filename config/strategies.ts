import GoogleStrategy from "passport-google-oauth20";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";

export default [
	{
		name: "google",
		strategy: GoogleStrategy.Strategy,
		CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	},
	{
		name: "github",
		strategy: GithubStrategy.Strategy,
		CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	},
	{
		name: "facebook",
		strategy: FacebookStrategy.Strategy,
		CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
		CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
	},
];
