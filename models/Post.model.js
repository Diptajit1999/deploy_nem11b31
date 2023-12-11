const mongoose=require("mongoose");

const mediaSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String,
    username:String

},{
    versionKey:false
})

const MediaModel=mongoose.model("post",mediaSchema)

module.exports={
    MediaModel
}