"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_1 = __importDefault(require("./models/user"));
exports.default = (passport) => {
    passport.use(new passport_google_oauth20_1.default.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: "/auth/google/callback",
    }, async (accessToken, refreshToken, profile, cb) => {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const photo = profile.photos[0].value || "";
        const provider = profile.provider;
        const newUser = new user_1.default({ email, name, provider, photo });
        const user = await user_1.default.findOne({ email });
        if (user) {
            console.log("user already exist");
            cb(null, user);
        }
        else {
            console.log("new user created");
            await newUser.save();
            cb(null, newUser);
        }
    }));
};
//# sourceMappingURL=passportConfig.js.map