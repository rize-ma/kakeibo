const mongoose = require("mongoose");

const kakeiboSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    Date: {
        type: Date,
        default: Date.now
    },
    money: {
        type: Number,
        required: true
    },
    expenses: {
        type: Boolean,
        required: true
    },
    income: {
        type: Boolean,
        required: true
    }
})