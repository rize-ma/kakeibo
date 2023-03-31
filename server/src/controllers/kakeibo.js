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
        const kakeiboData = await kakeibo.findOne({ user: req.user._id, _id: kakeiboId });
        if (!kakeiboData) return res.status(404).json("家計簿が存在しません");
        res.status(200).json({ data: kakeiboData });
    } catch (err) {
        res.status(500).json({ data: err });
    }
};

exports.update = async (req, res) => {
    const { kakeiboId } = req.params;

    try {
        const kakeiboData = await kakeibo.findOne({ user: req.user._id, _id: kakeiboId });
        if (!kakeiboData) return res.status(404).json("家計簿が存在しません");
        const updateKakeibo = await kakeibo.findByIdAndUpdate(kakeiboId, {
            $set: req.body
        });
        res.status(200).json(updateKakeibo);
    } catch (err) {
        res.status(500).json({ data: err });
    }
}

exports.getMonth = async (req, res) => {
    const { yearMonth } = req.params;
    reg = new RegExp(`^(${yearMonth})`);

    try {
        const kakeiboData = await kakeibo.find({ user: req.user.id, date: reg });
        res.status(200).json({ data: kakeiboData });
    } catch (err) {
        res.status(500).json({ data: err });
    }
};

exports.delete = async (req, res) => {
    const { kakeiboId } = req.params;
    try {
        const kakeiboData = await kakeibo.findOne({ user: req.user.id, _id: kakeiboId });
        if (!kakeiboData) return res.status(404).json({ data: "家計簿が存在しません" });
        await kakeibo.deleteOne({ user: req.user.id, _id: kakeiboId });
        res.status(200).json({ data: "家計簿を削除しました" });
    } catch (err) {
        res.status(500).json({ data: err });
    }
}

