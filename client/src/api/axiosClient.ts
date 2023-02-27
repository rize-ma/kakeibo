import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token")

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(async (config:any) => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}` 
        }
    }
});

axiosClient.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    throw err.response;
});

export default axiosClient
