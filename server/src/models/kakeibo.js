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
    expenses: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Kakeibo", kakeiboSchema);