const { check, body } = require('express-validator')
const slugify = require('slugify')
const bcrypt = require('bcryptjs')
const { validatorMiddleware } = require('../../middlewares/validatorMiddleware')
const UserModel = require('../../models/userModel')


exports.createUserValidator = [
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
    body('phone')
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
    body('profileImage')
        .optional(),
    body('role')
        .optional(),
    validatorMiddleware
]

exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User ID format'),
    validatorMiddleware
]

exports.updateUserValidator = [
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
            return true
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

exports.changeUserPasswordValidator = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password should not be empty'),
    body('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation should not be empty'),
    body('password')
        .notEmpty()
        .withMessage('Password should not be empty')
        .custom(async (password, { req }) => {
            const user = await UserModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no user for this ID ${req.params.id}`)
            }
            const isPasswordCorrect = await bcrypt.compare(req.body.currentPassword, user.password)

            if (!isPasswordCorrect) {
                throw new Error('Incorrect password')
            }

            if (password !== req.body.passwordConfirm) {
                throw new Error('Passwords do not match')
            }

            const isPasswordEqualCurrentPassword = await bcrypt.compare(req.body.password, user.password)

            if (isPasswordEqualCurrentPassword) {
                throw new Error('The new password can not be the same as the current password')
            }
            return true
        }),
    validatorMiddleware
]

exports.changeLoggedUserPasswordValidator = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password should not be empty'),
    body('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation should not be empty'),
    body('password')
        .notEmpty()
        .withMessage('Password should not be empty')
        .custom(async (password, { req }) => {
            const user = await UserModel.findById(req.user._id)
            if (!user) {
                throw new Error(`There is no user for this ID ${req.user._id}`)
            }
            const isPasswordCorrect = await bcrypt.compare(req.body.currentPassword, user.password)

            if (!isPasswordCorrect) {
                throw new Error('Incorrect password')
            }

            if (password !== req.body.passwordConfirm) {
                throw new Error('Passwords do not match')
            }

            const isPasswordEqualCurrentPassword = await bcrypt.compare(req.body.password, user.password)

            if (isPasswordEqualCurrentPassword) {
                throw new Error('The new password can not be the same as the current password')
            }
            return true
        }),
    validatorMiddleware
]

exports.changeLoggedUserDataValidator = [
    body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
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
    validatorMiddleware
]

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User ID format'),
    validatorMiddleware
]