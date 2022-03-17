const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('reaction', {
  messageId: {
    type: Sequelize.BIGINT
  },
  userId: {
    type: Sequelize.BIGINT
  },
  reactorId: {
    type: Sequelize.BIGINT
  },
  emojiId: {
    type: Sequelize.BIGINT
  }
});
