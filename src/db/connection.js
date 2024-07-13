import mongoose from "mongoose";
import dbname from "../constant.js";


async function connectdb(){
    try {
     const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
     console.log(`\nmongodb connected !! db host :${connectionInstance.connection.host}`);
    } catch (error) {
     console.log("MONGODB connection FAILED \n", error);
     process.exit(1)
    }
 }
 
 
 export default connectdb;