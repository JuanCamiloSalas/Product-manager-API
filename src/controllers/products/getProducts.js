const { Product } = require("../../db.js");
const { Op } = require('sequelize');

const getProducts = async (req, res) => {
    try {
        const { name, alpha, page, categoryId, createdAt } = req.query;

        let where = { active: true };
        let order = [];
        let limit = 10;
        let offset = ((page ? page : 1) - 1) * limit;
        let url = `${process.env.URL}/products?`;
        const currentPage = Number(page) || (offset / limit) + 1;

        if (name) {
            where.name = {[Op.iLike]: `%${name}%`}; 
            url = `${url}name=${name}&`;
        }
        if (categoryId) {
            where.categoryId = categoryId;
            url = `${url}categoryId=${categoryId}&`;
        }
        if (alpha) {
            order.push(['name', `${alpha}`]); 
            url = `${url}alpha=${alpha}&`;
        }
        if (createdAt) {
            order.push(['createdAt', `${createdAt}`]); 
            url = `${url}createdAt=${createdAt}&`;
        }

        const results = await Product.findAll({
            offset,
            limit,
            where,
            order,
        });

        const count = await Product.count({where});
        const pages = Math.ceil( count / limit );
        const next = currentPage >= pages ? null : `${url}page=${currentPage+1}`;
        const previus = currentPage <= 1 ? null : `${url}page=${currentPage-1}`;

        res.status(200).json({count, pages, previus, next, results});
        
    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = getProducts;
