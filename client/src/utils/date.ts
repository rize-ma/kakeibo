import { formatDateType, getMonthType, getNowDateType, getYearType } from '../types';

export const formatDate: formatDateType = (date) => {
    const arrayDate = date.split("/");
    const formatDate = `${arrayDate[0]}年${arrayDate[1]}月${arrayDate[2]}日`;
    return formatDate;
};

export const getNowDate: getNowDateType = () => {
    const nowDate = new Date().toLocaleDateString();
    const formatNowDate = formatDate(nowDate);
    return formatNowDate;
};

export const getYear: getYearType = () => {
    const date = new Date();
    const year = date.getFullYear();
    return year;
};

export const getMonth: getMonthType = () => {
    const date = new Date();
    const month = date.getMonth() + 1 ;
    return month;
};
