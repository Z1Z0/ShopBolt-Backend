const { check } = require('express-validator')
const { validatorMiddleware } = require('../../middlewares/validatorMiddleware')
const ReviewModel = require('../../models/reviewModel')

exports.createReviewValidator = [
    check('title')
        .optional()
        .isString()
        .withMessage('Review title must be String'),

    check('ratings')
        .notEmpty()
        .withMessage('Rating can not be empty')
        .isFloat({ min: 1, max: 5 })
        .withMessage('Rating value must be between 1 and 5'),

    check('user')
        .notEmpty()
        .withMessage('User ID can not be empty')
        .isMongoId()
        .withMessage('Invalid user ID'),

    check('product')
        .notEmpty()
        .withMessage('Product ID can not be empty')
        .isMongoId()
        .withMessage('Invalid product ID')
        .custom((val, { req }) => ReviewModel.findOne({ user: req.user._id, product: req.body.product }).then((review) => {
            if (req.user._id.toString() !== req.body.user.toString()) {
                return Promise.reject(new Error('You are not allowed to perform this action'))
            }
            if (review) {
                return Promise.reject(new Error('You already posted a review before'))
            }
        }))
    ,
    validatorMiddleware
]

exports.getReviewValidator = [
    check('id').isMongoId().withMessage('Invalid Review ID format'),
    validatorMiddleware
]

exports.updateReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid review ID')
        .custom((val, { req }) =>
            ReviewModel.findById(val).then((review) => {
                if (!review) {
                    return Promise.reject(new Error(`There is no review for this ID ${val}`))
                }

                if (review.user.toString() !== req.user._id.toString()) {
                    return Promise.reject(new Error('You are not allowed to perform this action'))
                }
            })
        ),
    check('title')
        .optional()
        .isString()
        .withMessage('Review title must be a String'),

    check('ratings')
        .optional()
        .isFloat({ min: 1, max: 5 })
        .withMessage('Rating value must be between 1 and 5'),
    validatorMiddleware
]

exports.deleteReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid review ID')
        .custom((val, { req }) => {
            if (req.user.role === 'user') {
                return ReviewModel.findById(val).then((review) => {
                    if (!review) {
                        return Promise.reject(new Error(`There is no review for this ID ${val}`))
                    }

                    if (review.user.toString() !== req.user._id.toString()) {
                        return Promise.reject(new Error('You are not allowed to perform this action'))
                    }
                })
            }
            return true
        }),
    validatorMiddleware
]