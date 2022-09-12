const mongoose = require('mongoose');


const db_url = 'mongodb+srv://saket1101:saket1101@cluster0.1epmhty.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_url)
.then(function (db){
    console.log(" Plan db connected")
}).catch(function(err){
    console.log(err)
})

const planSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        maxLength:[20,'PlanName should not exceed more than 20 character']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true, 'Price has not entered']
    },
    ratingsAverage:{
        type:Number,

    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount < 100
        }, 'discount should not more than price']
    }
})
//model
const planModel = mongoose.model('planModel',planSchema);

 /*(async function createPlan(){
    let planObj= {
        name:"superPlan2",
        duration:30,
        price:1000,
        ratingsAverage:5,
        discount:20
    }
    //let data =  await planModel.create(planObj)
    //console.log(data)
    // both are same this i was just checking
    let doc = new planModel(planObj)
    await doc.save(planObj)
    console.log(doc)
})();*/



module.exports = planModel;