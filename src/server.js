
const express = require("express");
const connect = require("./configs/db");

const userController = require("./controllers/userController");
const galleryController = require("./controllers/galaryController")

const app = express()
app.use(express.json());

app.use("/user",userController);
app.use("/gall",galleryController)



app.listen(2345,async ()=>{
    await connect()
    console.log("Listening to port 2345")
})