import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

interface Blog {
    generatedBlogId: number;
    blogRequestId: number;
    title: string;
    contentPreview: string;
    category: string;
    audience: string;
    tone: string;
    generatedAt: string;
}

function Dashboard() {

    const navigate = useNavigate();

    const [blogs, setBlogs] =
        useState<Blog[]>([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        loadBlogs();

    }, []);

    const loadBlogs = async () => {

        try {

            const response =
                await API.get(
                    "/blog/myblogs"
                );

            setBlogs(response.data);

        } catch {

            alert(
                "Failed to load blogs"
            );
        }
    };

    const deleteBlog = async (
        id: number
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete this blog?"
            );

        if (!confirmDelete)
            return;

        try {

            await API.delete(
                `/blog/${id}`
            );

            loadBlogs();

        } catch {

            alert(
                "Delete failed"
            );
        }
    };

    const regenerateBlog = async (
        blogRequestId: number
    ) => {

        try {

            const response =
                await API.post(
                    `/blog/regenerate/${blogRequestId}`
                );

            navigate(
                `/blog/${response.data.generatedBlogId}`
            );

        } catch {

            alert(
                "Regeneration failed"
            );
        }
    };

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        navigate("/login");
    };

    const filteredBlogs =
        blogs.filter((blog) =>
            blog.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <div
            className="container-fluid py-5"
            style={{
                background: "#f8f4ef",
                minHeight: "100vh"
            }}
        >

            <div className="container">

                {/* Header */}

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-5">

                    <div>

                        <h1 className="fw-bold mb-2">
                            📖 My Writing Journal
                        </h1>

                        <p className="text-muted mb-0">
                            Your collection of AI-generated stories and ideas.
                        </p>

                    </div>

                    <div className="mt-3 mt-lg-0">

                        <button
                            className="btn me-2 px-4 py-2 rounded-pill"
                            style={{
                                backgroundColor: "#d9a679",
                                color: "white",
                                border: "none"
                            }}
                            onClick={() =>
                                navigate("/generate")
                            }
                        >
                            ✨ New Blog
                        </button>

                        <button
                            className="btn btn-outline-danger rounded-pill px-4 py-2"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* Search */}

                <div className="card border-0 shadow-sm rounded-5 mb-5">

                    <div className="card-body p-4">

                        <input
                            className="form-control form-control-lg rounded-4 border-0"
                            placeholder="🔍 Search your stories..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>

                {/* Empty State */}

                {filteredBlogs.length === 0 && (

                    <div className="text-center py-5">

                        <h3 className="mb-3">
                            ✨ No Blogs Found
                        </h3>

                        <p className="text-muted">
                            Start creating beautiful AI-powered content.
                        </p>

                    </div>

                )}

                {/* Blog Cards */}

                <div className="row g-4">

                    {filteredBlogs.map((blog) => (

                        <div
                            key={blog.generatedBlogId}
                            className="col-md-6 col-xl-4"
                        >

                            <div
                                className="card border-0 shadow-sm h-100 rounded-5"
                            >

                                <div className="card-body p-4">

                                    <span
                                        className="badge rounded-pill mb-3"
                                        style={{
                                            backgroundColor: "#f3e5d8",
                                            color: "#8b5e3c"
                                        }}
                                    >
                                        {blog.category}
                                    </span>

                                    <h4 className="fw-bold mb-3">
                                        {blog.title}
                                    </h4>

                                    <p
                                        className="text-muted"
                                        style={{
                                            minHeight: "90px"
                                        }}
                                    >
                                        {blog.contentPreview}
                                    </p>

                                    <div className="small text-muted mb-3">

                                        👥 {blog.audience}

                                        <br />

                                        🎨 {blog.tone}

                                        <br />

                                        📅 {new Date(
                                            blog.generatedAt
                                        ).toLocaleDateString()}

                                    </div>

                                </div>

                                <div className="card-footer bg-transparent border-0 p-4 pt-0">

                                    <div className="d-flex flex-wrap gap-2">

                                        <button
                                            className="btn btn-dark rounded-pill btn-sm"
                                            onClick={() =>
                                                navigate(
                                                    `/blog/${blog.generatedBlogId}`
                                                )
                                            }
                                        >
                                            Read
                                        </button>

                                        <button
                                            className="btn btn-outline-warning rounded-pill btn-sm"
                                            onClick={() =>
                                                regenerateBlog(
                                                    blog.blogRequestId
                                                )
                                            }
                                        >
                                            Regenerate
                                        </button>

                                        <button
                                            className="btn btn-outline-danger rounded-pill btn-sm"
                                            onClick={() =>
                                                deleteBlog(
                                                    blog.generatedBlogId
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;