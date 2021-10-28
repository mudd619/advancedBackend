
const express = require("express");
const {body,validationResult} = require("express-validator")

const router = express.Router();



router.post("/",body("first_name").notEmpty().withMessage("First Name is required")
    ,body("last_name").notEmpty().withMessage("Last Name is required")
    ,body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is incorrect")
    ,body("pincode").notEmpty().withMessage("Pincode is required").isLength({min:6,max:6}).withMessage("Invalid Pincode")
    ,body("age").notEmpty().withMessage("Age is required").custom((value)=>{
        if(value >=1 && value <=100){
            return true
        }
        throw new Error ("Age written is invalid")
    })
    ,body("gender").notEmpty().withMessage("Gender is required").custom((value)=>{
        if(value.toLowerCase() === "male" || value.toLowerCase() === "female" || value.toLowerCase() === "others"){
            return true
        }
        throw new Error ("Gender is invalid")
    }).withMessage("Gender is invalid")  
    ,async(req,res)=>{
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(errors.array())
        }
        res.send("Posted")
        
    })

    

router.get("/",async(req,res)=>{
    try{
        res.send("get")
    }
    catch(err){
        res.send(err.message)
    }
})

module.exports = router