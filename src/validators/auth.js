// Express-validator
const { check } = require('express-validator');
const validateResult = require('../helpers/validateHelper.js');

// Validaciones
const validateSignUp = [
    check("name")
        .trim()
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isString()
        .withMessage("name debe ser una string")
        .isLength({ min: 2, max: 25 })
        .withMessage("name debe estar entre 2 y 25 caracteres"),
    check("password")
        .isLength({ min: 8, max: 20 })
        .withMessage("password debe estar entre 8 y 20 caracteres")
        .matches(/^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
        .withMessage("password debe estar sin espacios y al menos una mayúscula"),
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("El email enviado no cumple con el formato correspondiente"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const validateLogIn = [
    check('email')
        .normalizeEmail()
        .trim()
        .isEmail()
        .withMessage("El email enviado no cumple con el formato correspondiente"),
    check('password')
        .trim()
        .matches(/^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
        .withMessage("password debe estar entre 8 y 20 caracteres, sin espacios y al menos una mayúscula"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateSignUp, validateLogIn }
