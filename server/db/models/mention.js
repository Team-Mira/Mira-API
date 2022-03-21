const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('mention', {
  messageId: {
    type: Sequelize.BIGINT
  },
  userId: {
    type: Sequelize.BIGINT
  },
});