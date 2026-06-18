import api from "../api/axios";

export const register = async (
    name: string,
    email: string,
    password: string
) => {

    return await api.post("/Auth/register", {
        name,
        email,
        password
    });
};

export const login = async (
    email: string,
    password: string
) => {

    const response = await api.post("/Auth/login", {
        email,
        password
    });

    localStorage.setItem(
        "token",
        response.data.token
    );

    return response;
};