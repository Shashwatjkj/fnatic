import mongoose from "mongoose"

const versionSchema=new mongoose.Schema({
    versionName:{
       type:String 
    },
    size:{
        type:String
    },
    price:{
        type: Number
    },
    color:{
        type:String,
    },
    imageURI:[String]
})

const attributeSchema=new mongoose.Schema({
    nameofattribute:{
        type: String
    },
    actualattribute:{
        type:String,
    }
})


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
        version:[versionSchema], 
        attributes:[attributeSchema],
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