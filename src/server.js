
const express = require("express");
const connect = require("./configs/db")
const userController = require("./controllers/userController")

const app = express();

app.use(express.json());

app.use("/user",userController)



app.listen(3456,async()=>{
    await connect()
    console.log("Listening to port 3456")
})