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
}

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
}
