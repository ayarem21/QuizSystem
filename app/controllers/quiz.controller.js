const quizDao = require('../dao/quiz.dao');

exports.getOne = (req, res) => {
  const id = req.params.quizId;
  quizDao.findById(id)
    .then(data => {
      if (data) {  //TODO refactor 
        res.json(data);
      } else {
        res.status(404).send({
          message: `Cannot find Quiz with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Quiz with id = ${id}`
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const quiz = {
    title: req.body.title,
    description: req.body.description,
    questions: req.body.questions
  }

  quizDao.create(quiz)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Quiz."
      });
    });
}

exports.getAll = (req, res) => {
  quizDao.findAll()
    .then(data => {
        res.json(data);
    })
    .catch(err => {  //TODO exception handler
      res.status(500).send({
        message: `Error retrieving Quizzes: ${err.message}`
      });
    });
}

exports.archive = (req, res) => {
  const id = req.params.quizId;
  quizDao.archive(id)
  .then(function([updatedRows, [updatedQuiz]]) { //returning true retuns row id and updated object. This is needed for getting only object
    res.json(updatedQuiz)
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving Quiz with id = ${id}`
    });
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.quizId;
  quizDao.edit(req.body, id)
  .then(function([updatedRows, [updatedQuiz]]) { //returning true retuns row id and updated object. This is needed for getting only object
    res.json(updatedQuiz)
  })
  .catch(next);
};