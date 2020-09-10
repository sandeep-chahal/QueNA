"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user.js.map