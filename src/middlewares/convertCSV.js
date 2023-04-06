const convertCSV = (req, res, next) => {
    try {
        const { table } = req;
        
        const allLines = table.replace(/\r/g, '').split('\n');
        const header = allLines[0];
        const dataLines = allLines.slice(1);

        const fieldNames = header.split(',');

        let productsList = [];
        for (let i = 0; i < dataLines.length; i++) {
            let obj = {};
            const data = dataLines[i].split(',');

            for (let j = 0; j < fieldNames.length; j++) {
                const fielName = fieldNames[j];
                obj[fielName] = data[j];
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
