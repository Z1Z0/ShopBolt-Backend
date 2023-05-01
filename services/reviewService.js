const ReviewModel = require('../models/reviewModel')
const factory = require('./handlers/handlersFactory')

exports.createFilterObject = (req, res, next) => {

    let filterObject = {}
    if (req.params.productID) {
        filterObject = { product: req.params.productID }
    }
    req.filterObj = filterObject
    next()
}

// @desc    Get list of Reviews
// @route   GET /api/v1/reviews
// @access  Public
exports.getReviews = factory.getAll(ReviewModel)

// @desc    Get a specific review by id
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReview = factory.getOne(ReviewModel)

exports.setProductIDAndUserIDToBody = (req, res, next) => {
    if (!req.body.product) {
        req.body.product = req.params.productID
    }
    if (!req.body.user) {
        req.body.user = req.user._id
    }
    next()
}

// @desc    Create review
// @route   POST /api/v1/reviews
// @access  Private
exports.createReview = factory.createOne(ReviewModel)

// @desc    Update a specific review
// @route   PUT /api/v1/reviews/:id
// @access  Private
exports.updateReview = factory.updateOne(ReviewModel)

// @desc    Delete a specific review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
exports.deleteReview = factory.deleteOne(ReviewModel)