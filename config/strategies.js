const GoogleStrategy = require("passport-google-oauth20");
const GithubStrategy = require("passport-github");
const FacebookStrategy = require("passport-facebook");

module.exports = [
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
