const express=require("express");
const {connection}=require("./db")
const app=express()
const {userRouter}=require("./routes/user.route")
const {postRouter}=require("./routes/mediaPost.route")
app.use(express.json())

app.use("/users",userRouter)
// app.use("/posts",postRouter)
app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to db")
        console.log("server is running at 8080")
    } catch (error) {
        console.log({"msg":"error is in server"})
    }
    
})