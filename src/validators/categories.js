// Express-validator
const { check } = require('express-validator');
const validateResult = require('../helpers/validateHelper.js');

// Validaciones
const validateGetCategories = [
    check('name')
        .optional()
        .isString()
        .withMessage("name debe ser una string")
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .isLength({ max: 25 })
        .withMessage("name debe ser menor o igual a 25 caracteres")
        .not()
        .isEmpty()
        .withMessage("name no puede ser un string vacío"),
    check('alpha')
        .optional()
        .isString()
        .withMessage("alpha debe ser una string")
        .trim()
        .custom(value => {
            const correctValue = value === 'ASC' || value === 'DESC' ? true : false;
            if (correctValue) {
                return true;
            } else {
                throw new Error("alpha solo puede ser 'ASC' o 'DESC'");
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateCreateCategory = [
    check('name')
        .isString()
        .withMessage("name debe ser una string")
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: 2, max: 25 })
        .withMessage("name debe estar entre 2 y 25 caracteres")
        .escape(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateUpdateCategory = [
    check('id')
        .isUUID()
        .withMessage("El id del usuario debe ser de tipo UUID"),
    check('name')
        .isString()
        .withMessage("name debe ser una string")
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .isLength({ min: 2, max: 25 })
        .withMessage("name debe estar entre 2 y 25 caracteres")
        .escape(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateDeleteCategory = [
    check('id')
        .isUUID()
        .withMessage("El id del usuario debe ser de tipo UUID"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { 
    validateGetCategories,
    validateCreateCategory,
    validateUpdateCategory,
    validateDeleteCategory,
}
