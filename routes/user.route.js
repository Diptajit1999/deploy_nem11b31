const express=require("express");

const {UserModel}=require("../models/user.model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {username,email,gender,pass}=req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
            // Store hash in your password DB.

            if(err){
                res.status(200).send({error:err})
            }else{
            const user=new UserModel({username,email,gender,pass:hash})
            await user.save()
            res.status(200).send({"msg":"user is sucessfully registered"})
            }
        });
    } catch (error) {
        res.status(400).send({"msg":"registration problem in /register"})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.findOne({email})
        bcrypt.compare(pass, user.pass, async(err, result)=> {
            // result == true
            if(result){
                const token=jwt.sign({userID:user._id,username:user.username},"masai")
                res.status(200).send({"msg":"Login is success","token":token})
            }else{
                res.status(200).send({"msg":"Wrong credentials..."})
            }
        });
    } catch (error) {
        res.status(400).send({"msg":"login problem"})
    }
})

module.exports={
    userRouter
}