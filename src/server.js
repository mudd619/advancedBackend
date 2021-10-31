const express = require("express");
const connect = require("./configs/db");
const {signup , login} = require("./controllers/userController");
const productController = require("./controllers/productController")

const app = express();

app.use(express.json());

app.use("/signup",signup);

app.use("/login",login);
app.use("/product",productController)


app.listen(1234,async(req,res)=>{
    await connect()
    console.log("Listening to port 1234")
})