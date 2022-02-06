'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      Quiz.hasMany(models.Question);
    }
  }
  Quiz.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    isArchived: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};