const asyncHandler = require('express-async-handler')
const ApiError = require('../utilities/apiError')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/userModel')

// @desc    Signup users
// @route   POST /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_DATE
    })

    res.status(201).json({ data: user, token })
})