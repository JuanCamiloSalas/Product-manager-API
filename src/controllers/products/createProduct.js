const { Product, Category } = require("../../db.js");
const { Op } = require('sequelize');

const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;

        const category = Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ errors: [{msg: `La categoría con categoryId ${categoryId} NO existe en la base de datos`}] });
        }

        const [ newProduct, created ] = await Product.findOrCreate({
            where: {
                name: {
                    [Op.iLike]: `${name}`
                }
            },
            defaults: {
                name, 
                description, 
                price, 
                categoryId,
            }
        });

        if (!created) {
            return res.status(400).json({errors: [{ msg: `Ya existe un producto con el name ${name}\nPuede editarlo a la ruta de edición de productos con el siguiente id: ${newProduct.dataValues.id}`}]});
        }

        return res.status(200).json(newProduct);

    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = createProduct;
