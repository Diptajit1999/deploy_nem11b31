const express=require("express");

const {MediaModel}=require("../models/Post.model");
// const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");

const MediaRouter=express.Router();

const {auth}=require("../middleware/auth.middleware")

MediaRouter.get("/",auth,async(req,res)=>{
    // const devicequery=req.query
    try {
        const posts=await MediaModel.find({userID:req.body.userID})
        res.status(200).send({"msg":"all device get "})

    } catch (error) {
        res.status(400).send({"msg":"no devices get "})
    }


})

MediaRouter.post("/create",auth,async(req,res)=>{
    // const 
    try {
        const posts=await MediaModel(req.body);
        res.status(200).send({"msg":"a new device gets posted "})
        await posts.save()
    } catch (error) {
        res.status(400).send({"msg":"no devices get posted "})
    }


})
MediaRouter.patch("/update/:noteID",auth,async(req,res)=>{
    const {postID}=req.params
    try {
        const posts=await MediaModel.find({_id:postID});
        if(req.body.userID===postID.userID){
            await MediaModel.findByIdAndUpdate({_id:postID});
            res.status(200).send({"msg":"a new device gets posted "})
        }else{
            res.status(400).send({"msg":"no devices get patched "})
        }
        
        
    } catch (error) {
        res.status(400).send({"msg":"no devices get posted "})
    }


})

module.exports={
    MediaRouter
}

