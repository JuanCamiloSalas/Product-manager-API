// Express-validator
const { check } = require('express-validator');
const validateResult = require('../helpers/validateHelper.js');

// Constantes
const { MSG_CONST, MSG_CATEGORY } = require('../constants/messages.js');
const { CATEGORY } = require('../constants/models.js');

// Validaciones
const validateGetCategories = [
    check('name')
        .optional()
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .isLength({ max: CATEGORY.NAME.LENGTH[1] })
        .withMessage(MSG_CATEGORY.ERROR.NAME_LENGTH_MAX)
        .not()
        .isEmpty()
        .withMessage(MSG_CONST.EMPTY_STRING),
    check('alpha')
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

const validateCreateCategory = [
    check('name')
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: CATEGORY.NAME.LENGTH[0], max: CATEGORY.NAME.LENGTH[1] })
        .withMessage(MSG_CATEGORY.ERROR.NAME_LENGTH)
        .escape(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateUpdateCategory = [
    check('id')
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
    check('name')
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: CATEGORY.NAME.LENGTH[0], max: CATEGORY.NAME.LENGTH[1] })
        .withMessage(MSG_CATEGORY.ERROR.NAME_LENGTH),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateDeleteCategory = [
    check('id')
        .isUUID()
        .withMessage(MSG_CONST.IS_UUID),
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
