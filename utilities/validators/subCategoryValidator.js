const { check } = require('express-validator')
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
        .withMessage('SubCategory name is too long'),
    check('category')
        .notEmpty().withMessage('Category ID is required')
        .isMongoId().withMessage('Invalid Category ID format'),
    validatorMiddleware
]

exports.updateSubCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid Subcategory ID format'),
    validatorMiddleware
]

exports.deleteSubCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid Subcategory ID format'),
    validatorMiddleware
]