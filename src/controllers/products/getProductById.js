const { Product } = require("../../db.js");

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ errors: [{msg: `No se encontró el producto con id: ${id}`}] });
        }

    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = getProductById;
