const questionDao = require('../dao/question.dao');

exports.getAll = (req, res) => {
  const quizId = req.params.quizId;
  questionDao.findAll(quizId)
    .then(data => res.json(data))
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Questions: ${err.message}`
      });
    });
};

exports.create = (req, res) => {
  const question = {
    body: req.body.body,
    fk_quiz: req.params.quizId
  } 
  questionDao.create(question)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question."
      });
    });
};

exports.destroy = (req, res) => { //TODO only creator of the quiz can delete question
  const questionId = req.params.questionId;
  questionDao.destroy(questionId)
  .then((deletedRow) => {
    if(deletedRow === 1) {
      res.status(202).send({
        message: `Question with id = ${questionId} was removed`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the Question."
    });
  });
};

exports.edit = (req, res, next) => {
  const questionId = req.params.questionId;
  const question = {
    body: req.body.body,
    fk_quiz: req.params.quizId
  }
  questionDao.edit(question, questionId)
  .then(function([updatedRows, [updatedQuestion]]) { //returning true retuns row id and updated object. This is needed for getting only object
    res.json(updatedQuestion)
  })
  .catch(next);
};
