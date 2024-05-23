import mongoose from "mongoose"

const productSchema=new mongoose.Schema(
    {
        title: {
            type: String,
            required:true,
            unique:true
        },
        price:{
            type: Number,
            require: true   
        },
        description:{
            type: String,
            required: true
        },
        category:{
            type: String,
            requir: true
        },
        imageUrl:{
            type:String,
            require: true
        },
        rating:{
            type:Number
        }
        
        
    },{timestamps:true}
)






export const Product=mongoose.model("Product",productSchema)