import jwt from "jsonwebtoken";
import express, { Handler } from "express";

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const token = req.cookies.jwt;
	const email = jwt.verify(token, process.env.JWT_SECRET || "");
	req.user = email;
	next();
};
