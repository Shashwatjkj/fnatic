import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { generateotp } from "../utils/codeGenerator.js";
import { sendEmail } from "../utils/sendmail.js";
import jwt from "jsonwebtoken";



// sign up api.  
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

    const created=await User.findById(savedUser._id).select("-password -verifyCode");
    
    
    if(!created){
        throw new ApiError(500,"something went wrong on server.")
    }
    else{
       console.log(`new user created ${created}`);
    }

    return res.status(201).json(created);
})

// login api
const loginUser=asyncHandler(async(req,res)=>{
const {email,password}=req.body;
if(!email){
    throw new ApiError(400,"Email not found.")
}
const isEmailexist=await User.findOne({email});


if(!isEmailexist){ return res.status(404).json({
    message : "User is not found."
})}

if(isEmailexist.isVerified===false){
    return res.status(401).json({
        message : "User is not verified."
    })
}

if(isEmailexist.password!==password){
 return res.status(402).json({
    message : "Invalid password"
})
}

const token= jwt.sign({
    _id:isEmailexist._id,
    email:email
},process.env.SECRET_KEY)


const options={
    httpOnly: true,
    secure: true
}

res.cookie("login_cookie",token,options);

return res.status(200).json({
    message: "login is successful",
    login_cookie: token
})
})

// logout api
const logOut=asyncHandler(async(req,res)=>{

const options={
    httpOnly: true,
    secure: true
}

res
.status(200)
.clearCookie("login_cookie",options)
.json({
    message:"user is loggedout"
})


})




// otp verification api
const otpverificaton=asyncHandler(async(req,res)=>{
    const {email,otp}=req.body;
    const existeduser=await User.findOne({
        email,
        isVerified:"false"
    })
    const rightcode= existeduser.verifyCode;
    if(!existeduser){
        return res.status(400).json({
            message :"user does not exists."
        })
    }

    if(rightcode===otp){
        existeduser.isVerified=true;
        const temp=await existeduser.save();
        return res.status(200).json({
            message :"user is verified."
        })
    }
    else{
        return res.status(400).json({
            message :"wrong otp."
        })
    }
    
})








export {
    registerUser,
    loginUser,
    otpverificaton,
    logOut
}