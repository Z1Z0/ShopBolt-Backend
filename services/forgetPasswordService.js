const crypto = require('crypto')
const UserModel = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utilities/apiError')
const sendEmail = require('../utilities/sendEmail')
const { generateJWTToken } = require('./authService')

exports.forgetPassword = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
        return next(new ApiError(`There is no user for this email ${req.body.email}`, 404))
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedResetCode = crypto.createHash('sha256').update(resetCode).digest('hex')

    user.passwordResetCode = hashedResetCode
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000
    user.passwordResetVerified = false

    await user.save()

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset code',
            message: `Hi ${user.name}, \n Here is the reset code ${resetCode}`
        })
    } catch (error) {
        user.passwordResetCode = undefined
        user.passwordResetExpires = undefined
        user.passwordResetVerified = undefined
        await user.save()
        return next(new ApiError('There is an error in sending email', 500))
    }


    res.status(200).json({ status: 'Success', message: 'Reset code sent successfully' })
})

exports.verifyPasswordResetCode = asyncHandler(async (req, res, next) => {
    const hashedResetCode = crypto.createHash('sha256').update(req.body.resetCode).digest('hex')

    const user = await UserModel.findOne({ passwordResetCode: hashedResetCode, passwordResetExpires: { $gt: Date.now() } })

    if (!user) {
        return next(new ApiError('Reset code invalid or expired'))
    }

    user.passwordResetVerified = true

    await user.save()

    res.status(200).json({ status: 'Success' })
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
        return next(new ApiError(`There is no user with this email ${req.body.email}`, 404))
    }

    user.password = req.body.newPassword
    user.passwordResetCode = undefined
    user.passwordResetExpires = undefined
    user.passwordResetVerified = undefined

    await user.save()

    const token = generateJWTToken(user._id)

    res.status(200).json({ token })
})