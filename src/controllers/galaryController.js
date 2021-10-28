

const express = require("express");
const upload = require("../middleware/fileUpload");
const Gallery = require("../models/gallaryModel");
const fs = require("fs");
const { createSecretKey } = require("crypto");

const router = express.Router();

router.post("/",upload.array("photos",5),async (req,res)=>{
    try{
        const pics = req.files.map((el)=>{
            return el.path
        })
       
        const gallery = await Gallery.create({
            photos : pics,
            user : req.body.user
        })
        res.send(gallery)
    }
    catch(err){
        req.files.map((el)=>{
            fs.unlinkSync(el.path)
        })
        res.send(err.message)
    }
})

router.get("/",async (req,res)=>{
    try{
        const gallery = await Gallery.find().lean().exec()
        res.send(gallery)
    }
    catch(err){
        res.send(err.message)
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const gallery = await Gallery.findById(req.params.id);
        await Gallery.findByIdAndDelete(req.params.id)
        gallery.photos.map((el)=>{
            fs.unlinkSync(el)
        })
        res.send("Deleted")
    }
    catch(err){
        res.send(err.message)
    }
})


module.exports = router