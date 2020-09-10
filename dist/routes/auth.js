"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const generateJWT = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET || "", {
        expiresIn: "1h",
    });
};
const route = express_1.Router();
route.get("/auth/google", passport_1.default.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
}));
route.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login",
    session: false,
}), (req, res) => {
    console.log(req.user);
    res.cookie("jwt", generateJWT(req.user.email));
    res.json({ error: false });
});
route.get("/auth/status", auth_1.default, (req, res) => {
    res.json({
        data: req.user,
    });
});
exports.default = route;
//# sourceMappingURL=auth.js.map