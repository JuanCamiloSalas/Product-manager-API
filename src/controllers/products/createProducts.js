const { Product } = require("../../db.js");

const createProducts = async(req, res) => {
    try {
        const { productsList } = req;
        const productsCount = productsList.length;

        Promise.allSettled(productsList)
            .then(product => product.map(el => el.value))
            .then(values => values.forEach(el => Product.create(el)))
            .then(response => res.status(200).json({ msg: `Se han creado ${productsCount} registros`}))
            .catch(error => { 
                throw new Error(error)
            })
        
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = createProducts;