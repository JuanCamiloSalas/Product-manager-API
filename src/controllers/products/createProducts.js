const { Product } = require("../../db.js");

const createProducts = async(req, res) => {
    try {
        const { productsList } = req;

        Promise.allSettled(productsList)
            .then(product => product.map(el => el.value))
            .then(values => values.forEach(el => Product.findOrCreate({
                where: {
                    name: el.name,
                },
                defaults: {
                    description: el.description,
                    price: el.price,
                    categoryId: el.categoryId,
                }
            })))
            .then(response => res.status(200).json({ msg: `Se han creado los registros`}))
            .catch(error => { 
                throw new Error(error)
            })
        
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = createProducts;