const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('server', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },
});
