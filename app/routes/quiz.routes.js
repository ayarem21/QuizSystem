module.exports = app => {
const quizzes = require("../controllers/quiz.controller.js");

const router = require("express").Router();

router.get("/", quizzes.getAll);

router.get("/:quizId", quizzes.getOne);

router.patch("/:quizId/archive", quizzes.archive);

router.post("/create", quizzes.create);

app.use('/api/quizzes', router);
}