const { USER, CATEGORY, PRODUCT } = require("./models.js");

const MSG_CONST = {
    IS_NUMBER: "El valor ingresado debe ser de tipo Number",
    IS_UUID: "El valor ingresado no cumple con el formato UUID",
    IS_STRING: "El valor ingresado debe ser de tipo String",
    EMPTY_STRING: "El valor ingresado no puede estar vacío",
    NOT_FOUND: "El registro ingresado no existe en la base de datos",
    ORDER: "Este campo solo puede ser 'ASC' o 'DESC'"
}

const MSG_USER = {
    ERROR: {
        NAME_LENGTH: `name debe estar entre ${USER.NAME.LENGTH[0]} y ${USER.NAME.LENGTH[1]} caracteres`,
        PWD_LENGTH: `password debe estar entre ${USER.PWD.LENGTH[0]} y ${USER.PWD.LENGTH[1]} caracteres`,
        PWD_REGEXP: "password debe estar sin espacios y al menos una mayúscula",
        EMAIL: "El email enviado no cumple con el formato correspondiente",
    }
}

const MSG_CATEGORY = {
    ERROR: {
        NAME_LENGTH: `name debe estar entre ${CATEGORY.NAME.LENGTH[0]} y ${CATEGORY.NAME.LENGTH[1]} caracteres`,
        NAME_LENGTH_MAX: `name no puede superar los ${CATEGORY.NAME.LENGTH[1]} caracteres`,
        NOT_FOUND: "No se encontró la categoría con el id ingresado",
    },
    SUCCESS: {
        POST: {
            ONE: ""
        },
        GET: {
            MANY: ""
        },
        PUT: {
            ONE: ""
        },
        DELETE: {
            ONE: "Categoría eliminada exitosamente, así como sus productos: "
        }
    }
}

const MSG_PRODUCT = {
    ERROR: {
        NAME_LENGTH: `name debe estar entre ${PRODUCT.NAME.LENGTH[0]} y ${PRODUCT.NAME.LENGTH[1]} caracteres`,
        NAME_LENGTH_MAX: `name no puede superar los ${PRODUCT.NAME.LENGTH[1]} caracteres`,
        DESC_LENGTH: `description debe estar entre ${PRODUCT.DESC.LENGTH[0]} y ${PRODUCT.DESC.LENGTH[1]} caracteres`,
        PRICE_NUMBER: `price debe ser un valor numérico`,
    }
}

module.exports = {
    MSG_CONST,
    MSG_USER,
    MSG_CATEGORY,
    MSG_PRODUCT,
}