const { Category, Product } = require("../../db.js");

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProducts = await Product.destroy({
            where: { categoryId: id }
        });

        const deletedCategory = await Category.destroy({ 
            where: { id }
        });

        if (deletedCategory) {
            return res.status(200).json({ msg: `Categoría eliminada exitosamente, así como sus productos(${deletedProducts})`});
        } else {
            return res.status(404).json({ errors: [{msg: `No se encontró la categoría con id: ${id}`}] });
        }

    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = deleteCategory;
