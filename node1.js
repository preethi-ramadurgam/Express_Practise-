const express=require("express");
const connectDB= require("./config/Database");
const app=express();
connectDB().then(()=>{
    console.log("The Database connection has been successful");
    app.listen(7777,()=>{
        console.log("The Server is Listening !!!");
    });
})
.catch((err)=>{
    console.log("The DB is not Connected",err);
});