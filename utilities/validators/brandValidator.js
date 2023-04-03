const { check } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.getBrandMiddleware = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    validatorMiddleware
]

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand name required')
        .isLength({ min: 3 })
        .withMessage('Brand name is too short')
        .isLength({ max: 32 })
        .withMessage('Brand name is too long'),
    validatorMiddleware
]

exports.updateBrandMiddleware = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    validatorMiddleware
]

exports.deleteBrandMiddleware = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    validatorMiddleware
]