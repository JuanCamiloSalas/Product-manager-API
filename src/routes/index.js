const { Router } = require("express");

const auth = require("./auth/index.js");
const admin = require("./admin/index.js");
const products = require("./products/index.js");

const router = Router();

router.use("/auth", auth);
router.use("/admin",admin);
router.use("/products",products);

module.exports = router;
