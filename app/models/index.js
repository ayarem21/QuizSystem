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

db.quizQuestion = db.quizzes.hasMany(db.questions, { foreignKey: 'fk_quiz', as: 'questions' });

db.questionQuiz = db.questions.belongsTo(db.quizzes, {
  foreignKey: 'fk_quiz',
  as: 'quiz',
  onDelete: 'CASCADE'
})

module.exports = db;