// Express-validator
const { check } = require('express-validator');
const validateResult = require('../helpers/validateHelper.js');

// Constantes
const { PRODUCT } = require('../constants/models.js');
const { MSG_PRODUCT, MSG_CONST } = require('../constants/messages.js');

// Validaciones
const validateGetProducts = [
    check('page')
        .optional()
        .customSanitizer((value) => Number(value))
        .isNumeric()
        .withMessage(MSG_CONST.IS_NUMBER),
    check('name')
        .optional()
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .isLength({ max: PRODUCT.NAME.LENGTH[1] })
        .withMessage(MSG_PRODUCT.ERROR.NAME_LENGTH_MAX)
        .not()
        .isEmpty()
        .withMessage(MSG_CONST.EMPTY_STRING),
    check('categoryId')
        .optional()
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
    check('alpha')
        .optional()
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .trim()
        .isIn(['ASC', 'DESC'])
        .withMessage(MSG_CONST.ORDER),
    check('price')
        .optional()
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .trim()
        .isIn(['ASC', 'DESC'])
        .withMessage(MSG_CONST.ORDER),
    check('createdAt')
        .optional()
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .trim()
        .isIn(['ASC', 'DESC'])
        .withMessage(MSG_CONST.ORDER),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateGetProductById = [
    check('id')
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateCreateProduct = [
    check('name')
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: PRODUCT.NAME.LENGTH[0], max: PRODUCT.NAME.LENGTH[1] })
        .withMessage(MSG_PRODUCT.ERROR.NAME_LENGTH),
    check('description')
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: PRODUCT.DESC.LENGTH[0], max: PRODUCT.DESC.LENGTH[1] })
        .withMessage(MSG_PRODUCT.ERROR.DESC_LENGTH),
    check('price')
        .customSanitizer((value) => Number(value))
        .isNumeric()
        .withMessage(MSG_CONST.IS_NUMBER),
    check('categoryId')
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateUpdateProduct = [
    check('id')
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
    check('name')
        .optional()
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: PRODUCT.NAME.LENGTH[0], max: PRODUCT.NAME.LENGTH[1] })
        .withMessage(MSG_PRODUCT.ERROR.NAME_LENGTH),
    check('description')
        .optional()
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: PRODUCT.DESC.LENGTH[0], max: PRODUCT.DESC.LENGTH[1] })
        .withMessage(MSG_PRODUCT.ERROR.DESC_LENGTH),
    check('price')
        .optional()
        .customSanitizer((value) => Number(value))
        .isNumeric()
        .withMessage(MSG_CONST.IS_NUMBER),
    check('categoryId')
        .optional()
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateDeleteProduct = [
    check('id')
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateHideProduct = [
    check('id')
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
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
