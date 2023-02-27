import { Alert, Card, CardBody, Input, Tab, Tabs, TabsHeader, Textarea, Typography } from "@material-tailwind/react";
import { SegmentedControl, Select } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import { changeFormInput } from "../../../types";
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

  const changemoney: changeFormInput = (e) => setMoney(e.target.value);
  const toggleLabelColor = () => setToggleLabel(!toggleLabel);
  const changeDescription: ChangeEventHandler<HTMLTextAreaElement> = (e) => setDescription(e.target.value);

  const isExpenses = () => {
    if (inputType === "expenses") {
      return true;
    }
    return false;
  };
  const createKakeibo = async () => {
    setMoneyErrText(moneyValidation(money));
    if(moneyErrText) return ;
    const newMoney = Number(money);
    
    try {
      await kakeiboApi.create({category,description, money: newMoney, expenses:isExpenses(), income: !isExpenses()});
      setInputType("expenses");
      setCategory("食費");
      setMoney("");
      setDescription("");
      setSuccessText("登録が完了しました");
    } catch {
      setServerErrText("サーバーでエラーが発生しました。");
    }
  }
  return (
    <div>
      <Card className="w-96 mb-8 ">
                <CardBody className="flex flex-col items-center gap-4">
                <Alert className="p-2" color="teal" show={successText ? true : false}>{successText}</Alert>
                <Alert className="p-2" color="red" show={serverErrText ? true : false}>{serverErrText}</Alert>
                  <Typography variant="h3">
                      入力
                  </Typography>
                  <SegmentedControl
                  data = {[
                    {
                      label: "支出",
                      value: "expenses"
                    },
                    {
                      label: "収入",
                      value: "income"
                    }
                  ]}
                  value={inputType}
                  onChange={setInputType}
                  size="lg"
                  radius={10}
                  transitionDuration={500}
                  color="orange"
                  />
                    <Alert className="p-2" color="red" show={moneyErrText ? true : false}>{moneyErrText}</Alert>
                    <Input label="金額" size="lg" color="orange" type="number" onChange={changemoney} value={money}/>
                    <Select 
                    data={["食費","外食費","日用品","交通費","衣服","趣味","その他"]} 
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
