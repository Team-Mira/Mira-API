'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('messages', 'isReply', {
      type: Sequelize.BOOLEAN,
      default: false,
    }),
    await queryInterface.addColumn('messages', 'repliedUserId', {
      type: Sequelize.BIGINT,
    }),
    await queryInterface.addColumn('messages', 'mentionedEveryone', {
      type: Sequelize.BOOLEAN,
      default: false,
    })

    await queryInterface.removeColumn('messages', 'mentionId');

    await queryInterface.removeColumn('messages', 'reactionId');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
