'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('reactions', 'emojiId')
    await queryInterface.dropTable('emojis')
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.createTable('emojis', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey:true
      },
      name: Sequelize.STRING,
      animated: Sequelize.BOOLEAN,
      url: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
};
