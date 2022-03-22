'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey:true
      },
      userId: Sequelize.BIGINT,
      channelId: Sequelize.BIGINT,
      serverId: Sequelize.BIGINT,
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};