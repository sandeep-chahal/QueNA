const { Router } = require("express");
const passport = require("passport");
const authenticate = require("../middlewares/auth");
const strategies = require("../config/strategies");

const route = Router();

strategies.forEach((provider) => {
	route.get(
		`/auth/${provider.name}`,
		passport.authenticate(provider.name, {
			scope: ["profile", "email"],
		})
	);

	route.get(
		`/auth/${provider.name}/callback`,
		passport.authenticate(provider.name, {
			failureRedirect: "/login",
		}),
		(req, res) => {
			res.json({ error: false });
		}
	);
});

route.get("/auth/status", authenticate, (req, res) => {
	res.json({
		data: req.user,
		status: "authorized",
	});
});
route.get("/auth/logout", (req, res) => {
	req.logOut();
	res.json({ error: false });
});

module.exports = route;
