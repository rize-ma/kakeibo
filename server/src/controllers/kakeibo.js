const Kakeibo = require("../models/kakeibo");

exports.create = async (req, res) => {
    const { user, category, description, expenses, income } = req;
    try {
        const kakeibo = await Kakeibo.create({
            user: user._id,
            category,
            description,
            expenses,
            income
        });
        res.status(201).json({ data: { kakeibo } });
    } catch (err) {
        res.status(500).json(err);
    }
}


