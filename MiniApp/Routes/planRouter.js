const express = require("express")
const planRouter = express.Router();
const { protectRoute, isAuthorised } = require("../controller/authController")
const { getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3plans } = require("../controller/planController")
// for all plan
planRouter.route("/allPlans")
    .get(getAllPlans)

// for own plan
planRouter.use(protectRoute)
planRouter.route("/plan/:id")
    .get(getPlan)

// for authosrished people 
planRouter.use(isAuthorised(['admin', 'restaurantOwner']))
planRouter.route("/crudPlan")
    .post(createPlan)
planRouter.route("/crudPlan/:id")
    .patch(updatePlan)
    .delete(deletePlan)
planRouter.route("/top3")
.get(top3plans)
module.exports = planRouter