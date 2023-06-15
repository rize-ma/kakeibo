import { FC, useEffect, useState } from "react";
import { DatePicker } from "@mantine/dates";
import { Table, Text, ScrollArea } from '@mantine/core';
import "dayjs/locale/ja";
import { changeDate, kakeibo } from "../../../types";
import { formatDate, getNowDate } from "../../../utils/date";
import kakeiboApi from "../../../api/kakeiboApi";
import { Link } from "react-router-dom";

export const Calender: FC = () => {
    const [searchDate, setSearchDate] = useState<string>(getNowDate());
    const [kakeiboData, setKakeiboData] = useState<Array<object> | any>([""]);
    const [expensesMoney, setExpensesMoney] = useState<number>(0);
    const [incomeMoney, setIncomeMoney] = useState<number>(0);
    const [totalMoney, setTotalMoney] = useState<number>(0);

    useEffect(() => {
        setExpensesMoney(0);
        setIncomeMoney(0);
        setTotalMoney(0);
        let totalExpenses = 0;
        let totalIncome = 0;
        let totalMoney = 0;
        kakeiboData.map((kakeibo: kakeibo) => {
            if(kakeibo.expenses === true) {
                totalMoney = totalMoney - kakeibo.money;
                totalExpenses = totalExpenses + kakeibo.money;
            }
            if(kakeibo.income === true) {
                totalMoney = totalMoney + kakeibo.money;
                totalIncome = totalIncome + kakeibo.money;
            }
        });
        setExpensesMoney(totalExpenses);
        setIncomeMoney(totalIncome);
        setTotalMoney(totalMoney);
    },[kakeiboData]);

    const isExpenses = (expenses: boolean) => {
        if(expenses === true) return "支出";
        if(expenses === false) return "収入";
        return "";
    }

    const changeDate: changeDate = async (date) => {
        const formatedDate = formatDate(date.toLocaleDateString());
        setSearchDate(formatedDate);
        const kakeibo = await kakeiboApi.DateSearch(formatedDate);
        setKakeiboData(kakeibo.data.kakeiboData);
    }


    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-lg font-medium">
                登録した日付を選択してください
            </div>
            <div className="my-2">
                <DatePicker 
                    locale="ja"
                    onChange={changeDate}
                    size="xl"
                    firstDayOfWeek={0}
                />
            </div>
            <div className="flex justify-around w-full border-y-2 border-orange-600">
                <div>
                    <p>支出</p>
                    <p>{expensesMoney}円</p>
                </div>
                <div>
                    <p>収入</p>
                    <p>{incomeMoney}円</p>
                </div>
                <div>
                    <p>合計</p>
                    <p>{totalMoney}円</p>
                </div>
            </div>
            <div className="w-11/12 flex flex-col items-center">
                <ScrollArea className="w-full">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    <p className="text-orange-400">支出/収入</p>
                                </th>
                                <th>
                                    <p className="text-orange-400">カテゴリー</p> 
                                </th>
                                <th>
                                    <p className="text-orange-400">円</p> 
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {kakeiboData.map((kakeibo: kakeibo) => (
                                <tr key={kakeibo._id}>
                                    <td>
                                        <p>{isExpenses(kakeibo.expenses)}</p>
                                    </td>
                                    <td>
                                        <p>{kakeibo.category}</p>
                                    </td>
                                    <td>
                                        <p>{kakeibo.money}</p>
                                    </td>
                                    <td>
                                        {kakeibo._id ? 
                                        (<Link to={kakeibo._id} state={{ some: kakeibo._id }} style={{color: "blue"}}>詳細</Link>)
                                        : ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ScrollArea>
            </div>
        </div>
    )
}