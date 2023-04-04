const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.JAWSDB_URL || {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PW,
    }
);

module.exports = sequelize;