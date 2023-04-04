const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.send("/admin");
});

module.exports = router;