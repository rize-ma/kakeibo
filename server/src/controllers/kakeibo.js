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
        res.status(500).json({ data: err });
    }
};

exports.getOne = async (req, res) => {
    const { kakeiboId } = req.params;
    try {
        const kakeibo = await kakeibo.findOne({ user: req.user._id, _id: kakeiboId });
        if (!kakeibo) return res.status(404).json("家計簿が存在しません");
        res.status(200).json({ data: kakeibo });
    } catch (err) {
        res.status(500).json({ data: err });
    }
};


