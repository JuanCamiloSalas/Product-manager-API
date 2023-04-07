const { Router } = require("express");
const router = Router();

// Middlewares
const {
    authentication,
    authorization,
} = require("../../middlewares/index.js");

// Controllers
const {
    getCategories, 
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../../controllers/categories/index.js");

// Routes
router.get("/", getCategories);
router.post("/", authentication, authorization, createCategory);
router.put("/:id", authentication, authorization, updateCategory);
router.delete("/:id", authentication, authorization, deleteCategory);

module.exports = router;
