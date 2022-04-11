const db = require("../models");
const Quiz = db.quizzes;

let quizDao = {
    findById: findById,
    create: create,
    findAll: findAll,
    archive: archive,
    edit: edit
}

function findAll() {
    return Quiz.findAll()
}

function findById(id) {
    return Quiz.findByPk(id)
}
  
function create(quiz) {
    return Quiz.create(quiz);
}
  
  
function archive(id) {
    return Quiz.findByPk(id)
    .then(quiz => Quiz.update({
        "isArchived": !quiz.isArchived
    }, {returning: true, where: {id: id}}));
};
  
function edit (quiz, id) {
    return Quiz.update({
      "title": quiz.title,
      "description": quiz.description,
      "isArchived": quiz.isArchived
    }, {returning: true, where: {id: id}})
};

module.exports = quizDao;