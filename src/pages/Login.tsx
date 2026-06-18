import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                form
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/");

        } catch (error: any) {

            alert(
                error.response?.data ||
                "Invalid credentials"
            );
        }
    };

    return (
        <div
            className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
            style={{
                background: "linear-gradient(to bottom right, #fdf6f0, #f7ebe8)"
            }}
        >

            <div className="row justify-content-center w-100">

                <div className="col-md-8 col-lg-5">

                    <div
                        className="card border-0 shadow-lg rounded-5 p-4 p-md-5"
                        style={{
                            backgroundColor: "#fffdfb"
                        }}
                    >

                        <div className="text-center mb-4">

                            <h1 className="fw-bold">
                                📖 Welcome Back
                            </h1>

                            <p className="text-muted">
                                Continue creating beautiful stories with AI.
                            </p>

                        </div>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    className="form-control form-control-lg rounded-4"
                                    placeholder="Enter your email"
                                    required
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value
                                        })
                                    }
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control form-control-lg rounded-4"
                                    placeholder="Enter your password"
                                    required
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            password: e.target.value
                                        })
                                    }
                                />

                            </div>

                            <button
                                className="btn w-100 py-3 rounded-pill fw-semibold"
                                style={{
                                    backgroundColor: "#d9a679",
                                    color: "white",
                                    border: "none"
                                }}
                            >
                                Sign In ✨
                            </button>

                        </form>

                        <div className="text-center mt-4">

                            <small className="text-muted">
                                New here?
                            </small>

                            <Link
                                to="/register"
                                className="text-decoration-none fw-semibold ms-2"
                                style={{
                                    color: "#d9a679"
                                }}
                            >
                                Create Account
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;