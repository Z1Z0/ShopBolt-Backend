const express = require('express')

const router = express.Router({ mergeParams: true })

const { authorizationSecurity, allowedTo } = require('../services/authService')

const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    createFilterObject,
    setProductIDAndUserIDToBody
} = require('../services/reviewService')

const {
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator
} = require('../utilities/validators/reviewValidator')

router.route('/')
    .get(createFilterObject, getReviews)
    .post(authorizationSecurity, allowedTo('user'), setProductIDAndUserIDToBody, createReviewValidator, createReview)

router.route('/:id')
    .get(getReview)
    .put(authorizationSecurity, allowedTo('user'), updateReviewValidator, updateReview)
    .delete(authorizationSecurity, allowedTo('user', 'manager', 'admin'), deleteReviewValidator, deleteReview)

module.exports = router