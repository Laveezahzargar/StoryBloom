import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ViewBlog() {

    const { id } = useParams();

    const [blog, setBlog] = useState<any>(null);

    useEffect(() => {

        loadBlog();

    }, []);

    const loadBlog = async () => {

        try {

            const response =
                await API.get(`/blog/${id}`);

            setBlog(response.data);

        } catch {

            alert("Failed to load blog");
        }
    };

    const deleteBlog = async () => {

        if (
            !window.confirm(
                "Delete this blog?"
            )
        )
            return;

        await API.delete(`/blog/${id}`);

        window.history.back();
    };

    const regenerateBlog = async () => {

        try {

            const response =
                await API.post(
                    `/blog/regenerate/${blog.blogRequestId}`
                );

            setBlog(response.data);

        } catch {

            alert("Regeneration failed");
        }
    };

    if (!blog) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "100vh",
                    background: "#f8f4ef"
                }}
            >
                <div className="text-center">
                    <div
                        className="spinner-border mb-3"
                        role="status"
                    ></div>

                    <h5 className="text-muted">
                        Loading your story...
                    </h5>
                </div>
            </div>
        );
    }

    return (
        <div
            className="container-fluid py-5"
            style={{
                background: "#f8f4ef",
                minHeight: "100vh"
            }}
        >

            <div className="container">

                {/* Article Card */}

                <div
                    className="card border-0 shadow-lg rounded-5 mx-auto"
                    style={{
                        maxWidth: "900px",
                        background: "#fffdfb"
                    }}
                >

                    <div className="card-body p-4 p-md-5">

                        {/* Blog Badge */}

                        <div className="mb-4">

                            <span
                                className="badge rounded-pill px-3 py-2"
                                style={{
                                    backgroundColor: "#f3e5d8",
                                    color: "#8b5e3c"
                                }}
                            >
                                ✨ AI Generated Blog
                            </span>

                        </div>

                        {/* Title */}

                        <h1
                            className="fw-bold mb-4"
                            style={{
                                lineHeight: "1.3"
                            }}
                        >
                            {blog.title}
                        </h1>

                        {/* Meta */}

                        <div className="text-muted mb-5">

                            📖 Generated with AI

                            <span className="mx-2">•</span>

                            📝 Ready to publish

                        </div>

                        <hr className="mb-5" />

                        {/* Blog Content */}

                        <div
                            style={{
                                whiteSpace: "pre-wrap",
                                lineHeight: "2",
                                fontSize: "1.1rem"
                            }}
                        >
                            {blog.content}
                        </div>

                        <hr className="my-5" />

                        {/* Actions */}

                        <div className="d-flex flex-wrap gap-3">

                            <button
                                className="btn rounded-pill px-4"
                                style={{
                                    backgroundColor: "#d9a679",
                                    color: "white",
                                    border: "none"
                                }}
                                onClick={regenerateBlog}
                            >
                                🔄 Regenerate
                            </button>

                            <button
                                className="btn btn-outline-danger rounded-pill px-4"
                                onClick={deleteBlog}
                            >
                                🗑 Delete
                            </button>

                            <button
                                className="btn btn-dark rounded-pill px-4"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        blog.content
                                    )
                                }
                            >
                                📋 Copy Blog
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ViewBlog;