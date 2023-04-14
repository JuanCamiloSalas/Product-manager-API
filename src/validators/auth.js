// Express-validator
const { check } = require('express-validator');
const validateResult = require('../helpers/validateHelper.js');

// Constantes
const { USER } = require("../constants/models.js");
const { MSG_USER, MSG_CONST } = require('../constants/messages.js');

// Validaciones
const validateSignUp = [
    check("name")
        .isString()
        .withMessage(MSG_CONST.IS_STRING)
        .customSanitizer((value) => value.replace(/\s+/g, ' ').trim())
        .escape()
        .isLength({ min: USER.NAME.LENGTH[0], max: USER.NAME.LENGTH[1] })
        .withMessage(MSG_USER.ERROR.NAME_LENGTH),
    check("password")
        .isLength({ min: USER.PWD.LENGTH[0], max: USER.PWD.LENGTH[1] })
        .withMessage(MSG_USER.ERROR.PWD_LENGTH)
        .matches(USER.PWD.REGEXP)
        .withMessage(MSG_USER.ERROR.PWD_REGEXP),
    check("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage(MSG_USER.ERROR.EMAIL),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const validateLogIn = [
    check('email')
        .normalizeEmail()
        .trim()
        .isEmail()
        .withMessage(MSG_USER.ERROR.EMAIL),
    check('password')
        .isLength({ min: USER.PWD.LENGTH[0], max: USER.PWD.LENGTH[1] })
        .withMessage(MSG_USER.ERROR.PWD_LENGTH)
        .matches(USER.PWD.REGEXP)
        .withMessage(MSG_USER.ERROR.PWD_REGEXP),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateSignUp, validateLogIn }
