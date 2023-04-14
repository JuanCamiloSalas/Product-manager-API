const { DataTypes } = require("sequelize");

// Constantes
const { USER } = require("../constants/models.js");
const { MSG_USER } = require("../constants/messages.js");

// Definición de tabla
module.exports = (sequelize) => {
    sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: USER.NAME.LENGTH,
                    msg: MSG_USER.ERROR.NAME_LENGTH,
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: MSG_USER.ERROR.EMAIL,
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: USER.PWD.LENGTH,
                    msg: MSG_USER.ERROR.PWD_LENGTH,
                },
                is: {
                    args: USER.PWD.REGEXP,
                    msg: MSG_USER.ERROR.PWD_REGEXP,
                }
            }
        },
        role: {
            type: DataTypes.ENUM(USER.ROLES.ENUM),
            defaultValue: USER.ROLES.DEFAULT,
        }
    });
}