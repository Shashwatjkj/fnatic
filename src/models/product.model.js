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
            required: true   
        },
        description:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        imageUrl:{
            type:String,
            required: true
        },
        rating:{
            type:Number
        }
        
        
    },{timestamps:true}
)






export const Product=mongoose.model("Product",productSchema)