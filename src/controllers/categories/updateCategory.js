const { Category } = require("../../db.js");

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.query;

        const updatedCategory = await Category.update({ 
            name,
        }, {
            where: { id }
        });

        if (updatedCategory) {
            return res.status(200).json({ msg: "Categoría actualizada exitosamente"});
        } else {
            return res.status(404).json({ errors: [{msg: `No se encontró la categoría con id: ${id}`}] });
        }
        
    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message}] });
    }
}

module.exports = updateCategory;
