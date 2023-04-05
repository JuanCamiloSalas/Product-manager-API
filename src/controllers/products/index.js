const createProduct = require("./createProduct.js");
const getProducts = require("./getProducts.js");
const getProductById = require("./getProductById.js");
const updateProduct = require("./updateProduct.js");
const hideProduct = require("./hideProduct.js");
const deleteProduct = require("./deleteProduct.js");

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    hideProduct,
}