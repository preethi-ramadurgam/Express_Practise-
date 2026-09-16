const mongoose = require("mongoose");
const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://preethiramadurgam_db_user:juMUvDT2ko57FevZ@cluster0.gwyd6gc.mongodb.net/");
};
module.exports=connectDB;