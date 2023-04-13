const fs = require("fs");

const readFile = (req, res, next) => {
    try {

        const filename = req.file?.filename || null;

        if (!filename) {
            return res.status(400).json({ errors: [{ value: `${filename}`, msg: "Envíe un archivo por parámetro file vía body", param: "file", location: "body"}]});
        }

        fs.readdir('./src/uploads', (error, files) => {
            if (error) throw new Error(error);
            
            fs.readFile(`./src/uploads/${filename}`, 'UTF-8', (error, file) => {
                if (error) throw new Error(error);
                req.table = file;
                fs.unlinkSync(`./src/uploads/${filename}`);
                next();
            });            
        });
        
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: error.message, location: "readFile" }]});
    }
}

module.exports = readFile;
