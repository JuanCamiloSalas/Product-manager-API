const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    // Leer tóken del header
    const token = req.header('x-auth-token');

    // Revisar si no hay tóken
    if (!token) return res.status(401).json({errors: [{msg: "Envíe un tóken"}]});

    // Validar el tóken
    try {
        const encryption = jwt.verify(token, process.env.SECRETA);
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(401).json({errors: [{msg: "Tóken inválido"}]})
    }
}

module.exports = authentication;