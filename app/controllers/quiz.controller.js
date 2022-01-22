const db = require("../models");
const Quiz = db.quizzes;
const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {
  const id = req.params.id;

  Quiz.findByPk(id)
    .then(data => {
        if (data) {
            res.data;
        } else {
            res.status(404).send({
              message: `Cannot find Quiz with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: "Error retrieving Quiz with id=" + id
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