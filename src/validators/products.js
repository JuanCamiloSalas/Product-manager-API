// Express-validator
const { check } = require('express-validator');
const validateResult = require('../helpers/validateHelper.js');

// Validaciones
const validateGetProducts = [
    check('page')
        .optional()
        .customSanitizer((value) => Number(value))
        .isNumeric()
        .withMessage("page debe ser un valor numérico"),
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
    check('categoryId')
        .optional()
        .isUUID()
        .withMessage("categoryId debe ser de tipo UUID"),
    check('alpha')
        .optional()
        .isString()
        .withMessage("alpha debe ser una string")
        .trim()
        .isIn(['ASC', 'DESC'])
        .withMessage("alpha solo puede ser 'ASC' o 'DESC'"),
    check('price')
        .optional()
        .isString()
        .withMessage("price debe ser una string")
        .trim()
        .isIn(['ASC', 'DESC'])
        .withMessage("price solo puede ser 'ASC' o 'DESC'"),
    check('createdAt')
        .optional()
        .isString()
        .withMessage("createdAt debe ser una string")
        .trim()
        .isIn(['ASC', 'DESC'])
        .withMessage("createdAt solo puede ser 'ASC' o 'DESC'"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateGetProductById = [
    check('id')
        .isUUID()
        .withMessage("id debe ser de tipo UUID"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateCreateProduct = [
    check('name')
        .isString()
        .withMessage("name debe ser una string")
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: 3, max: 50 })
        .withMessage("name debe estar entre 3 y 50 caracteres"),
    check('description')
        .isString()
        .withMessage("description debe ser una string")
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: 20, max: 700 })
        .withMessage("description debe estar entre 20 y 700 caracteres"),
    check('price')
        .customSanitizer((value) => Number(value))
        .isNumeric()
        .withMessage("price debe ser un valor numérico"),
    check('categoryId')
        .isUUID()
        .withMessage("categoryId debe ser de tipo UUID"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateUpdateProduct = [
    check('id')
        .isUUID()
        .withMessage("id debe ser de tipo UUID"),
    check('name')
        .optional()
        .isString()
        .withMessage("name debe ser una string")
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: 3, max: 50 })
        .withMessage("name debe estar entre 3 y 50 caracteres"),
    check('description')
        .optional()
        .isString()
        .withMessage("description debe ser una string")
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: 20, max: 700 })
        .withMessage("description debe estar entre 20 y 700 caracteres"),
    check('price')
        .optional()
        .customSanitizer((value) => Number(value))
        .isNumeric()
        .withMessage("price debe ser un valor numérico"),
    check('categoryId')
        .optional()
        .isUUID()
        .withMessage("categoryId debe ser de tipo UUID"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateDeleteProduct = [
    check('id')
        .isUUID()
        .withMessage("id debe ser de tipo UUID"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateHideProduct = [
    check('id')
        .isUUID()
        .withMessage("id debe ser de tipo UUID"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = {
    validateGetProducts,
    validateGetProductById, 
    validateCreateProduct,
    validateUpdateProduct,
    validateDeleteProduct,
    validateHideProduct,
}
