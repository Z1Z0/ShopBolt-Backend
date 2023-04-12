const { check, body } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const UserModel = require('../../models/userModel')

exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User name required')
        .isLength({ min: 3 })
        .withMessage('User name is too short')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter valid email')
        .custom((email) =>
            UserModel.findOne({ email: email }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('Email already exist'))
                }
            })
        ),
    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone('ar-EG')
        .withMessage('Please enter valid phone number')
        .custom((number) =>
            UserModel.findOne({ phone: number }).then((phone) => {
                if (phone) {
                    return Promise.reject(new Error('Phone number already used'))
                }
            })
        ),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters'),
    check('profileImage')
        .optional(),
    check('role')
        .optional(),
    validatorMiddleware
]

exports.getUserMiddleware = [
    check('id').isMongoId().withMessage('Invalid User ID format'),
    validatorMiddleware
]

exports.updateUserMiddleware = [
    check('id').isMongoId().withMessage('Invalid User ID format'),
    body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    body('email')
        .optional()
        .custom((email) => {
            if (email) {
                throw new Error('Email can not be changed')
            }
        }),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters'),
    body('phone')
        .optional()
        .isMobilePhone('ar-EG')
        .withMessage('Please enter valid phone number')
        .custom((number) =>
            UserModel.findOne({ phone: number }).then((phone) => {
                if (phone) {
                    return Promise.reject(new Error('Phone number already used'))
                }
            })
        ),
    body('profileImage')
        .optional(),
    body('role')
        .optional(),
    validatorMiddleware
]

exports.deleteUserMiddleware = [
    check('id').isMongoId().withMessage('Invalid User ID format'),
    validatorMiddleware
]