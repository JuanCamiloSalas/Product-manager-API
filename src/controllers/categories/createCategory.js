const { Category } = require("../../db.js");

const createCategory = async (req, res) => {
    try {
        const { name } = req.query;
        const newCategory = await Category.create({ name });
        res.status(200).json(newCategory);

    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = createCategory;