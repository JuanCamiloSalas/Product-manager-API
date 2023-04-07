const { Router } = require("express");
const router = Router();

// Middlewares
const {
    authentication,
    authorization,
} = require("../../middlewares/index.js");

// Validators
const {
    validateGetCategories,
    validateCreateCategory,
    validateUpdateCategory,
    validateDeleteCategory,
} = require("../../validators/categories.js");

// Controllers
const {
    getCategories, 
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../../controllers/categories/index.js");

// Routes
router.get("/", 
    validateGetCategories, 
    getCategories
);

router.post("/", 
    authentication, 
    authorization, 
    validateCreateCategory, 
    createCategory
);

router.put("/:id", 
    authentication, 
    authorization, 
    validateUpdateCategory, 
    updateCategory
);

router.delete("/:id", 
    authentication, 
    authorization, 
    validateDeleteCategory, 
    deleteCategory
);

module.exports = router;
