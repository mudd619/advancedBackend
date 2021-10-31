const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {type:String , required :true},
    price : {type :String , required : true},
})

const User = mongoose.model("product",userSchema)

module.exports = User