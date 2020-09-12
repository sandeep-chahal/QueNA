module.exports = (req, res, next) => {
	console.log("authenticator", req.user);
	if (req.isAuthenticated()) next();
	else res.status(401).json({ error: true, status: "unauthorized" });
};
