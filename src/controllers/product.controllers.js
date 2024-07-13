import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

//     /api/v1/products/upload
//upload api
const UploadProductDetail=asyncHandler(async(req,res)=>{
    const {title,price,description,category,version,attributes}=req.body;

    if (
        [title,price,description,category].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedTitle=await Product.findOne({
        title
    })

    if (existedTitle) {
        throw new ApiError(409, "Title  already exists")
    }

    const localpath= req.files?.firstImage[0]?.path;

    if (!localpath) {
        throw new ApiError(400, "Image of product is required")
    }

    const Urlofimage=await uploadOnCloudinary(localpath);

   console.log(req.fiels);

    // const product =new Product({
    //     title,
    //     price,
    //     description,
    //     category,
    //     imageUrl :Urlofimage.url

    // })
    // const savedProduct=await product.save();
    
    return res.status(200).json(savedProduct);

})

// getallproduct
const getallProduct=asyncHandler(async(req,res)=>{
    const allProduct=await Product.find();
    //console.log(allProduct);
    return res.status(200).send(allProduct);
})




export { UploadProductDetail,getallProduct}