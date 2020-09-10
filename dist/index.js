"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
const main = async () => {
    const MONGO_URI = process.env.MONGO_URI || "";
    await mongoose_1.default.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const PORT = process.env.PORT || 3005;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};
main().catch((err) => {
    if (err) {
        console.log("error from main function");
        console.log(err);
    }
});
//# sourceMappingURL=index.js.map