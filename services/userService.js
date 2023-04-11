const UserModel = require('../models/userModel')
const factory = require('./handlers/handlersFactory')
const { uploadSingleImage } = require('../middlewares/imageMiddlewares/uploadImageMiddleware')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')

exports.uploadUserImage = uploadSingleImage('profileImage')

exports.resizeImage = asyncHandler(async (req, res, next) => {

    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/users/${filename}`)

    req.body.profileImage = filename

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
exports.updateUser = factory.updateOne(UserModel)

// @desc    Delete a specific User
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = factory.deleteOne(UserModel)