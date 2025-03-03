const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const axios = require('axios'); // Dùng axios để gọi API từ backend

const app = express();

// Cấu hình Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main', // Sử dụng main.hbs làm layout chính
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Cấu hình thư mục public (chứa CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route chính (trang chủ)
app.get('/', async (req, res) => {
    try {
        // Gọi API từ backend để lấy danh sách quiz
        const quizzes = (await axios.get('http://localhost:4000/quizzes')).data;
        const questions = (await axios.get('http://localhost:4000/questions')).data;

        res.render('index', { quizzes, questions });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.render('index', { quizzes: [], questions: [], error: "Không thể tải dữ liệu" });
    }
});

// Chạy server frontend
app.listen(9999, () => {
    console.log('Frontend server running on http://localhost:9999');
});
