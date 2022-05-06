const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.quizzes = require("./quiz.model.js")(sequelize, Sequelize);
db.questions = require("./question.model.js")(sequelize, Sequelize);
db.answers = require("./answer.model.js")(sequelize, Sequelize);

//Quiz one to many relation to Questions
db.quizQuestion = db.quizzes.hasMany(db.questions, { 
  foreignKey: 'fk_quiz', 
  as: 'questions' 
});

db.questionQuiz = db.questions.belongsTo(db.quizzes, {
  foreignKey: 'fk_quiz',
  as: 'quiz',
  onDelete: 'CASCADE'
});

//Qestion one to many relation to Answers
db.questionAnswer = db.questions.hasMany(db.answers, { 
  foreignKey: 'fk_question', 
  as: 'answers' 
});

db.answerQuestion = db.answers.belongsTo(db.questions, {
  foreignKey: 'fk_question',
  as: 'question',
  onDelete: 'CASCADE'
});

module.exports = db;