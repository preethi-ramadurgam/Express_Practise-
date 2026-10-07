const express = require("express");
const connectDB = require("./config/Database");
const User = require("./Model/User");
const app = express();
// To convert json data to js object 
app.use(express.json());
//find a User with this emailId in DB
app.get("/user", async (req, res) => {
    try {
        // const userEmail=req.body.emailId;
        // //user is an array 
        // const user= await User.find({emailId:userEmail});
        // console.log("User",user);
        // if(user.length===0){
        //     res.status(404).send("User not found");
        //     return;
        // }else{
        //     res.send(user);
        // }
        const userEmail=req.body.emailId;
        const user= await User.findOne({emailId:userEmail});
        if(!user){
            res.status(404).send("User not found");
            return;
        }else{
            res.send(user);
        }
    } catch (err) {
        res.status(500).send("There is an Error: " + err.message);
    }
});
// This is for the feed 
app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(500).send("There is an Error: " + err.message);
    }
})
app.post("/signup", async (req, res) => {
    console.log("Request", req.body);

    const user = new User(req.body);

    try {
        await user.save();
        res.send("User has been added successfully");
    } catch (err) {
        res.status(400).send("There is an Error: " + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("The Database connection has been successful");
        app.listen(7777, () => {
            console.log("The Server is Listening !!!");
        });
    })
    .catch((err) => {
        console.log("The DB is not Connected", err);
    });