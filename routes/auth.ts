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

route.get("/auth/status", authenticate, (req, res) => {
	res.json({
		data: req.user,
	});
});

export default route;
