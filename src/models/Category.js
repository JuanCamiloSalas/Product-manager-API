const { DataTypes } = require("sequelize");

// Constantes
const { CATEGORY } = require("../constants/models");
const { MSG_CATEGORY } = require("../constants/messages");

// Definición de tabla
module.exports = (sequelize) => {
    sequelize.define("category", {
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
                    args: CATEGORY.NAME.LENGTH,
                    msg: MSG_CATEGORY.ERROR.NAME_LENGTH,
                }
            }
        },
    },
    { timestams: false });
}