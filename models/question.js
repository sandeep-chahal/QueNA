const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    askedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Question", questionSchema);
