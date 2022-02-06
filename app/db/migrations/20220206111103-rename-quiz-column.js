'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameColumn('Quizzes', 'isDeleted', 'isArchived');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.renameColumn('Quizzes', 'isArchived', 'isDeleted');
  }
};
