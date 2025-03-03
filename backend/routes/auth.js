const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware kiểm tra xác thực
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Truy cập bị từ chối" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: "Token không hợp lệ" });
        req.user = user;
        next();
    });
};

// Đăng ký tài khoản
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "Email đã được sử dụng" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Sai email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Sai Mật Khẩu" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Lỗi server" });
    }
});

// Logout bằng cách yêu cầu frontend xóa token
router.post("/logout", (req, res) => {
    res.json({ msg: "Đăng xuất thành công" });
});

// API yêu cầu xác thực
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ msg: "Bạn đã truy cập vào trang bảo vệ", user: req.user });
});

module.exports = router;
