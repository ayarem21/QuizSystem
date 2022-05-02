const db = require("../models");
const Question = db.questions;

let questionDao = {
    create: create,
    findAll: findAll
}

function findAll(quizId) { // TODO remove, if will not needed
     return Question.findAll({
          where: {
               fk_quiz: quizId
          }
     })
}

function create(question) {
     return Question.create(question, {
          include : [{
               association: db.questionQuiz,
               as: 'quiz'
          }]
     });
}
   
module.exports = questionDao;