import 'dotenv/config'
import connectdb from './db/connection.js'
import {app} from "./app.mjs"
 

connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8081, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
})