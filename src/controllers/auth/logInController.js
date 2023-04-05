const { User } = require("../../db.js");

// Hash
const bcryptjs = require('bcryptjs');

// Tóken
const jwt = require('jsonwebtoken');

const logInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});
        if (!user) return res.status(404).json({errors: [{ msg: `No se encontró un usuario con el email ${email}`}]});

        // Verificar la password
        const correctPass = await bcryptjs.compare(password, user.password);
        if (!correctPass) return res.status(403).json({errors: [{msg: "Password incorrecta"}]});

        // Crear el payload del JWT
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            }
        }

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 172800 // vence en 2 días
        }, (error, token) => {
            if (error) throw error;

            res.status(200).json({ token });
        });

    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
}

module.exports = logInController;
