const authorization = (req, res, next) => {
    try {
        const { role } = req.user;

        if (role !== 'admin') {
            return res.status(403).json({errors: [{ msg: "El usuario no tiene permiso para acceder a la ruta"}]})
        }

        next();
    } catch (error) {
        res.status(401).json({errors: [{msg: error.message}]})
    }
}

module.exports = authorization;