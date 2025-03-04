const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

// Lấy danh sách bài viết
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Thêm bài viết mới
router.post("/", async (req, res) => {
    const { author, title, description, favoritesCount } = req.body;
    const newArticle = new Article({ author, title, description, favoritesCount });

    try {
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
