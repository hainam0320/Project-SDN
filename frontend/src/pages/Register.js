import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phone: "",
        address: "",
        bio: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            alert("Đăng ký thành công!");
            navigate("/"); // Quay về trang login sau khi đăng ký
        } catch (err) {
            setError(err.response?.data?.msg || "Đăng ký thất bại");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Đăng Ký</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Mật khẩu:</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Số điện thoại:</label>
                    <input type="text" name="phone" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Địa chỉ:</label>
                    <input type="text" name="address" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Tiểu sử:</label>
                    <textarea name="bio" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
