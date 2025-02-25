const quizzes = []; // Tạm thời lưu dữ liệu trên bộ nhớ

exports.getAllQuizzes = (req, res) => {
    res.json(quizzes);
};

exports.createQuiz = (req, res) => {
    const { title, description } = req.body;
    const newQuiz = { id: quizzes.length + 1, title, description };
    quizzes.push(newQuiz);
    res.status(201).json(newQuiz);
};

exports.getQuizById = (req, res) => {
    const quiz = quizzes.find(q => q.id == req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found');
    res.json(quiz);
};

exports.updateQuiz = (req, res) => {
    const quiz = quizzes.find(q => q.id == req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found');
    
    quiz.title = req.body.title || quiz.title;
    quiz.description = req.body.description || quiz.description;
    res.json(quiz);
};

exports.deleteQuiz = (req, res) => {
    const index = quizzes.findIndex(q => q.id == req.params.id);
    if (index === -1) return res.status(404).send('Quiz not found');
    
    quizzes.splice(index, 1);
    res.status(204).send();
};
