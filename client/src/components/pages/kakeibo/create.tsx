import { Alert, Card, CardBody, Input, Textarea, Typography } from "@material-tailwind/react";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { SegmentedControl, Select } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import { changeFormInput, changeInputType, inputType, isExpenses, toggleCategoryData, voidFunction } from "../../../types";
import { Button } from "@material-tailwind/react";
import { moneyValidation } from "../../../utils/validation";
import kakeiboApi from "../../../api/kakeiboApi";

const Kakeibo = () => {
  const [inputType, setInputType] = useState<string>("expenses");
  const [money, setMoney] = useState<string>("");
  const [moneyErrText, setMoneyErrText] = useState<string>("")
  const [category, setCategory] = useState<string | null>("食費");
  const [toggleLabel, setToggleLabel] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [serverErrText, setServerErrText] = useState<string>("");
  const [successText, setSuccessText] = useState<string>("");

  const EXPENSES_DATA: Array<string> = ["食費","外食費","日用品","交通費","衣服","趣味","その他"];
  const INCOME_DATA: Array<string> = ["給料", "その他"];
  const INPUT_TYPE_DATA: inputType = [{label: "支出",value: "expenses"},{label: "収入",value: "income"}];

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
  
  const createKakeibo: voidFunction = async () => {
    const moneyValidationRes = moneyValidation(money);
    if(moneyValidationRes !== "") {
      setMoneyErrText(moneyValidationRes);
      return
    }; 
    const newMoney = Number(money);
    
    try {
      await kakeiboApi.create({category,description, money: newMoney, expenses:isExpenses(), income: !isExpenses()});
      setCategory("食費");
      setMoney("");
      setDescription("");
      setSuccessText("登録が完了しました");
      setTimeout(resetReaponseText,5000);
    } catch {
      setServerErrText("サーバーでエラーが発生しました。");
    }
  }
  return (
    <div>
      <Card className="w-96 mb-8 ">
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
                      入力
                      <ModeEditOutlineIcon className="ml-2"/>
                  </Typography>
                  <SegmentedControl
                  data = {INPUT_TYPE_DATA}
                  value={inputType}
                  onChange={changeInputType}
                  size="lg"
                  radius={10}
                  transitionDuration={500}
                  color="orange"
                  />
                    <Alert className="p-2" color="red" show={moneyErrText ? true : false}>{moneyErrText}</Alert>
                    <Input label="金額" size="lg" color="orange" type="number" onChange={changemoney} value={money}/>
                    <Select 
                    data={toggleCategoryData()} 
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
                    <Textarea label="メモ" color="orange" onChange={changeDescription}/>
                    <Button color="orange" onClick={createKakeibo}>保存</Button>
                </CardBody>
            </Card>
    </div>
  )
}

export default Kakeibo
