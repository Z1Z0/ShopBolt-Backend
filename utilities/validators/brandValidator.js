const { check, body } = require('express-validator')
const slugify = require('slugify')
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
        .withMessage('Brand name is too long')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    validatorMiddleware
]

exports.updateBrandMiddleware = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    body('name').custom((val, { req }) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

exports.deleteBrandMiddleware = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    validatorMiddleware
]