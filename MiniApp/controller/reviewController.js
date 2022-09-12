const reviewModel = require("../models/reviewModel")
const planModel = require("../models/planModel")

module.exports.getAllreviews = async function getAllreviews(req, res) {
    try {
        const reviews = await reviewModel.find()
        console.log(reviews)
        if (reviews) {
            return res.json({
                msg: "review is given",
                allReviews: reviews
            })
        } else {
            res.json({
                msg: " there is no reviews yet"
            })
        }
    } catch (err) {
        res.json({
            msg:"server error",
            msg: err.message

        })
    }
}

module.exports.top3reviews = async function top3reviews(req, res) {
    try {
        const reviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3)
        if (reviews) {
            return res.json({
                msg: "Top 3 reviews is retrived",
                top3: reviews
            })
        } else {
            res.json({
                msg: " there is no reviews"
            })
        }
    } catch (err) {
        res.json({
            msg: err.message

        })
    }
}

module.exports.getPlanReview = async function getPlanReview(req, res) {
    try {
        const planid = req.params.id
        const reviews = await reviewModel.find()
        const review = reviews.filter(review => review.plan._id == planid)
        if (review) {
            return res.json({
                msg:"review of thsi particular plan retrived successfully",
                review: review
            })
        } else {
            res.json({
                msg: " there is no review"
            })
        }
    } catch (err) {
        res.json({
            msg: err.message

        })
    }
}

module.exports.createReview = async function createReview(req, res) {
    try {
        const id = req.params.plan
        const plan = await planModel.findById(id)
        const review = await reviewModel.create(req.body)
        plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2
        await plan.save();
        return res.json({
            msg: "review created",
            data: review
        })
    } catch (err) {
        res.json({
            msg: err.message
        })
    }
}

module.exports.updateReview = async function updateReview(req, res) {
    try {
        const planid = req.params.id
        // review id will comes from frontend
        const id = req.body.id
        let dataToBeUpdated = req.body
        let keys = []
        for (let key in dataToBeUpdated) {
            if(key=='id') continue;
            keys.push(key)
        }
        const review = await reviewModel.findById(id)
        for (let i = 0; i < keys.length; i++) {
            review[keys[i]] = dataToBeUpdated[keys[i]]
        }

        await review.save();
        return res.json({
            msg: "review updated successfully",
            review: review
        })

    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        const planid = req.params.id
        // this is review id which will come from frontend
        const id = req.body.id
        const review = await reviewModel.findByIdAndDelete(id)
        return res.json({
            msg: "review deleted",
            data: review
        })
    } catch (err) {
        res.json({
            msg: err.message
        })
    }
}