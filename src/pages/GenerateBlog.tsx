import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function GenerateBlog() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [blog, setBlog] = useState({
        category: "",
        topic: "",
        audience: "",
        tone: "",
        wordCount: 500
    });

    const generateBlog = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await API.post(
                "/blog/generate",
                blog
            );

            navigate(
                `/blog/${response.data.generatedBlogId}`
            );

        } catch (error) {

            alert("Failed to generate blog");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div
            className="container-fluid py-5"
            style={{
                background: "#f8f4ef",
                minHeight: "100vh"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div
                            className="card border-0 shadow-lg rounded-5"
                            style={{
                                background: "#fffdfb"
                            }}
                        >

                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-5">

                                    <h1 className="fw-bold mb-3">
                                        ✨ Create Your Next Story
                                    </h1>

                                    <p className="text-muted">
                                        Let AI transform your ideas into engaging, professional blogs.
                                    </p>

                                </div>

                                <form onSubmit={generateBlog}>

                                    {/* Category */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            📂 Category
                                        </label>

                                        <select
                                            className="form-select form-select-lg rounded-4"
                                            value={blog.category}
                                            onChange={(e) =>
                                                setBlog({
                                                    ...blog,
                                                    category: e.target.value
                                                })
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Category
                                            </option>

                                            <option value="Technology">
                                                Technology
                                            </option>

                                            <option value="Health">
                                                Health
                                            </option>

                                            <option value="Travel">
                                                Travel
                                            </option>

                                            <option value="Business">
                                                Business
                                            </option>

                                            <option value="Education">
                                                Education
                                            </option>

                                            <option value="Finance">
                                                Finance
                                            </option>

                                        </select>

                                    </div>

                                    {/* Topic */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            💡 Blog Topic
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg rounded-4"
                                            placeholder="e.g. Future of Artificial Intelligence"
                                            value={blog.topic}
                                            onChange={(e) =>
                                                setBlog({
                                                    ...blog,
                                                    topic: e.target.value
                                                })
                                            }
                                            required
                                        />

                                    </div>

                                    {/* Audience */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            👥 Target Audience
                                        </label>

                                        <select
                                            className="form-select form-select-lg rounded-4"
                                            value={blog.audience}
                                            onChange={(e) =>
                                                setBlog({
                                                    ...blog,
                                                    audience: e.target.value
                                                })
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Audience
                                            </option>

                                            <option value="Beginners">
                                                Beginners
                                            </option>

                                            <option value="Students">
                                                Students
                                            </option>

                                            <option value="Developers">
                                                Developers
                                            </option>

                                            <option value="Professionals">
                                                Professionals
                                            </option>

                                            <option value="General Public">
                                                General Public
                                            </option>

                                        </select>

                                    </div>

                                    {/* Tone */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            🎨 Writing Tone
                                        </label>

                                        <select
                                            className="form-select form-select-lg rounded-4"
                                            value={blog.tone}
                                            onChange={(e) =>
                                                setBlog({
                                                    ...blog,
                                                    tone: e.target.value
                                                })
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Tone
                                            </option>

                                            <option value="Professional">
                                                Professional
                                            </option>

                                            <option value="Friendly">
                                                Friendly
                                            </option>

                                            <option value="Formal">
                                                Formal
                                            </option>

                                            <option value="Conversational">
                                                Conversational
                                            </option>

                                            <option value="Persuasive">
                                                Persuasive
                                            </option>

                                        </select>

                                    </div>

                                    {/* Word Count */}

                                    <div className="mb-5">

                                        <label className="form-label fw-semibold">
                                            📝 Word Count
                                        </label>

                                        <select
                                            className="form-select form-select-lg rounded-4"
                                            value={blog.wordCount}
                                            onChange={(e) =>
                                                setBlog({
                                                    ...blog,
                                                    wordCount: Number(
                                                        e.target.value
                                                    )
                                                })
                                            }
                                        >
                                            <option value={300}>
                                                300 Words
                                            </option>

                                            <option value={500}>
                                                500 Words
                                            </option>

                                            <option value={800}>
                                                800 Words
                                            </option>

                                            <option value={1000}>
                                                1000 Words
                                            </option>

                                            <option value={1500}>
                                                1500 Words
                                            </option>

                                        </select>

                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn w-100 py-3 rounded-pill fw-semibold"
                                        style={{
                                            backgroundColor: "#d9a679",
                                            color: "white",
                                            border: "none"
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                ></span>

                                                Creating Your Story...
                                            </>
                                        ) : (
                                            "✨ Generate Blog"
                                        )}
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default GenerateBlog;