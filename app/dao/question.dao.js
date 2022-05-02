const db = require("../models");
const Question = db.questions;

let questionDao = {
    create: create,
    findAll: findAll,
    destroy: destroy,
    edit: edit
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

function destroy(questionId) {
     return Question.destroy({
          where: {
               id: questionId
          }
     });
}

function edit(question, id) {
     return Question.update({
       body: question.body,
       fk_quiz: question.fk_quiz
     }, {
         returning: true, where: {id: id}
     });
 };
   
module.exports = questionDao;