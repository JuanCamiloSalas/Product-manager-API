const { Router } = require("express");
const router = Router();

// Controllers
const {
    getCategories, 
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../../controllers/categories/index.js");

// Routes
router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// ocultar ?

module.exports = router;
