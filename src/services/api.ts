import axios from "axios";

const API = axios.create({
    baseURL: "https://storybloom-backend-zm26.onrender.com/api" // your backend URL
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;








//baseurl: "http:||localhost:5238/api"