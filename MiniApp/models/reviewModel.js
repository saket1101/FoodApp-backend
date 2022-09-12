const mongoose = require('mongoose');


const db_url = 'mongodb+srv://saket1101:saket1101@cluster0.1epmhty.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_url)
.then(function (db){
    console.log("Review db connected")
}).catch(function(err){
    console.log(err)
})

const reviewSchema =  mongoose.Schema({
    review:{
        type:String,
        required:[true,"review is required for all "]
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:10
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'userModel',
        required:[true,'review must be given by user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref: 'planModel',
        required:[true,'review must be given by user for plan']
    }
})
// find findByid findOne before using this use below function
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:"Name profileImage"
    }).populate("plan")
    next();
})

 const reviewModel = mongoose.model('reviewModel',reviewSchema)

 module.exports = reviewModel;