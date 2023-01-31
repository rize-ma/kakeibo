const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();
app.use(express.json());


try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL);
    console.log("接続");
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log("ローカルサーバー起動中");
})