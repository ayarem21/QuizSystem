'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Quiz), {
        foreignKey: 'fk_quiz',
        onDelete: 'CASCADE'
      }
    }
  }
  Question.init({
    body: DataTypes.STRING,
    fk_quiz: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};