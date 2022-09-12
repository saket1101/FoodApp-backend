const planModel = require("../models/planModel")
const userModel = require("../models/userModel")


module.exports.getAllPlans=async function getAllPlans (req,res){
    const plans = await planModel.find()
    try{if(plans){
        res.json({
            msg:"all plans retrived ",
            allUser: plans
        })
    }else{
        res.json({
            msg: "there is not any plans now "
        })
    }
}catch(err){
    res.status(500).json({
        msg: err.message
    })
}
}
module.exports.getPlan = async function getPlan (req,res){
    try {let id = req.params.id
    const plan = await planModel.findById(id)
    if (plan){
        res.json({
            msg: "plan retrived",
            plan:plan
        })
    }else{
        res.json ({ 
            msg: "you have not any plan"
        })
    }
    }catch(err){
        res.json({
            msg: err.message
        })
    }
}
module.exports.createPlan=async function createPlan(req,res){
   try{ let planData = req.body
    const createdPlan = await planModel.create(planData)
    return res.json({
        msg: " plan created successfully",
        data: createdPlan
    })
}catch(err){
    res.json({
        msg: err.message
    })
}
}

module.exports.deletePlan = async function deletePlan (req,res){
    try {const id = req.params.id
    const deletedPlan= await planModel.findByIdAndDelete(id)
    return res.json({
        msg: "plan deleted successfully",
        data:deletedPlan
    })
}catch(err){
    res.json({
        msg: err.message
    })
}
}
module.exports.updatePlan =async function updatePlan(req,res){
    try{const id = req.params.id 
    let dataToBeUpdated = req.body
    let keys=[]
    for(let key in dataToBeUpdated){
        keys.push(key)
    }
    const plan = await planModel.findById(id)
    for (let i=0;i<keys.length;i++){
        plan[keys[i]]= dataToBeUpdated[keys[i]]
    }
    //doc
     await plan.save();
     return res.json({
        msg: "plan updated successfully",
        plan: plan
     })

    }catch(err){
        res.send(500).json({
            msg: err.message
        })
    }
}
// top 3 plan
module.exports.top3plans = async function top3plans(req,res){
    try{
        const plans = await planModel.find().sort({
            ratingAverage:-1
        }).limit(3)
        return res.json({
            msg: "top3plans is ",
            data: plans
        })
    }catch(err){
        res.json({
            msg: err.message
        })
    }
}

