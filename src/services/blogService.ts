import api from "../api/axios";

export const getBlogs = async () => {
    return await api.get("/Blog/myblogs");
};

export const getBlogById = async (
    id: number
) => {
    return await api.get(`/Blog/${id}`);
};

export const generateBlog = async (
    data: any
) => {
    return await api.post(
        "/Blog/generate",
        data
    );
};

export const regenerateBlog = async (
    blogRequestId: number
) => {
    return await api.post(
        `/Blog/regenerate/${blogRequestId}`
    );
};

export const deleteBlog = async (
    blogId: number
) => {
    return await api.delete(
        `/Blog/${blogId}`
    );
};