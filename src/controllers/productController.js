
const express = require("express");


const User = require("../models/productModel");
const middleware = require("../authorization/middleware")

const router = express.Router();

router.post("/",async(req,res)=>{
    try{
        const user = await User.create(req.body)
        res.send(user)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

router.get("/",middleware,async(req,res)=>{
    try{
        const user = await User.find({}).lean().exec()
        res.send(user)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = router