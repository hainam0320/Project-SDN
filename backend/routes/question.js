const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questionController');

router.get('/', QuestionController.getAllQuestions);
router.post('/', QuestionController.createQuestion);
router.get('/:id', QuestionController.getQuestionById);
router.put('/:id', QuestionController.updateQuestion);
router.delete('/:id', QuestionController.deleteQuestion);

module.exports = router;
