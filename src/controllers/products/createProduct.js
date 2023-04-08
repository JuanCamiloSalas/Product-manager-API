const { Product } = require("../../db.js");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;

        const newProduct = await Product.findOrCreate({
            where: {
                name
            },
            defaults: {
                name, 
                description, 
                price, 
                categoryId,
            }
        });

        res.status(200).json(newProduct);

    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = createProduct;
