const { Category } = require("../db.js");
const validateData = require("../helpers/validateData.js");
const validateFieldNames = require("../helpers/validateHeader.js");

const convertCSV = async(req, res, next) => {
    try {
        const { table } = req;
        
        // Separar cabecera de las demás filas
        const allLines = table.replace(/\r/g, '').split('\n');
        const header = allLines[0];
        const dataLines = allLines.slice(1); 
        const fieldNames = header.split(';');

        // Validar cabecera
        const { exist, ...errorInfo } = validateFieldNames(fieldNames);
        if (exist) {
            return res.status(400).json({ errors: [ errorInfo ]});
        }

        // Buscar todos los Ids de las categorías
        const categories = await Category.findAll({ attributes: ['id'], });
        const categoriesIds = categories.map(el => el.dataValues.id);

        // Crear los objetos de cada producto
        let productsList = [];
        for (let i = 0; i < dataLines.length; i++) {
            let obj = {};
            const data = dataLines[i].split(';');

            for (let j = 0; j < fieldNames.length; j++) {

                const fielName = fieldNames[j];

                // Validación de datos
                const { error, dataCleaned } = validateData(fielName, data[j], categoriesIds);
                const { exist, status, ...errorInfo } = error;
                if (exist) {
                    return res.status(status).json({ errors: [ errorInfo ]});
                }

                obj[fielName] = dataCleaned;
            }

            productsList.push(obj);
        }

        req.productsList = productsList;
        next();

    } catch (error) {
        res.status(500).json({ errors: [{msg: error.message, location: "convertCSV"}] });
    }
}

module.exports = convertCSV;
