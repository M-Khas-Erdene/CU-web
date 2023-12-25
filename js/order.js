const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Order;
