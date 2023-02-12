import { userRegisterParams } from "../types";
import axiosClient from "./axiosClient";

const authApi = {
    register: (params:userRegisterParams) => axiosClient.post("auth/register", params),
    //login: (params) => axiosClient.post("auth/login", params),
    verifyToken: () => axiosClient.post("auth/verify-token")
};

export default authApi