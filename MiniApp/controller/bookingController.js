let secKey = "sk_test_51LbTnKSEzyd4eR62bXEZlaibu0okxSElAD0tnMrMO8jjD8uCuGu56OfUG6CMHbkTg8ECSO6XptNvJR1wZnfq3LDe00MkRkmBHy"
const stripe = require("stripe")(secKey);
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

module.exports.createSession = async function createSession (req,res){
    try{
        let userId = req.id;
        let planId = req.params.id;

        const user = await userModel.findById(userId);
        const plan = await planModel.findById (planId);

      const  session = stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.Email,
            client_ref_id: plan.id,
          line_items: [{
            name: plan.name,
            descripion: plan.descripion,
            quantity: 1,
            price: plan.price,
            currency:"inr"
          }],
          mode: 'payment',
          success_url: `${req.protocol}://${req.get("host")}/profile`,
          cancel_url: `${req.protocol}://${req.get("host")}/profile`,  
        
        })
        res.status(200).json({
            msg:"payment successful"

        })

    }catch(err){
        res.json({
            msg:err.message
        })
    }
    }
