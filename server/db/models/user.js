const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reactionsRecieved: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});
