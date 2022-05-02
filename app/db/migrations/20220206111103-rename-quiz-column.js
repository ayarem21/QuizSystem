'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameColumn('quizzes', 'isDeleted', 'isArchived');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.renameColumn('quizzes', 'isArchived', 'isDeleted');
  }
};
