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
    res.send("work is start");
})


//routes import
import userRouter from "./routes/user.rout.js"



//routes declaration
app.use("/api/v1/users",userRouter)

export {app}
