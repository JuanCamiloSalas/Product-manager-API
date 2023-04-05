const { User } = require("../../db.js");

// Hash
const bcryptjs = require('bcryptjs');

// Tóken
const jwt = require('jsonwebtoken');

const signUpController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hashear la password
        const salt = await bcryptjs.genSalt(10);
        const newPassword = await bcryptjs.hash(password, salt);

        // Crear el usuario
        const newUser = await User.create({ password: newPassword, email, name });

        // Crear el payload del JWT
        const payload = {
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
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

module.exports = signUpController;