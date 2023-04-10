const { Category } = require("../db.js");

const convertCSV = async(req, res, next) => {
    try {
        const { table } = req;
        
        // Separar cabecera de las demás filas
        const allLines = table.replace(/\r/g, '').split('\n');
        const header = allLines[0];
        const dataLines = allLines.slice(1); 
        const fieldNames = header.split(';');

        // Validar que la tabla sea de 4 columnas
        if (fieldNames.length !== 4) {
            return res.status(400).json({ msg: `La tabla debe tener 4 columnas`});
        }

        // Validar que tenga los campos exigidos
        const requiredHeaders = ['name', 'description', 'price', 'categoryId'];
        for (const el of requiredHeaders) {
            if (!fieldNames.includes(el)) {
                return res.status(400).json({ msg: `La columna ${el} es requerida`});
            }
        }

        // Buscar todos los Ids de las categorías
        const categories = await Category.findAll({
            attributes: ['id'], 
        });
        const categoriesIds = categories.map(el => el.dataValues.id);


        // Crear los objetos de cada producto
        let productsList = [];
        for (let i = 0; i < dataLines.length; i++) {
            let obj = {};
            const data = dataLines[i].split(';');

            for (let j = 0; j < fieldNames.length; j++) {

                let dataEl = data[j];
                const fielName = fieldNames[j];

                if (fielName === 'price') { 
                    console.log(dataEl);
                    dataEl = Number(dataEl);
                    if (Number.isNaN(dataEl)) {
                        return res.status(400).json({ msg: `price debe ser de tipo number`});
                    }
                } else if (fielName === 'categoryId') {

                    dataEl = String(dataEl).trim();
                    if (!categoriesIds.includes(dataEl)) {
                        return res.status(404).json({ msg: `El categoryId ${dataEl} No existe en la base de datos`});
                    }
                } else if (fielName === 'description') {
                    dataEl = String(dataEl);
                    if (dataEl.length > 600) {
                        return res.status(400).json({ msg: `La description ${dataEl} supera el límite de 700 caracteres`});
                    }
                } else {
                    dataEl = String(dataEl).trim();
                }

                if (String(dataEl).trim().length <= 0) {
                    return res.status(400).json({ msg: `No se permiten campos vacíos`});
                }

                obj[fielName] = dataEl;
            }

            productsList.push(obj);
        }

        req.productsList = productsList;
        next();

    } catch (error) {
        res.send(error.message);
    }
}

module.exports = convertCSV;
