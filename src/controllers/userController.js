
var jwt = require('jsonwebtoken');
require("dotenv").config()

const User = require("../models/userModel");

const newToken = (user)=>{
    return jwt.sign({ user: user }, process.env.JSW_TOKEN_KEY);
}

const signup = async (req,res)=>{
    //find if the user exists and if exist ,return
    const exist = await User.findOne({email : req.body.email}).lean().exec();
    if(exist){
        return res.status(401).send("User already exists")
    }

    //create a user
    const user = await User.create(req.body);

    //create a token
    const token = newToken(user);

    //send the data
    res.send({user:user , token: token})
}


const login = async (req,res)=>{

    //find the user if doesnt exist then throw an error;
    try{
        const exist = await User.findOne({email : req.body.email}).exec();
        if(!exist){
            return res.status(401).send("User does not exist exists")
        }

        //check password;
        const match = exist.checkPassword(req.body.password); //return true or false
        if(!match){
            return res.status(401).send("Wrong Password");
        }

        //create a token
        const token = newToken(exist)

        //return the data;
        res.send({user:exist , token: token})
    }
    catch(err){
        res.send("something went wrong")
    }
}

module.exports = {signup,login}