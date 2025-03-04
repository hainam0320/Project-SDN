// models/Article.jss
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    author: { username: String, image: String },
    createdAt: { type: Date, default: Date.now },
    title: String,
    description: String,
    favoritesCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Article", ArticleSchema);


