const validateFieldNames = (fieldNames) => {
    const error = {
        exist: false,
    }

    if (fieldNames.length !== 4) {
        error.exist = true;
        error.message = "La tabla debe tener 4 columnas";
        return error;
    }

    const requiredHeaders = ['name', 'description', 'price', 'categoryId'];
    for (const el of requiredHeaders) {
        if (!fieldNames.includes(el)) {
            error.exist = true;
            error.message = `La columna ${el} es requerida`;
            return error;
        }
    }

    return error;
}

module.exports = validateFieldNames;
