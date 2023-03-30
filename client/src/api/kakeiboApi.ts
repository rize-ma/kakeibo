import { kakeiboParams} from "../types";
import axiosClient from "./axiosClient";

const kakeiboApi = {
    create: (params: kakeiboParams) => axiosClient.post("kakeibo/create", params),
    DateSearch: (date: string) => axiosClient.get(`kakeibo/calender/${date}`),
    getOne: (kakeiboId: string) => axiosClient.get(`kakeibo/details/${kakeiboId}`),
    update: (kakeiboId: string, params: kakeiboParams) => axiosClient.put(`kakeibo/details/${kakeiboId}`, params),
    getMonth: (nowYearMonth: string) => axiosClient.get(`kakeibo/graph/${nowYearMonth}`)
}

export default kakeiboApi