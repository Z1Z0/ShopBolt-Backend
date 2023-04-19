const UserModel = require('../models/userModel')
const factory = require('./handlers/handlersFactory')
const { uploadSingleImage } = require('../middlewares/imageMiddlewares/uploadImageMiddleware')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')

exports.uploadUserImage = uploadSingleImage('profileImage')

exports.resizeImage = asyncHandler(async (req, res, next) => {

    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`
    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/users/${filename}`)

        req.body.profileImage = filename
    }

    next()
})

// @desc    Get list of Users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = factory.getAll(UserModel)

// @desc    Get a specific User by id
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUser = factory.getOne(UserModel)

// @desc    Create User
// @route   POST /api/v1/users
// @access  Private
exports.createUser = factory.createOne(UserModel)

// @desc    Update a specific User
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        slug: req.body.slug,
        phone: req.body.phone,
        profileImage: req.body.profileImage,
        role: req.body.role
    }, { new: true })

    if (!user) {
        return next(new ApiError(`There is no user for this id ${req.params.id}`, 404))
    }
    res.status(200).json({ data: user })
})

// @desc    Update a specific User
// @route   PUT /api/v1/users/:id
// @access  Private
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(req.params.id, {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now()
    }, { new: true })

    if (!user) {
        return next(new ApiError(`There is no user for this id ${req.params.id}`, 404))
    }
    res.status(200).json({ data: user })
})

// @desc    Delete a specific User
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = factory.deleteOne(UserModel)

exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id
    next()
})