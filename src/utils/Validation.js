const validator = require("validator");
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password,age,gender,photoUrl,about,skills}=req.body;
    if(!firstName || !emailId || !password){
        return {isValid:false,message:"First Name, Email and Password are required"};
    }
    else if(firstName.length<5 || firstName.length>20){
        return {isValid:false,message:"First Name must be between 5 and 20 characters"};
    }
    else if(!validator.isEmail(emailId)){
        return {isValid:false,message:"Email is invalid"};
    }
    else if(!validator.isStrongPassword(password)){
        return {isValid:false,message:"Password is not strong enough"};
        //this could also be used for this and above as well 
        // throw new Error("Password is not strong enough");
    }
}
module.exports={validateSignUpData};