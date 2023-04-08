require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_PASSWORD_TEST, DB_HOST, DB_HOST_TEST, DB_NAME, DB_NAME_TEST, NODE_ENV } = process.env;

const conecction = NODE_ENV === 'test'
    ? `postgres://${DB_USER}:${DB_PASSWORD_TEST}@${DB_HOST_TEST}/${DB_NAME_TEST}`
    : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

const sequelize = new Sequelize(conecction, {
    logging: false,
    native: false
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Category, Product } = sequelize.models;
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
    ...sequelize.models,
    conn: sequelize
}