const express = require("express");
const bookingRouter = express.Router();
const {protectRouter} = require("../controller/authController");
//const {createSession} = require("../controller/bookingController");

//bookingRouter.post("/createPayment",protectRouter);
bookingRouter.get("/createPayment",function (req,res){
    res.sendFile("")
})


module.exports = bookingRouter