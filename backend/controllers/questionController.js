const Question = require('../models/Question');

// Lấy tất cả câu hỏi
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Tạo câu hỏi mới
exports.createQuestion = async (req, res) => {
    try {
        const { text, quizId } = req.body;
        const newQuestion = new Question({ text, quizId });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Lấy câu hỏi theo ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật câu hỏi
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true }
        );
        if (!updatedQuestion) return res.status(404).json({ error: "Question not found" });
        res.json(updatedQuestion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Xóa câu hỏi
exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) return res.status(404).json({ error: "Question not found" });
        res.json({ message: "Question deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
