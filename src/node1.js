const express = require("express");
const connectDB = require("./config/Database");
const User = require("./Model/User");
const app = express();
const { validateSignUpData } = require("./utils/Validation");
const bcrypt = require("bcrypt");

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
//this is to post the data to the DB
app.post("/signup", async (req, res) => {
    try {
        //Step 1: Validation of Data  
        const validation = validateSignUpData(req);
        //Step 2: Hash the password
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHashed = await bcrypt.hash(password, 10);
        console.log("Password Hashed", passwordHashed);
        console.log("Request", req.body);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHashed,
        });
        await user.save();
        res.send("User has been added successfully");
    } catch (err) {
        res.status(400).send("There is an Error: " + err.message);
    }
});
//this is to login the user 
app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});   
        if(!user){
            throw new Error("Email not found");
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            throw new Error("Invalid Password");
        }
        res.send("Login successful");
    }catch(err){
        res.status(500).send("There is an Error: " + err.message);
    }
})
//this is to delete the data from the DB
app.delete("/user", async (req, res) => {
    const userId=req.body.userId;
    try {
        //const user = await User.findByIdAndDelete({userId });
        const user = await User.findByIdAndDelete({ "_id": userId });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.send("User has been deleted successfully");
    } catch (err) {
        res.status(500).send("There is an Error: " + err.message);
    }
});
app.patch("/user/:userId", async (req, res) => {
    const userId=req.params?.userId;
    const updateData=req.body;
    try {
        const ALLOWED_UPDATES=["age","gender","photoUrl","about","skills"];
        // Filter the updateData to only include allowed updates
        const isUpdateAllowed = Object.keys(updateData).every((key) => ALLOWED_UPDATES.includes(key));
        if (!isUpdateAllowed) {
            res.status(400).send("Invalid updates. Only age, gender, photoUrl, about, and skills can be updated.");
            return;
        }
        // if(updateData.skills.length>10){
        //     throw new Error("You can add a maximum of 10 skills.");
        // }
        const user = await User.findByIdAndUpdate({ "_id": userId }, updateData,{returnDocument: 'after', runValidators:true});
        // console.log("Updated User",user);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }else{
            res.send("User has been updated successfully");
        }
    } catch (err) {
        res.status(500).send("There is an Error: " + err.message);
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