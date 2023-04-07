const { Router } = require("express");
const router = Router();

// validators
const {
    validateSignUp,
    validateLogIn
} = require("../../validators/auth.js");

// Controllers
const { 
    signUpController, 
    logInController,
} = require("../../controllers/auth/index.js");

// Routes
router.post("/signup", 
    validateSignUp, 
    signUpController
);

router.post("/login", 
    validateLogIn, 
    logInController
);

module.exports = router;
