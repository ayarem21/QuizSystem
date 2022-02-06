const db = require("../models");
const Quiz = db.quizzes;

exports.getOne = (req, res) => {
  const id = req.params.quizId;

  Quiz.findByPk(id)
    .then(data => {
      if (data) {
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
    description: req.body.description
  }

  Quiz.create(quiz)
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
  Quiz.findAll()
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({
          message: `Can't find Quizes`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Quizzes: ${err.message}`
      });
    });
}

exports.archive = (req, res) => {
  const id = req.params.quizId;

  Quiz.findByPk(id)
    .then(data => {
      if (data) {
        data.set({
          "isArchived": !data.isArchived
        });
        data.save();
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