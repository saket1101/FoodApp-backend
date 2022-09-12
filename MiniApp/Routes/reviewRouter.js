const express = require("express")
const reviewRouter = express.Router()
const { protectRoute } = require("../controller/authController")
const { getAllreviews, getPlanReview, top3reviews, createReview, updateReview, deleteReview } = require("../controller/reviewController")
reviewRouter.route("/all")
    .get(getAllreviews)

reviewRouter.route("/top3")
    .get(top3reviews)


reviewRouter.route("/:id")
    .get(getPlanReview)

reviewRouter.use(protectRoute)
reviewRouter.route('/crud/:plan')
    .post(createReview)

reviewRouter.route('/update/:plan')
    .patch(updateReview)
reviewRouter.route('/delete/:plan')
    .delete(deleteReview)

module.exports = reviewRouter