module.exports = app => {
const question = require("../controllers/question.controller.js");

const router = require("express").Router();

router.get("/:quizId/questions", question.getAll);

router.post("/:quizId/questions/create", question.create);

router.delete("/:quizId/questions/:questionId/delete", question.destroy);

router.put("/:quizId/questions/:questionId", question.edit);

app.use('/api/quizzes/', router);
}