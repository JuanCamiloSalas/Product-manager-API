const { Router } = require("express");

const auth = require("./auth/index.js");
const admin = require("./admin/index.js");
const categories = require("./categories/index.js");
const products = require("./products/index.js");

const router = Router();

const authorization = require("../middlewares/auth.js");

router.use("/auth", auth);
router.use("/admin", authorization, admin);
router.use("/categories", authorization, categories);
router.use("/products", products);

module.exports = router;
