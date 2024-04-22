import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { generateotp } from "../utils/codeGenerator.js";
import { sendEmail } from "../utils/sendmail.js";


const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    console.log(`${username},${email},${password}`);
    if(email===""){
        throw new ApiError(400,"Email is required");
    }
    if(password===""){
        throw new ApiError(400,"password is required");
    }
    const existeduser = await User.findOne({
       email,
       isVerified:"true"
    })
    //console.log(existeduser);
    if(existeduser){
        throw new ApiError(409,"user already existed.")
    }
    const edoc=generateotp();
    const emailExist= await User.findOne({email})
    
    let savedUser;
    if(emailExist){
        emailExist.password=password;
        emailExist.verifyCode=edoc;
        emailExist.isVerified=false;
        savedUser=await emailExist.save();
       
    }
    else{
    const user =new User({
        username: username || "",
        email,
        password,
        isVerified: false,
        verifyCode: edoc
    })
     savedUser=await user.save();
    
}

    const mail= await sendEmail(email,"verify",edoc);

    const created=await User.findById(savedUser._id).select("-password");
    
    
    if(!created){
        throw new ApiError(500,"something went wrong on server.")
    }
    else{
       console.log(`new user created ${created}`);
    }

    return res.status(201).json(created);
})


const loginUser=asyncHandler(async(req,res)=>{



})




export {
    registerUser,
    loginUser
}