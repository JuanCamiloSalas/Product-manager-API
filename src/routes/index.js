const { Router } = require("express");

const auth = require("./auth/index.js");
const admin = require("./admin/index.js");
const categories = require("./categories/index.js");
const products = require("./products/index.js");

const router = Router();

// Middlewares
const { 
    authentication,
    authorization,
} = require("../middlewares/index.js");

router.use("/auth", auth);
router.use("/admin", authentication, authorization, admin);
router.use("/categories", categories);
router.use("/products", products);

module.exports = router;
