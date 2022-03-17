const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('message', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  isReply: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  repliedUser: {
    type: Sequelize.BIGINT
  },
  reactions: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})
