const validateFieldNames = (fieldNames) => {
    const error = {
        exist: false,
        location: "body",
    }

    if (fieldNames.length !== 4) {
        error.exist = true;
        error.value = `${fieldNames.length}`;
        error.msg = "La tabla debe tener 4 columnas";
        error.param = "header del .csv";
        return error;
    }

    const requiredHeaders = ['name', 'description', 'price', 'categoryId'];
    for (const el of requiredHeaders) {
        if (!fieldNames.includes(el)) {
            error.exist = true;
            error.value = null;
            error.msg = `La columna ${el} es requerida`;
            error.param = `${el}`;
            return error;
        }
    }

    return error;
}

module.exports = validateFieldNames;
