const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('emoji', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING
  },
  animated: {
    type: Sequelize.BOOLEAN
  },
  url: {
    type: Sequelize.STRING
  }
});
