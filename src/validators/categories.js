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
        .isLength({ max: 50 })
        .withMessage("name debe ser menor o igual a 50 caracteres")
        .not()
        .isEmpty()
        .withMessage("name no puede ser un string vacío"),
    check('alpha')
        .optional()
        .isString()
        .withMessage("alpha debe ser una string")
        .trim()
        .isIn(['ASC', 'DESC'])
        .withMessage("alpha solo puede ser 'ASC' o 'DESC'"),
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
        .isLength({ min: 3, max: 50 })
        .withMessage("name debe estar entre 3 y 50 caracteres")
        .escape(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateUpdateCategory = [
    check('id')
        .isUUID()
        .withMessage("El id de la categoría debe ser de tipo UUID"),
    check('name')
        .isString()
        .withMessage("name debe ser una string")
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: 3, max: 50 })
        .withMessage("name debe estar entre 3 y 50 caracteres"),
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
