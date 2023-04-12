const { Product, Category } = require("../../db.js");

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId } = req.body;

        const category = Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ errors: [{msg: `La categoría con categoryId ${categoryId} NO existe en la base de datos`}] });
        }

        const updatedProduct = await Product.update({ 
            name, 
            description, 
            price, 
            categoryId,
        }, {
            where: { id }
        });

        if (updatedProduct) {
            return res.status(200).json({ msg: "Producto actualizado exitosamente"});
        } else {
            return res.status(404).json({ errors: [{msg: `No se encontró el producto con id: ${id}`}] });
        }
        
    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = updateProduct;
