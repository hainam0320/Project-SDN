const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Đăng ký tài khoản
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem email đã tồn tại chưa
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "Email đã được sử dụng" });

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: "Tạo tài khoản thành công" });
    } catch (error) {
        res.status(500).json({ msg: "Lỗi server" });
    }
});

// Đăng nhập
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra email có tồn tại không
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Sai email" });

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Sai Mật Khẩu" });

        // Tạo token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Lỗi server" });
    }
});

module.exports = router;
