import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            setMessage("Sai email hoặc mật khẩu");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2>Đăng nhập</h2>
                    {message && <p className="text-danger">{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Mật khẩu</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                            <div className="text-end mt-1">
                                <Link to="/forgot-password" className="text-decoration-none">Quên mật khẩu?</Link>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Đăng nhập</button>
                    </form>
                    <p className="mt-3">
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
