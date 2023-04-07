const { Category } = require("../../db.js");
const { Op } = require('sequelize');

const getCategories = async (req, res) => {
    try {
        const { name, alpha } = req.query;

        let where = {};
        let order = [];

        if (name) where.name = {[Op.iLike]: `%${name}%`}; 
        if (alpha) order.push(['name', `${alpha}`]); 

        const results = await Category.findAll({
            where,
            order,
        });

        const count = await Category.count({where});

        res.status(200).json({count, results});
        
    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = getCategories;
