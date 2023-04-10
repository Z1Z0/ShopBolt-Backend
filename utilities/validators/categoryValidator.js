const { check, body } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.getCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware
]

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name required')
        .isLength({ min: 3 })
        .withMessage('Category name is too short')
        .isLength({ max: 32 })
        .withMessage('Category name is too long')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    body('image')
        .notEmpty()
        .withMessage('Category image is required'),
    validatorMiddleware
]

exports.updateCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    body('name').optional().custom((val, { req }) => {
        req.body.slug = slugify(val)
        return true
    }),
    body('image')
        .optional(),
    validatorMiddleware
]

exports.deleteCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware
]