// Constantes
const { MSG_PRODUCT, MSG_CONST } = require("../constants/messages.js");
const { PRODUCT, REGEXP } = require("../constants/models.js");

const validateData = (fieldName, dataEl, categoriesIds = []) => {
    const error = {
        value: dataEl,
        msg: "",
        param: `file (en la columna '${fieldName}')`,
        location: "body",
        exist: false,
        status: 400,
    };

    switch (fieldName) {
        case 'name':
            const name = encodeURIComponent(String(dataEl).replace(/\s+/g, ' ').trim()).replace(/%20/g, " ");
            if (name.length < PRODUCT.NAME.LENGTH[0] || name.length > PRODUCT.NAME.LENGTH[1]) {
                error.exist = true;
                error.msg = MSG_PRODUCT.ERROR.NAME_LENGTH;
                return { error };
            }
            return { error, dataCleaned: name };

        case 'description':
            const description = encodeURIComponent(String(dataEl).replace(/\s+/g, ' ').trim()).replace(/%20/g, " ");
            if (description.length < PRODUCT.DESC.LENGTH[0] || description.length > PRODUCT.DESC.LENGTH[1]) {
                error.exist = true;
                error.msg = MSG_PRODUCT.ERROR.DESC_LENGTH;
                return { error };
            }
            return { error, dataCleaned: description };

        case 'price':
            const price = Number(dataEl);
            if (!Number(price)) {
                error.exist = true;
                error.msg = MSG_CONST.IS_NUMBER;
                return { error };
            }
            return { error, dataCleaned: price };
            
        case 'categoryId':
            const categoryId = String(dataEl).trim();
            if (!REGEXP.IS_UUID.test(categoryId)) {
                error.exist = true;
                error.msg = MSG_CONST.IS_UUID;
                return { error };
            }
            if (!categoriesIds.includes(categoryId)) {
                error.exist = true;
                error.msg = MSG_CONST.NOT_FOUND;
                error.status = 404;
                return { error };
            }
            return { error, dataCleaned: categoryId };

        default:
            error.exist = true;
            error.msg = `${fieldName} No es una columna válida o necesaria para crear productos\nVerifique si está bien escrita o si no es necesaria`;
            return { error };
    }
}

module.exports = validateData;
