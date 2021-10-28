
const express = require("express");
const User = require("../models/userModel");
const fs = require("fs")

const router = express.Router();
const upload = require("../middleware/fileUpload")

router.post("/",upload.single("profile_pic"),async(req,res)=>{
    try{
        //console.log(req.file,req.body)
        //res.send(req.body,req.files)
        const user = await User.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            profile_pic : req.file.path
        })
        res.send(user)
    }
    catch(err){
        fs.unlinkSync(req.file.path)
        res.status(400).send(err.message)
    }
})

router.get("/",async(req,res)=>{
    try{
        const user = await User.find({}).lean().exec()
        res.send(user)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


router.patch("/:id",upload.single("profile_pic"),async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        
        if(req.file !== undefined){
            fs.unlinkSync(user._doc.profile_pic);
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{...req.body,profile_pic:req.file.path});
            res.send("Updated");
            return
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body);
        res.send("Updated")
    }
    catch(err){
        fs.unlinkSync(req.file.path);
        res.status(400).json(err.message)
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        fs.unlinkSync(user.profile_pic)
        res.send("Deleted")
    }
    catch(err){
        res.send(err.message)
    }
})

module.exports = router