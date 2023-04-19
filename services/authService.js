const asyncHandler = require('express-async-handler')
const ApiError = require('../utilities/apiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserModel = require('../models/userModel')

const generateJWTToken = (userID) => jwt.sign({ userID: userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_DATE
})

// @desc    Signup users
// @route   POST /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    const token = generateJWTToken(user._id)

    res.status(201).json({ data: user, token })
})

// @desc    Signin users
// @route   POST /api/v1/auth/signin
// @access  Public
exports.signin = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError('Incorrect email or password', 401))
    }

    const token = generateJWTToken(user._id)

    res.status(200).json({ data: user, token })
})

// @desc    Make sure the user signed in
exports.authorizationSecurity = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ApiError('You are not signed in, please sign in to get access to this route', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await UserModel.findById(decoded.userID)

    if (!user) {
        return next(new ApiError('The user belong to this token no longer exist', 401))
    }

    if (user.passwordChangedAt) {
        const passwordChangedTimestamps = parseInt(user.passwordChangedAt.getTime() / 1000, 10)

        if (passwordChangedTimestamps > decoded.iat) {
            return next(new ApiError('User changed password recently, please signin again', 401))
        }
    }

    req.user = user
    next()
})

exports.allowedTo = (...roles) => asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ApiError('You are not allowed to access this route', 403))
    }

    next()
})

module.exports = { generateJWTToken }