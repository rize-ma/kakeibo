import { FC, useEffect } from "react";
import { Alert, Card, CardBody, Dialog, DialogBody, DialogHeader, Input, Textarea, Typography } from "@material-tailwind/react";
import { SegmentedControl, Select } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import { changeDate, changeFormInput, changeInputType, inputType, isExpenses, kakeibo, toggleCategoryData, voidFunction } from "../../../types";
import { Button } from "@material-tailwind/react";
import { moneyValidation } from "../../../utils/validation";
import kakeiboApi from "../../../api/kakeiboApi";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/ja";
import { formatDate, getNowDate } from "../../../utils/date";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

export const KakeiboDetails: FC = () => {
    const [inputType, setInputType] = useState<string>("expenses");
    const [money, setMoney] = useState<string>("");
    const [moneyErrText, setMoneyErrText] = useState<string>("")
    const [category, setCategory] = useState<string | null>("食費");
    const [toggleLabel, setToggleLabel] = useState<boolean>(false);
    const [dialog, setDialog] = useState<boolean>(false);
    const [date, setDate] = useState<string>(getNowDate());
    const [description, setDescription] = useState<string>("");
    const [serverErrText, setServerErrText] = useState<string>("");
    const [successText, setSuccessText] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);
    const navigate = useNavigate();
    let { state } = useLocation();
    const kakeiboId = state.some;

    const EXPENSES_DATA: Array<string> = ["食費","外食費","日用品","交通費","衣服","趣味","その他"];
    const INCOME_DATA: Array<string> = ["給料", "その他"];
    const INPUT_TYPE_DATA: inputType = [{label: "支出",value: "expenses"},{label: "収入",value: "income"}];
    
    const setKakeiboData = (kakeibo: kakeibo) => {
        const {expenses, money, category, description, date} = kakeibo;
        setInputType(expenses ? "expenses" : "income");
        setMoney(String(money));
        setCategory(category);
        setDate(date);
        setDescription(description);
    };
        
    const getKakeibo = async () => {
        const res = await kakeiboApi.getOne(kakeiboId);
        const kakeibo: kakeibo = res.data;
        setKakeiboData(kakeibo);
    };
    useEffect(() => {
        getKakeibo();
    }, []);

    const toggleEdit = () => {
        setEditing(!editing);
    };

    const changeCursor = () => {
        if(editing === true) return "cursor-pointer";
        if(editing === false) return "cursor-not-allowed";
        return "";
    }; 

    const toggleCategoryData: toggleCategoryData = () => {
        if(inputType === "expenses") {
        return EXPENSES_DATA;
        } 
        if(inputType === "income"){
        return INCOME_DATA;
        }
        return [""];
    };

    const changeInputType: changeInputType = (value:string) => {
        if(value === "expenses") {
        setInputType("expenses");
        setCategory("食費");
        }
        if(value === "income") {
        setInputType("income");
        setCategory("給料");
        }
    };

    const changemoney: changeFormInput = (e) => setMoney(e.target.value);
    const toggleLabelColor: voidFunction = () => setToggleLabel(!toggleLabel);
    const changeDescription: ChangeEventHandler<HTMLTextAreaElement> = (e) => setDescription(e.target.value);

    const isExpenses: isExpenses = () => {
        if (inputType === "expenses") {
        return true;
        }
        return false;
    };

    const resetReaponseText: voidFunction = () => {
        setServerErrText("");
        setSuccessText("");
    };

    const toggleDialog: voidFunction = () => {
        setDialog(!dialog);
    };

    const changeDate: changeDate = (date) => {
        const formatedDate = formatDate(date.toLocaleDateString());
        setDate(formatedDate);
        setDialog(false);
    }

    const restorePage: voidFunction = () => {
        
        navigate("/kakeibo/calender");
    }
    
    
    const updateKakeibo: voidFunction = async () => {
        const moneyValidationRes = moneyValidation(money);
        if(moneyValidationRes !== "") {
        setMoneyErrText(moneyValidationRes);
        return
        }; 
        const newMoney = Number(money);
        toggleEdit();
        
        try {
        await kakeiboApi.update(kakeiboId, {category,description, date, money: newMoney, expenses:isExpenses(), income: !isExpenses()});
        getKakeibo();
        setSuccessText("登録が完了しました");
        setTimeout(resetReaponseText,5000);
        } catch {
        setServerErrText("サーバーでエラーが発生しました。");
        };
    };

    const deleteKakeibo = async () => {
        try{
            await kakeiboApi.delete(kakeiboId);
            restorePage();
        } catch {
            setServerErrText("サーバーでエラーが発生しました")
        }
    }
    return (
        <div>
            <Card className="w-96 mb-8 relative mx-5">
                <CardBody className="flex flex-col items-center gap-4">
                    <Alert 
                    color="teal" 
                    animate={{
                    mount: { scale: 1, y: 0  },
                    unmount: { scale: 0, y: 25 },
                    }}
                    show={successText ? true : false}
                    dismissible={{
                    onClose: () => setSuccessText(""),
                    }}
                    >
                        {successText}
                    </Alert>
                    <Alert
                    color="red"  
                    animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                    }} 
                    show={serverErrText ? true : false}
                    dismissible={{
                    onClose: () => setServerErrText(""),
                    }}
                    >
                        {serverErrText}
                    </Alert>
                    <Typography variant="h3">
                        詳細
                    </Typography>
                    <div className="absolute top-1.5 right-1.5 cursor-pointer" onClick={deleteKakeibo}>
                        <DeleteIcon/>
                    </div>
                    <SegmentedControl
                    data = {INPUT_TYPE_DATA}
                    value={inputType}
                    onChange={changeInputType}
                    disabled={!editing}
                    className={changeCursor()}
                    size="lg"
                    radius={10}
                    transitionDuration={500}
                    color="orange"
                    />
                    <Alert className="p-2" color="red" show={moneyErrText ? true : false}>{moneyErrText}</Alert>
                    <Input label="金額" disabled={!editing} className={changeCursor()} size="lg" color="orange" type="number" onChange={changemoney} value={money}/>
                    <Select 
                    data={toggleCategoryData()}
                    disabled={!editing}
                    placeholder="カテゴリー" 
                    className="w-full" 
                    label="カテゴリー"
                    onChange={setCategory}
                    value={category}
                    onDropdownOpen={toggleLabelColor}
                    onDropdownClose={toggleLabelColor}
                    styles={{ label: { color: toggleLabel ? "orange" : "black" } }}
                    >
                    </Select>
                    <Input label="日付" disabled={!editing} className={changeCursor()} size="lg" color="orange" onClick={toggleDialog} value={date} />
                    <Dialog open={dialog} handler={setDialog} size="xs" className="flex flex-col items-center justify-center p-5 min-w-fit">
                        <div className="my-5">
                            <DialogHeader>日付を選択してください</DialogHeader>
                            <DialogBody>
                                <DatePicker 
                                locale="ja"
                                onChange={changeDate}
                                firstDayOfWeek={0}
                                className="w-full"
                                />
                            </DialogBody>
                        </div>
                    </Dialog>
                    <Textarea label="メモ" disabled={!editing} className={changeCursor()} color="orange" onChange={changeDescription} value={description}/>
                    <div className=" w-full flex justify-around">
                    <Button color="orange" onClick={restorePage}>戻る</Button>
                    {
                        !editing ? 
                        <Button color="orange" onClick={toggleEdit}>編集する</Button> :
                        <Button color="orange" onClick={updateKakeibo}>保存</Button>
                    }
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
