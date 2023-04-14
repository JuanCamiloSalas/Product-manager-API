const { DataTypes } = require("sequelize");
const { roundPrice } = require("../helpers/roundPrice.js");

// Constantes
const { PRODUCT } = require("../constants/models.js");
const { MSG_PRODUCT } = require("../constants/messages.js");

// Definición de tabla
module.exports = (sequelize) => {
    sequelize.define("product", {
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
                    args: PRODUCT.NAME.LENGTH,
                    msg: MSG_PRODUCT.ERROR.NAME_LENGTH,
                }
            }
        },
        description: {
            type: DataTypes.STRING(700),
            validate: {
                len: {
                    args: PRODUCT.DESC.LENGTH,
                    msg: MSG_PRODUCT.ERROR.DESC_LENGTH,
                }
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: {
                    args: true,
                    msg: MSG_PRODUCT.ERROR.PRICE_NUMBER,
                }
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    });
}