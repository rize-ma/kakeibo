import { formatDateType } from '../types';

export const formatDate: formatDateType = (date) => {
    const arrayDate = date.split("/");
    const formatDate = `${arrayDate[0]}年${arrayDate[1]}月${arrayDate[2]}日`;
    return formatDate;
}

export const getNowDate = () => {
    const nowDate = new Date().toLocaleDateString();
    const formatNowDate = formatDate(nowDate);
    return formatNowDate;
}
