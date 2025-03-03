const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/question-bank').then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
// Sử dụng Handlebars làm template engine chính
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Khởi tạo server
const PORT = process.env.PORT || 4000;  // Đảm bảo có cổng
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = app;
