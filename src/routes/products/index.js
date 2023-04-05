const { Router } = require("express");
const router = Router();

// Middlewares
const authorization = require("../../middlewares/auth.js");

// Controllers
const { 
    getProducts,
    getProductById, 
    createProduct,
    updateProduct,
    deleteProduct,
    hideProduct,
} = require("../../controllers/products");

// Routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authorization, createProduct);
router.put("/:id/hide", authorization, hideProduct);
router.put("/:id", authorization, updateProduct);
router.delete("/:id", authorization, deleteProduct);

module.exports = router;
