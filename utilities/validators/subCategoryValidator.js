const { check, body } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.getSubCategoryMiddleware = [
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

exports.updateSubCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid Subcategory ID format'),
    body('name').custom((val, { req }) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

exports.deleteSubCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid Subcategory ID format'),
    validatorMiddleware
]