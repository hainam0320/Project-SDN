const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    bio: { type: String, required: true },
    roleId: { type: Number, default: 1 }, // Mặc định là 1
});

module.exports = mongoose.model("User", UserSchema);
