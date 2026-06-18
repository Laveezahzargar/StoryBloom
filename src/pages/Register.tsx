import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            await API.post(
                "/auth/register",
                form
            );

            alert("Registration Successful");

            navigate("/login");

        } catch (error: any) {

            alert(
                error.response?.data ||
                "Registration Failed"
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
                                ✨ Create Account
                            </h1>

                            <p className="text-muted">
                                Begin your blogging journey and turn your ideas into beautiful stories.
                            </p>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Full Name
                                </label>

                                <input
                                    className="form-control form-control-lg rounded-4"
                                    placeholder="Enter your name"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value
                                        })
                                    }
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Email Address
                                </label>

                                <input
                                    className="form-control form-control-lg rounded-4"
                                    placeholder="Enter your email"
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
                                    placeholder="Create a password"
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
                                Create Account ✨
                            </button>

                        </form>

                        <div className="text-center mt-4">

                            <small className="text-muted">
                                Already have an account?
                            </small>

                            <button
                                type="button"
                                className="btn btn-link text-decoration-none fw-semibold"
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );

}

export default Register;