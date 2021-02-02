
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'node_mysql',
  'root',
  'password',
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);

module.exports = sequelize;
