'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emojis', {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emojis');
  }
};