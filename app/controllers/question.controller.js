const db = require("../models");
const Quiz = db.quizzes;
const Question = db.questions;

exports.create = (req, res) => {
  const quizId = req.params.quizId; //ToDo is exist quiz with this id?
  Question.create({
    body: req.body.body,
    fk_quiz: quizId
  })
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

exports.getAll = (req, res) => {
  const quizId = req.params.quizId;
  Question.findAll({
    where: {
      fk_quiz: quizId
    }
  })
    .then(data => {
      if (data.length) {
        res.json(data);
      } else {
        res.status(404).send({
          message: `Can't find Questions for Quiz with id: ${quizId}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Questions: ${err.message}`
      });
    });
}
