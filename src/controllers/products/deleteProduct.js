const { Product } = require("../../db.js");

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.destroy({ 
            where: { id }
        });

        if (deletedProduct) {
            return res.status(200).json({ msg: "Producto eliminado exitosamente"});
        } else {
            return res.status(404).json({ errors: [{msg: `No se encontró el producto con id: ${id}`}] });
        }

    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = deleteProduct;