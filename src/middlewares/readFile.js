const fs = require("fs");

const readFile = (req, res, next) => {
    try {

        const { filename } = req.file;

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
        console.log("readFile Error: \n",error);
        res.send(error.message);
    }
}

module.exports = readFile;
