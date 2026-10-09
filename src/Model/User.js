const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender must be male, female or other");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is invalid");
            }
        }
    },
    about:{
        type:String,
        default:"Hey there! I am using this app.",
    },
    skills:{
        type:[String],
        validate(value) {
            if (value.length > 5) {
                throw new Error("You can add a maximum of 5 skills.");
            }
        }
    }
}, { timestamps: true });
const User=mongoose.model("User",userSchema);
module.exports=User;