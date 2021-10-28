
const mongoose = require("mongoose");

const gallarySchema = new mongoose.Schema({
    photos : [{type:String ,required:true}],
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

const Gallery = mongoose.model("gallery",gallarySchema);

module.exports = Gallery