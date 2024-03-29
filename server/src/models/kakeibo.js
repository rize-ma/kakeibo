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
    date: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    expenses: {
        type: Boolean,
        default: true
    },
    income: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Kakeibo", kakeiboSchema);