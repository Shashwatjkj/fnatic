import mongoose from "mongoose"

const productSchema=new mongoose.Schema(
    {
        title: {
            type: String,
            required:true,
            unique: false
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
            type: String
        },
        imageUrl:{
            type:String
        }
        
        
    },{timestamps:true}
)






export const Product=mongoose.model("Product",productSchema)