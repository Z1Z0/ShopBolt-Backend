const { check } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.createProductValidator = [
    check('title')
        .isLength({ min: 3 })
        .withMessage('Product title too short, minimum character is 3')
        .notEmpty()
        .withMessage('Product title is required'),

    check('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ max: 2000 })
        .withMessage('Product description too long, maximum character is 2000'),

    check('quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .isNumeric()
        .withMessage('Product quantity must be a number'),

    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Product sold quantity must be a number'),

    check('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be a number')
        .isLength({ max: 32 })
        .withMessage('Product price is too high'),

    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .toFloat()
        .withMessage('Product price after discount must be a number')
        .custom((value, { req }) => {
            if (req.body.price <= value) {
                throw new Error('Price after discount must be lower than the original price')
            }
            return true
        }),

    check('colors')
        .optional()
        .isArray()
        .withMessage('Colors must be an array of Strings'),

    check('imageCover')
        .notEmpty()
        .withMessage('Image cover is required'),

    check('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array of Strings'),

    check('category')
        .notEmpty()
        .withMessage('Product should belong to category')
        .isMongoId()
        .withMessage('Invalid ID format'),

    check('subCategory')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID format'),

    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID format'),

    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('Ratings must be a number')
        .isLength({ min: 1 })
        .withMessage('Rating must not be less than 1')
        .isLength({ max: 5 })
        .withMessage('Rating must not be greater than 5'),

    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('Ratings must be a number'),

    validatorMiddleware
]

exports.getProductValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid ID format'),
    validatorMiddleware
]

exports.updateProductValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid ID format'),
    validatorMiddleware
]

exports.deleteProductValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid ID format'),
    validatorMiddleware
]