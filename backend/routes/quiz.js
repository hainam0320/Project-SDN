const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');

router.get('/', QuizController.getAllQuizzes);
router.post('/', QuizController.createQuiz);
router.get('/:id', QuizController.getQuizById);
router.put('/:id', QuizController.updateQuiz);
router.delete('/:id', QuizController.deleteQuiz);

module.exports = router;
