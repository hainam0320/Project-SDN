import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            alert("Đăng ký thành công!");
            navigate("/login"); // Chuyển hướng về trang Login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card p-4" style={{ width: "400px" }}>
                <h2 className="text-center">Đăng ký</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Tên</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
                </form>
                <p className="text-center mt-3">
                    Đã có tài khoản? <a href="/login">Đăng nhập</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
