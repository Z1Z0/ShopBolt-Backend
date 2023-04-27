const { check, body } = require('express-validator')
const slugify = require('slugify')
const { validatorMiddleware } = require('../../middlewares/validatorMiddleware')

exports.getBrandValidator = [
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
    body('image')
        .notEmpty()
        .withMessage('Brand image is required'),
    validatorMiddleware
]

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    body('image')
        .optional(),
    validatorMiddleware
]

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand ID format'),
    validatorMiddleware
]