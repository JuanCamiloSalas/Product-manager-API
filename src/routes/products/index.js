const { Router } = require("express");
const router = Router();

// Middlewares
const {
    authentication,
    authorization,
    uploadFile,
    readFile,
    convertCSV,
} = require("../../middlewares//index.js");

// Controllers
const {
    getProducts,
    getProductById, 
    createProduct,
    createProducts,
    updateProduct,
    deleteProduct,
    hideProduct,
} = require("../../controllers/products");

// Routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authentication, authorization, createProduct);
router.put("/:id/hide", authentication, authorization, hideProduct);
router.put("/:id", authentication, authorization, updateProduct);
router.delete("/:id", authentication, authorization, deleteProduct);
router.post("/csv", authentication, authorization, uploadFile, readFile, convertCSV, createProducts);

module.exports = router;
