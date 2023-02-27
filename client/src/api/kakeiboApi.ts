import { kakeiboCreateParams, userLoginParams, userRegisterParams } from "../types";
import axiosClient from "./axiosClient";

const kakeiboApi = {
    create: (params : kakeiboCreateParams) =>axiosClient.post("kakeibo/create", params)
}

export default kakeiboApi