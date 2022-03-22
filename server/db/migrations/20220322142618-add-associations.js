'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('messages', 'mentionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'mentions',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    await queryInterface.addColumn('messages', 'reactionId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'reactions',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    await queryInterface.addColumn('mentions', 'messageId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'messages',
        key: 'id'
      }, 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    await queryInterface.addColumn('reactions', 'messageId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'messages',
        key: 'id'
      }, 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    await queryInterface.addColumn('reactions', 'emojiId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'emojis',
        key: 'id'
      }
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     queryInterface.removeColumn('messages', 'mentionId');
     queryInterface.removeColumn('messages', 'reactionId');
     queryInterface.removeColumn('mentions', 'messageId');
     queryInterface.removeColumn('reactions', 'messageId');
    return queryInterface.removeColumn('reaction', 'emojiId');
  }
};
