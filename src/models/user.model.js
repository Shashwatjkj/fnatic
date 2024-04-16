import mongoose from "mongoose"

const userSchema=new mongoose.Schema(
    {
        username: {
            type: String,
            required:false,
            unique: false,
        },
        email:{
            type: String,
            require: true,
            unique: true,
            lowercase: true
        },
        password:{
            type: String,
            required: [true, 'Password is required']

        }
        
    },{timestamps:true}
)






export const User=mongoose.model("User",userSchema)