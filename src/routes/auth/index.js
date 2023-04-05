const { Router } = require("express");
const router = Router();

// Controllers
const { 
    signUpController, 
    logInController,
} = require("../../controllers/auth/index.js");

// Routes
router.post("/signup", signUpController);
router.post("/login", logInController);

module.exports = router;
