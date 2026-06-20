import axios from "axios";

const api = axios.create({
    baseURL: "https://storybloom-backend-zm26.onrender.com/api"
});

api.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;













// http:||localhost:5238/api