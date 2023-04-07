const { Router } = require("express");
const router = Router();

// Middlewares
const {
    authentication,
    authorization,
    uploadFile,
    readFile,
    convertCSV,
} = require("../../middlewares/index.js");

// Validators
const {
    validateGetProducts,
    validateGetProductById, 
    validateCreateProduct,
    validateCreateProducts,
    validateUpdateProduct,
    validateDeleteProduct,
    validateHideProduct,
} = require("../../validators/products.js");

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
router.get("/", 
    validateGetProducts, 
    getProducts
);

router.get("/:id", 
    authentication, 
    validateGetProductById, 
    getProductById
);

router.post("/csv", 
    authentication, 
    authorization, 
    uploadFile, 
    readFile, 
    convertCSV, 
    // validateCreateProducts,
    createProducts
);

router.post("/", 
    authentication, 
    authorization, 
    validateCreateProduct, 
    createProduct
);

router.put("/:id/hide", 
    authentication, 
    authorization, 
    validateHideProduct, 
    hideProduct
);

router.put("/:id", 
    authentication, 
    authorization, 
    validateUpdateProduct, 
    updateProduct
);

router.delete("/:id", 
    authentication, 
    authorization, 
    validateDeleteProduct, 
    deleteProduct
);

module.exports = router;
