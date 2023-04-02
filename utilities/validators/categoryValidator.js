const { check } = require('express-validator')
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
        .withMessage('Category name is too long'),
    validatorMiddleware
]

exports.updateCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware
]

exports.deleteCategoryMiddleware = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware
]