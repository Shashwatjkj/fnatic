import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWTtoken=asyncHandler(async(req,res,next)=>{
try {
    const token=req.cookies?.login_cookie || req.header("Authorization")?.replace("Bearer ","");
    if(!token){
    
        throw new ApiError(401,"Unauthorized token.");
       
    }
    
    const vaildtoken = await jwt.verify(token,process.env.SECRET_KEY);
    console.log(vaildtoken)
    const user=await User.findById(vaildtoken?._id).select("-password -verifyCode");
    console.log(user)
    if(!user){
        // somthing to do.
        throw new ApiError(401,"Invalid Token (Token without _id)");
    }
    
    req.user=user;
    next();

} catch (error) {
    
    throw error
}
})

export{
    verifyJWTtoken
}