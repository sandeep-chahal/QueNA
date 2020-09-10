import { Router } from "express";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import authenticate from "../middlewares/auth";

const generateJWT = (email: string) => {
	return jsonwebtoken.sign({ email }, process.env.JWT_SECRET || "", {
		expiresIn: "1h",
	});
};

const route = Router();

route.get(
	"/auth/google",
	passport.authenticate("google", {
		session: false,
		scope: ["profile", "email"],
	})
);

route.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/login",
		session: false,
	}),
	(req, res) => {
		console.log(req.user);
		res.cookie("jwt", generateJWT(req.user.email));
		res.json({ error: false });
	}
);
route.get(
	"/auth/github",
	passport.authenticate("github", {
		session: false,
		scope: ["profile", "email"],
	})
);

route.get(
	"/auth/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/login",
		session: false,
	}),
	(req, res) => {
		console.log(req.user);
		res.cookie("jwt", generateJWT(req.user.email));
		res.json({ error: false });
	}
);
route.get(
	"/auth/facebook",
	passport.authenticate("facebook", {
		session: false,
		scope: ["profile", "email"],
	})
);

route.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		failureRedirect: "/login",
		session: false,
	}),
	(req, res) => {
		console.log(req.user);
		res.cookie("jwt", generateJWT(req.user.email));
		res.json({ error: false });
	}
);

route.get("/auth/status", authenticate, (req, res) => {
	res.json({
		data: req.user,
	});
});

export default route;
