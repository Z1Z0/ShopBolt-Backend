const { body } = require('express-validator')
const slugify = require('slugify')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const UserModel = require('../../models/userModel')

exports.signupValidator = [
    body('name')
        .notEmpty()
        .withMessage('User name required')
        .isLength({ min: 3 })
        .withMessage('User name is too short')
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    body('email')
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
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters')
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('Passwords do not match')
            }
            return true
        }),
    body('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirm is required'),
    validatorMiddleware
]