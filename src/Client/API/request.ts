import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

const getRequest = async (url: string) => {
    const response = await api.get(url);
    return response.data;
}

const postRequest = async (url: string, data:any) => {
    const response = await api.post(url, data);
    return response.data;
}

export { getRequest, postRequest };