const { Product } = require("../../db.js");

const hideProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await Product.findByPk(id);
        
        if (!updatedProduct) {
            return res.status(404).json({ errors: [{msg: `No se encontró el producto con id: ${id}`}] });
        }
        
        updatedProduct.active = !updatedProduct.active;
        await updatedProduct.save();

        if (!updatedProduct.dataValues.active) {
            return res.status(200).json({ msg: "El producto se ha ocultado"});
        } else {
            return res.status(200).json({ msg: "El producto es ahora público"});
        }
        
    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = hideProduct;