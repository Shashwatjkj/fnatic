import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("The work has begun.");
})


//routes import
import userRouter from "./routes/user.rout.js"
import productRouter from "./routes/product.rout.js"


//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/products",productRouter)

export {app}
