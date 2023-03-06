const kakeibo = require("../models/kakeibo");
const Kakeibo = require("../models/kakeibo");

exports.create = async (req, res) => {
    const { category, description, date, money, expenses, income } = req.body;
    try {
        const kakeibo = await Kakeibo.create({
            user: req.user._id,
            category,
            description,
            date,
            money,
            expenses,
            income
        });
        res.status(201).json({ data: { kakeibo } });
    } catch (err) {
        res.status(500).json({ data: err });
    }
}

exports.dateSearch = async (req, res) => {
    const { kakeiboDate } = req.params;
    try {
        const kakeibo = await kakeibo.find({ user: req.user._id, date: kakeiboDate });
        res.status(200).json(kakeibo);
    } catch (err) {
        res.status(500).json(err);
    }
};


