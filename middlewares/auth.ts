import express from "express";

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	console.log("authenticator", req.user);

	if (req.isAuthenticated()) next();
	else res.status(401).json({ error: true, status: "unauthorized" });
};
