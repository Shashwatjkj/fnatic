import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";


const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    console.log(`${username},${email},${password}`);
    if(email===""){
        throw new ApiError(400,"fullname is required");
    }
    if(password===""){
        throw new ApiError(400,"password is required");
    }
    const existeduser = await User.findOne({
       email
    })
    console.log(existeduser);
    if(existeduser){
        throw new ApiError(409,"user already existed.")
    }
    const user =await User.create({
        username: username || "",
        email,
        password
    })
    const created=await User.findById(user._id).select("-password");
    
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