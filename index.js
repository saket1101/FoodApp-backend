
const express = require("express")
const cookieParser = require("cookie-parser");

const app = express();
//const loginRouter = require('./MiniApp/Routes/login')
const userRouter = require("./MiniApp/Routes/userRouter")
const planRouter = require("./MiniApp/Routes/planRouter")
const reviewRouter= require("./MiniApp/Routes/reviewRouter")
const bookingRouter= require("./MiniApp/Routes/bookingRouter")

app.use(express.json())
app.use(cookieParser());
const port = process.env.PORT || 2000;



app.use('/user',userRouter)
app.use("/plans",planRouter)
app.use('/review',reviewRouter)
app.use('/booking',bookingRouter)
//app.use('/user',loginRouter)
//const planModel = require("./MiniApp/models/planModel")




app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})