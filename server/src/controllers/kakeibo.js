const kakeibo = require("../models/kakeibo");



exports.create = async (req, res) => {
    const { category, description, date, money, expenses, income } = req.body;
    try {
        const kakeiboData = await kakeibo.create({
            user: req.user._id,
            category,
            description,
            date,
            money,
            expenses,
            income
        });
        res.status(201).json({ data: { kakeiboData } });
    } catch (err) {
        res.status(500).json({ data: err });
    }
}

exports.dateSearch = async (req, res) => {
    const { kakeiboDate } = req.params;
    try {
        const kakeiboData = await kakeibo.find({ user: req.user._id, date: kakeiboDate });
        res.status(201).json({ data: { kakeiboData } });
    } catch (err) {
        res.status(500).json(err);
    }
};


