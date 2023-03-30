import { FC, useEffect, useState } from "react";
import { getMonth, getYear } from "../../../utils/date";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import kakeiboApi from "../../../api/kakeiboApi";
import { categoryTypeData, changeCategoryType, formatedYearMonth, getMonthData, graphDataType, kakeibo } from "../../../types";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { SegmentedControl } from "@mantine/core";

export const Graph: FC = () => {
    const [year, setYear] = useState<number>(getYear());
    const [month, setMonth] = useState<number>(getMonth());
    const [monthData, setMonthData] = useState<Array<object> | any>([""]);
    const [categoryType, setCategoryType] = useState<string>("expenses");
    //const [totalMonthMoney, setTotalMonthMoney] = useState<number>(0);

    const CATEGORY_TYPE_DATA: categoryTypeData = [{label: "支出",value: "expenses"},{label: "収入",value: "income"}];
    const COLORS: Array<string> = ["#2e8b57", "#ffff00", "#1e90ff", "#db7093", "#808080", "#d2691e", "#dc143c", "#483d8b"];

    let graphData: Array<graphDataType> = [{name: "", value: 0}];

    let expensesGraphData: Array<graphDataType> = [
        {name: "食費", value: 0},
        {name: "外食費", value: 0},
        {name: "日用品", value: 0},
        {name: "交通費", value: 0},
        {name: "衣服", value: 0},
        {name: "趣味", value: 0},
        {name: "その他", value: 0}
    ];
    let incomeGraphData: Array<graphDataType> = [{name: "給料", value: 0}, {name: "その他", value: 0}];

    useEffect(() => {
        getMonthData(year, month);
    },[])

    const addGraphData = () => {
        if (monthData.length === 0) return;
        if(categoryType === "expenses") {
            graphData = expensesGraphData;
        } 
        if(categoryType === "income") {
            graphData = incomeGraphData;
        }
        monthData.map((kakeibo: kakeibo) => {
            graphData.map((data: graphDataType) => {
                if(data.name === kakeibo.category) data.value = data.value + kakeibo.money;
            });
        });
        graphData = graphData.filter((data: graphDataType) => data.value !== 0)
    };
    addGraphData();

    const calculateTotalMoney = () => {
        let totalMoney = 0;
        monthData.map((kakeibo: kakeibo) => {
            if(categoryType === "expenses" && kakeibo.expenses === true) {
                totalMoney = totalMoney + kakeibo.money;
            }
            if(categoryType === "income" && kakeibo.income === true) {
                totalMoney = totalMoney + kakeibo.money;
            }
        });
        return totalMoney;
    };
    

    const renderLabel = ({ name }: any) => {
        return name;
    };

    const nextMonth = () => {
        let nowYear = year;
        let nowMonth = month;

        if(month === 12) {
            nowYear = year + 1;
            nowMonth = 1;
            getMonthData(nowYear, nowMonth);
            setYear(nowYear);
            setMonth(nowMonth);
        } else {
            nowMonth = month + 1;
            getMonthData(nowYear, nowMonth);
            setMonth(month + 1);
        }
    };

    const lastMonth = () => {
        let nowYear = year;
        let nowMonth = month;

        if(month === 1) {
            nowYear = year - 1;
            nowMonth = 12;
            getMonthData(nowYear, nowMonth);
            setYear(nowYear);
            setMonth(nowMonth);
        } else {
            nowMonth = month - 1;
            getMonthData(nowYear, nowMonth);
            setMonth(nowMonth);
        }
    };

    const changeInputType: changeCategoryType = (value:string) => {
        if(value === "expenses") {
            setCategoryType("expenses");
        }
        if(value === "income") {
            setCategoryType("income");
        }
    };

    const getMonthData: getMonthData = async (nowYear, nowMonth) => {
        const nowYearMonth = formatedYearMonth(nowYear, nowMonth);
        const res = await kakeiboApi.getMonth(nowYearMonth);
        setMonthData(res.data);
    };

    const formatedYearMonth: formatedYearMonth = (nowYear, nowMonth) => {
        return `${nowYear}年${nowMonth}月`;
    };

    // const showBreakdown = () => {
    //     if(categoryType === "expenses") {

    //     }
    // }
    
    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center">
                <div className="flex">
                    <ArrowBackIosNewIcon fontSize="large" className="text-orange-600 cursor-pointer" onClick={lastMonth}/>
                    <div className="flex items-center">
                        <span className="text-lg ml-5 mr-3 font-bold">{year}年</span>
                        <span className="text-lg ml-3 mr-5 font-bold">{month}月</span>
                    </div>
                    <ArrowForwardIosIcon fontSize="large" className="text-orange-600 cursor-pointer" onClick={nextMonth}/>
                </div>
                <div className="mt-7">
                    <SegmentedControl
                        data = {CATEGORY_TYPE_DATA}
                        value={categoryType}
                        onChange={changeInputType}
                        size="lg"
                        radius={10}
                        transitionDuration={500}
                        color="orange"
                    />
                </div>
            </div>
            <div className="relative flex flex-col justify-center items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
                    <p className="font-bold">データがありません</p>
                </div>
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={graphData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            isAnimationActive={false}
                            outerRadius={100}
                            fill="#8884d8"
                            nameKey="name"
                            dataKey="value"
                            label={renderLabel}
                        >
                            {graphData.map((data: object, index: number) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                                ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>
            <div className="flex justify-around w-full border-y-2 border-orange-600">
                <div className="my-2">
                    <p className="text-xl">合計</p>
                </div>
                <div className="my-2">
                    <p className="text-xl">{calculateTotalMoney()}円</p>
                </div>
            </div>
            <div className="w-full my-5">
                {graphData.map((data: graphDataType) => (
                    <div className="flex justify-around my-2 border-b-2 border-gray-300">
                        <p>{data.name}</p>
                        <p>{data.value}円</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

