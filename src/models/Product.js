const { DataTypes } = require("sequelize");
const { roundPrice } = require("../helpers/roundPrice.js");

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
        },
        description: {
            type: DataTypes.STRING(700),
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    });
}