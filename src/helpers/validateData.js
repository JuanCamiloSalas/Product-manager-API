const validateData = (fieldName, dataEl, categoriesIds = []) => {
    const error = {
        exist: false,
        status: 400,
    };

    switch (fieldName) {
        case 'name':
            const name = encodeURIComponent(String(dataEl).replace(/\s+/g, ' ').trim()).replace(/%20/g, " ");
            if (name.length < 3 || name.length > 80) {
                error.exist = true;
                error.message = "name debe estar entre 3 y 50 caracteres";
                return { error };
            }
            return { error, dataCleaned: name };

        case 'description':
            const description = encodeURIComponent(String(dataEl).replace(/\s+/g, ' ').trim()).replace(/%20/g, " ");
            if (name.length < 20 || description.length > 700) {
                error.exist = true;
                error.message = "description debe estar entre 20 y 700 caracteres";
                return { error };
            }
            return { error, dataCleaned: description };

        case 'price':
            const price = Number(dataEl);
            if (!Number(price)) {
                error.exist = true;
                error.message = "price debe ser de tipo Number";
                return { error };
            }
            return { error, dataCleaned: price };
            
        case 'categoryId':
            const categoryId = String(dataEl).trim();
            const isUUID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
            if (!isUUID.test(categoryId)) {
                error.exist = true;
                error.message = `categoryId debe ser de tipo UUID`;
                return { error };
            }
            if (!categoriesIds.includes(categoryId)) {
                error.exist = true;
                error.message = `El categoryId ${categoryId} No existe en la base de datos`;
                error.status = 404;
                return { error };
            }
            return { error, dataCleaned: categoryId };

        default:
            error.exist = true;
            error.message = `${fieldName} No es una columna válida o necesaria para crear productos\nVerifique si está bien escrita o si no es necesaria`;
            return { error };
    }
}

module.exports = validateData;
