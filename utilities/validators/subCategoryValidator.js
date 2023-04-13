const { check, body } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory ID format'),
    validatorMiddleware
]

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory name required')
        .isLength({ min: 2 })
        .withMessage('SubCategory name is too short')
        .isLength({ max: 32 })
        .withMessage('SubCategory name is too long')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('category')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Invalid Category ID format'),
    validatorMiddleware
]

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory ID format'),
    body('name').custom((val, { req }) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory ID format'),
    validatorMiddleware
]